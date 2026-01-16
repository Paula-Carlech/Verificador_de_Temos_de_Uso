<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\ContractAnalysis;
use App\Service\GeminiIA;
use Smalot\PdfParser\Parser;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ContractAnalysisProcessor implements ProcessorInterface
{
    public function __construct(
        private GeminiIA $geminiIA,
        private RequestStack $requestStack
    ) {}

    /**
     * @param ContractAnalysis|null $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): ContractAnalysis
    {
        if (!$data) {
            $data = new ContractAnalysis();
        }

        $request = $this->requestStack->getCurrentRequest();

        if (!$request) {
            throw new \RuntimeException('Request not found');
        }

        $uploadedFile = $request->files->get('file');
        $manualText = $request->request->get('text');

        $data->file = $uploadedFile;
        $data->text = $manualText ?? '';

        $contentToAnalyze = $data->text;

        if ($data->file instanceof UploadedFile) {
            $parser = new Parser();
            try {
                $pdf = $parser->parseFile($data->file->getPathname());
                $pdfText = $pdf->getText();

                $contentToAnalyze .= "\n\n" . $pdfText;
            } catch (\Exception $e) {
                throw new BadRequestHttpException('Error reading the PDF file: ' . $e->getMessage());
            }
        }

        if (empty(trim($contentToAnalyze))) {
            throw new BadRequestHttpException('Please provide a text or a PDF file to analyze.');
        }

        $analysisResult = $this->geminiIA->analyzeContract($contentToAnalyze);

        $data->result = $analysisResult;

        return $data;
    }
}
