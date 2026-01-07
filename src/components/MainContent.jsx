import React, { useState } from "react";
import {
  Container,
  Textarea,
  Button,
  Title,
  Text,
  Group,
  LoadingOverlay,
  Alert,
  Card,
  Badge,
  rem,
  Stack,
  Center,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconTrash,
  IconBrain,
  IconAlertTriangle,
  IconUpload,
  IconX,
  IconFileTypeTxt,
  IconFileTypePdf,
} from "@tabler/icons-react";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
// We use a CDN to avoid complex Vite configuration issues with the worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// Sub-component for results
const AIAnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
      <Group justify="space-between" mb="xs">
        <Text fw={500}>Análise da IA</Text>
        <Badge color="red" variant="light">
          Risco Detectado
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="md" ta="left">
        Encontramos os seguintes pontos de atenção no contrato:
      </Text>

      {analysis.points.map((point, index) => (
        <Alert
          variant="light"
          color="orange"
          title="Atenção"
          icon={<IconAlertTriangle />}
          key={index}
          mb="sm"
          ta="left"
        >
          {point}
        </Alert>
      ))}
    </Card>
  );
};

export default function MainContent() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Clear all data
  const handleClear = () => {
    setText("");
    setResult(null);
  };

  // Extract text from PDF file
  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      // Loop through all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }
      return fullText;
    } catch (error) {
      console.error("Error reading PDF:", error);
      alert("Erro ao ler o PDF.");
      return "";
    }
  };

  // Handle drag and drop
  const handleDrop = async (files) => {
    setLoading(true);
    const file = files[0];

    try {
      if (file.type === "application/pdf") {
        const pdfText = await extractTextFromPDF(file);
        setText(pdfText);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.error("Error processing file", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock AI Analysis
  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        points: [
          "O contrato menciona venda de dados a terceiros.",
          "Renovação automática difícil de cancelar.",
          "Foro de eleição internacional.",
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Center mih="calc(100vh - 160px)">
      <Container size="sm" w="100%">
        <Stack gap="lg">
          {/* Header Title Area */}
          <div>
            <Title order={1} ta="center" mb="xs">
              Verifique a segurança do seu contrato
            </Title>
            <Text c="dimmed" ta="center">
              Arraste um arquivo ou cole os termos de uso abaixo para análise.
            </Text>
          </div>

          <div style={{ position: "relative" }}>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            {/* File Dropzone */}
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={[
                MIME_TYPES.markdown,
                "text/plain",
                "application/json",
                MIME_TYPES.pdf,
              ]}
              mb="md"
              radius="md"
              styles={{ root: { borderWidth: 1, borderStyle: "dashed" } }}
            >
              <Group
                justify="center"
                gap="xl"
                mih={100}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Group gap="xs">
                    <IconFileTypePdf
                      style={{
                        width: rem(42),
                        height: rem(42),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                    <IconFileTypeTxt
                      style={{
                        width: rem(32),
                        height: rem(32),
                        color: "var(--mantine-color-gray-4)",
                      }}
                      stroke={1.5}
                    />
                  </Group>
                </Dropzone.Idle>

                <div>
                  <Text size="lg" inline ta="center">
                    Arraste o arquivo aqui
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} ta="center">
                    PDF, TXT ou MD (até 5MB)
                  </Text>
                </div>
              </Group>
            </Dropzone>

            {/* Manual Text Input */}
            <Textarea
              placeholder="Ou cole o texto manualmente aqui..."
              label="Conteúdo do Contrato"
              autosize
              minRows={6}
              maxRows={12}
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
            />
          </div>

          {/* Action Buttons */}
          <Group justify="center" mt="xs">
            <Button
              variant="subtle"
              color="gray"
              onClick={handleClear}
              leftSection={<IconTrash size={16} />}
              disabled={!text}
            >
              Limpar
            </Button>

            <Button
              onClick={handleAnalyze}
              leftSection={<IconBrain size={16} />}
              disabled={!text}
              loading={loading}
              size="md"
            >
              Analisar com IA
            </Button>
          </Group>

          {/* Results Component */}
          <AIAnalysisResult analysis={result} />
        </Stack>
      </Container>
    </Center>
  );
}
