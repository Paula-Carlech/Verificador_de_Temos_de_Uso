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
import "../App.css";

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
      setResult({
        error: true,
        points: [
          "Não foi possível estabelecer conexão com o servidor. Verifique se o backend está rodando.",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={2} ta="center" mb={5} className="main-title">
            Verifique a segurança do seu contrato
          </Title>
          <Text c="dimmed" ta="center" size="sm">
            Envie o PDF ou cole o texto para que nossa IA analise os riscos.
          </Text>
        </div>

        <div className="relative-container">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          {file ? (
            <Paper withBorder p="md" radius="md" mb="md" className="file-paper">
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
              maxSize={5 * 1024 ** 2}
              accept={["text/plain", MIME_TYPES.pdf]}
              mb="md"
              radius="md"
              className="dropzone-root"
            >
              <Group
                justify="center"
                gap="xl"
                mih={80}
                className="pointer-none"
              >
                <Dropzone.Idle>
                  <Group gap="md">
                    <IconFileTypePdf
                      style={{
                        width: rem(40),
                        height: rem(40),
                        color: PRIMARY_COL,
                      }}
                    />
                    <IconFileTypeTxt
                      style={{
                        width: rem(40),
                        height: rem(40),
                        color: PRIMARY_COL,
                      }}
                    />
                  </Group>
                </Dropzone.Idle>
                <div>
                  <Text size="md" inline fw={500}>
                    Arraste o PDF aqui
                  </Text>
                  <Text size="xs" c="dimmed" inline mt={7}>
                    (Ou clique para selecionar)
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}

          <Textarea
            placeholder="Se preferir, cole o texto manualmente..."
            label="Conteúdo ou Observações"
            autosize
            minRows={4}
            maxRows={12}
            radius="md"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            classNames={{ input: "textarea-input" }}
          />
        </div>

        <Group justify="center" mt="xs">
          <Button
            radius="xl"
            color={PRIMARY_COL}
            onClick={handleClear}
            leftSection={<IconTrash size={16} />}
            disabled={!text && !file}
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
          >
            Analisar
          </Button>
        </Group>

        <AIAnalysisResult analysis={result} />
      </Stack>
    </Container>
  );
}
