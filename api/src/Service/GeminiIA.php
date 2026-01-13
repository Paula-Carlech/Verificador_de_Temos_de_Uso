<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class GeminiIA
{
    private HttpClientInterface $client;
    private string $apiKey;

    public function __construct(
        HttpClientInterface $client,
        string $geminiApiKey
    ) {
        $this->client = $client;
        $this->apiKey = $geminiApiKey;
    }

    /**
     * Sends the contract text to Gemini API and returns the analysis.
     */
    public function analyzeContract(string $text): array
    {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $this->apiKey;

        // Structured prompt to ensure JSON output
        $systemPrompt = "
            Você é um advogado especialista em Termos de Uso e Contratos Digitais.
            Analise o texto fornecido e identifique cláusulas perigosas, abusivas ou suspeitas.
            
            IMPORTANTE: Responda APENAS com um JSON válido seguindo estritamente este formato, sem markdown ou explicações extras:
            {
                \"points\": [
                    \"Explicação curta do risco 1\",
                    \"Explicação curta do risco 2\",
                    \"Explicação curta do risco 3\"
                ]
            }
            
            Se o texto for seguro ou não houver riscos claros, retorne uma lista vazia ou com avisos leves.
        ";

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $systemPrompt . "\n\nTEXTO DO CONTRATO:\n" . $text]
                    ]
                ]
            ]
        ];

        try {
            $response = $this->client->request('POST', $url, [
                'json' => $payload,
                'headers' => [
                    'Content-Type' => 'application/json',
                ]
            ]);

            $data = $response->toArray();

            // Extract the text from the Gemini response structure
            $rawContent = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

            // Clean up Markdown code blocks if present (Gemini sometimes adds ```json ... ```)
            $cleanJson = str_replace(['```json', '```'], '', $rawContent);

            return json_decode($cleanJson, true) ?? ['points' => ['Erro ao processar resposta da IA.']];
        } catch (\Exception $e) {
            return ['points' => ['Erro de conexão com a IA: ' . $e->getMessage()]];
        }
    }
}
