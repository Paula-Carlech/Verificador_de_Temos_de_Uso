<?php

namespace App\ApiResource;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\State\ContractAnalysisProcessor;
use Symfony\Component\HttpFoundation\File\File;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/analyze',
            status: 200,
            inputFormats: ['multipart' => ['multipart/form-data']],
            processor: ContractAnalysisProcessor::class,
            deserialize: false
        )
    ]
)]
class ContractAnalysis
{
    #[ApiProperty(openapiContext: [
        'type' => 'string',
        'format' => 'binary'
    ])]
    public ?File $file = null;

    public ?string $text = null;

    #[ApiProperty(writable: false)]
    public ?array $result = null;
}
