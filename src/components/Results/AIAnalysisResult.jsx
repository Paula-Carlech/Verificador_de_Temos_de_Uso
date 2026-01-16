import { Card, Group, Text, Badge, Alert, Stack } from "@mantine/core";
import {
  IconAlertTriangle,
  IconCheck,
  IconFileOff,
  IconServerOff,
} from "@tabler/icons-react";

const AIAnalysisResult = ({ analysis }) => {
  // If no analysis object yet, show nothing
  if (!analysis) return null;

  // Validation for invalid content (non-contract)
  if (analysis.is_contract === false) {
    return (
      <Alert
        variant="light"
        color="blue"
        title="Documento Inválido"
        icon={<IconFileOff size={16} />}
        mt="md"
      >
        {analysis.message ||
          "O conteúdo enviado não parece ser um contrato válido."}
      </Alert>
    );
  }

  const points = analysis.points || [];
  const isError = analysis.error === true;

  /* We only consider it "Safe" if:
     - It IS a contract (is_contract: true)
     - There are NO risk points
     - There is NO error
  */
  const isSafe =
    analysis.is_contract === true && points.length === 0 && !isError;
  const hasRisks = points.length > 0;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
      <Group justify="space-between" mb="md">
        <Text fw={500}>{isError ? "Falha na Análise" : "Análise"}</Text>

        {!isError && analysis.is_contract && (
          <Badge color={hasRisks ? "red" : "green"} variant="light">
            {hasRisks ? "Risco Detectado" : "Seguro"}
          </Badge>
        )}
      </Group>

      <Stack gap="sm">
        {isError ? (
          <Alert
            variant="light"
            color="red"
            title="Serviço Indisponível"
            icon={<IconServerOff size={16} />}
            ta="left"
          >
            {points[0] || "Erro desconhecido na conexão com a IA."}
          </Alert>
        ) : hasRisks ? (
          points.map((point, index) => (
            <Alert
              variant="light"
              color="orange"
              title="Atenção"
              icon={<IconAlertTriangle size={16} />}
              key={index}
              ta="left"
            >
              {point}
            </Alert>
          ))
        ) : isSafe ? (
          <Alert
            variant="light"
            color="green"
            title="Tudo Certo"
            icon={<IconCheck size={16} />}
            ta="left"
          >
            Nenhum risco foi detectado neste documento.
          </Alert>
        ) : null}
      </Stack>
    </Card>
  );
};

export default AIAnalysisResult;
