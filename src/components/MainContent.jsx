import React, { useState } from "react";
import {
  Container,
  Textarea,
  Button,
  Title,
  Text,
  Group,
  LoadingOverlay,
  rem,
  Stack,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconTrash,
  IconBrain,
  IconUpload,
  IconX,
  IconFileTypeTxt,
  IconFileTypePdf,
} from "@tabler/icons-react";

import { PRIMARY_COL } from "../constants/theme";
import { extractTextFromPDF } from "../utils/pdfParser";
import { analyzeContract } from "../services/api";
import AIAnalysisResult from "./Results/AIAnalysisResult";

export default function MainContent() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClear = () => {
    setText("");
    setResult(null);
  };

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
      alert("Erro ao processar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeContract(text);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao analisar contrato. Verifique se o Backend está rodando!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" w="100%" my="auto">
      <Stack gap="lg">
        <div>
          <Title order={2} ta="center" mb={5} style={{ color: PRIMARY_COL }}>
            Verifique a segurança do seu contrato
          </Title>
          <Text c="dimmed" ta="center" size="sm">
            Arraste um arquivo ou cole os termos de uso abaixo para análise.
          </Text>
        </div>

        <div style={{ position: "relative" }}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

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
            styles={{
              root: {
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: PRIMARY_COL,
                backgroundColor: "rgba(67, 75, 231, 0.05)",
                padding: "20px",
              },
            }}
          >
            <Group
              justify="center"
              gap="xl"
              mih={80}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: PRIMARY_COL,
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
                <Group gap="md">
                  <IconFileTypePdf
                    style={{
                      width: rem(40),
                      height: rem(40),
                      color: PRIMARY_COL,
                    }}
                    stroke={1.5}
                    filled
                  />
                  <IconFileTypeTxt
                    style={{
                      width: rem(40),
                      height: rem(40),
                      color: PRIMARY_COL,
                    }}
                    stroke={1.5}
                  />
                </Group>
              </Dropzone.Idle>

              <div>
                <Text size="md" inline ta="left" fw={500}>
                  Arraste o arquivo aqui
                </Text>
                <Text size="xs" c="dimmed" inline mt={7} ta="left">
                  (PDF, TXT ou MD até 5MB)
                </Text>
              </div>
            </Group>
          </Dropzone>

          <Textarea
            placeholder="Ou cole o texto manualmente aqui..."
            label="Conteúdo do Contrato"
            autosize
            minRows={6}
            maxRows={12}
            radius="md"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            styles={{
              input: {
                borderColor: "#e0e0e0",
                backgroundColor: "#f8f9fa",
              },
            }}
          />
        </div>

        <Group justify="center" mt="xs">
          <Button
            radius="xl"
            color={PRIMARY_COL}
            onClick={handleClear}
            leftSection={<IconTrash size={16} />}
            disabled={!text}
            size="md"
          >
            Limpar
          </Button>

          <Button
            radius="xl"
            color={PRIMARY_COL}
            onClick={handleAnalyze}
            leftSection={<IconBrain size={16} />}
            disabled={!text}
            loading={loading}
            size="md"
          >
            Analisar
          </Button>
        </Group>

        <AIAnalysisResult analysis={result} />
      </Stack>
    </Container>
  );
}
