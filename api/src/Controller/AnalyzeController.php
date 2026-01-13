<?php

namespace App\Controller;

use App\Service\GeminiIA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class AnalyzeController extends AbstractController
{
    // The endpoint that React will call
    #[Route('/api/analyze', name: 'api_analyze', methods: ['POST'])]
    public function index(Request $request, GeminiIA $geminiIA): JsonResponse
    {
        // Decode the JSON sent by React
        $data = json_decode($request->getContent(), true);
        $text = $data['text'] ?? '';

        if (empty($text)) {
            return new JsonResponse(['points' => ['Nenhum texto fornecido para análise.']], 400);
        }

        // Call the service to process the text
        $analysis = $geminiIA->analyzeContract($text);

        return new JsonResponse($analysis);
    }
}
