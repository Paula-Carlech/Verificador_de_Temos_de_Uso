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
            PRIMEIRA TAREFA: Verifique se o texto fornecido é um contrato, termo de uso, política de privacidade ou documento jurídico similar.

            SE NÃO FOR UM DOCUMENTO JURÍDICO:
            Retorne exatamente este JSON: {\"is_contract\": false, \"message\": \"O conteúdo enviado não parece ser um contrato ou termo de uso válido para análise.\"}

            SE FOR UM DOCUMENTO JURÍDICO:
            Analise cláusulas perigosas ou abusivas e retorne este JSON:
            {
                \"is_contract\": true,
                \"points\": [
                    \"Explicação curta do risco 1\",
                    \"Explicação curta do risco 2\"
                ]
            }

            IMPORTANTE: Responda APENAS com o JSON válido, sem markdown ou explicações extras.
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

            // Clean up Markdown code blocks if present
            $cleanJson = str_replace(['```json', '```'], '', $rawContent);

            return json_decode($cleanJson, true) ?? ['points' => ['Erro ao processar resposta da IA.']];
        } catch (\Exception $e) {
            // Return a friendly error structure for connection issues
            return [
                'error' => true,
                'points' => ['Não foi possível conectar à IA no momento. Por favor, tente novamente em instantes.']
            ];
        }
    }
}
