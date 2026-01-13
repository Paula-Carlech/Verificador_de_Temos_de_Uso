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
  Paper,
  ActionIcon,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconTrash,
  IconBrain,
  IconUpload,
  IconX,
  IconFileTypeTxt,
  IconFileTypePdf,
  IconFileCheck,
} from "@tabler/icons-react";

import { PRIMARY_COL } from "../constants/theme";
import { analyzeContract } from "../services/api";
import AIAnalysisResult from "./Results/AIAnalysisResult";

export default function MainContent() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClear = () => {
    setText("");
    setFile(null);
    setResult(null);
  };

  const handleDrop = (files) => {
    const droppedFile = files[0];
    setFile(droppedFile);

    if (droppedFile.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target.result);
      reader.readAsText(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!text && !file) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeContract(text, file);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error.message}`);
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
            Envie o PDF ou cole o texto para que nossa IA analise os riscos.
          </Text>
        </div>

        <div style={{ position: "relative" }}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          {file ? (
            <Paper
              withBorder
              p="md"
              radius="md"
              mb="md"
              style={{
                borderColor: PRIMARY_COL,
                backgroundColor: "rgba(67, 75, 231, 0.05)",
              }}
            >
              <Group justify="space-between">
                <Group>
                  <IconFileCheck color={PRIMARY_COL} />
                  <div>
                    <Text size="sm" fw={500}>
                      {file.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </Group>
                <ActionIcon color="red" variant="subtle" onClick={removeFile}>
                  <IconX size={20} />
                </ActionIcon>
              </Group>
            </Paper>
          ) : (
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={[
                "text/markdown",
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
                    Arraste o PDF aqui
                  </Text>
                  <Text size="xs" c="dimmed" inline mt={7} ta="left">
                    (Ou clique para selecionar)
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}

          <Textarea
            placeholder="Se preferir, cole o texto manualmente ou adicione observações..."
            label="Conteúdo ou Observações"
            autosize
            minRows={4}
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
            disabled={!text && !file}
            size="md"
          >
            Limpar
          </Button>

          <Button
            radius="xl"
            color={PRIMARY_COL}
            onClick={handleAnalyze}
            leftSection={<IconBrain size={16} />}
            disabled={!text && !file}
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
