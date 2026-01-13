import { Card, Group, Text, Badge, Alert, Stack } from "@mantine/core";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";

const AIAnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  const points = analysis.result?.points || [];
  const hasRisks = points.length > 0;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
      <Group justify="space-between" mb="md">
        <Text fw={500}>Análise</Text>

        {hasRisks ? (
          <Badge color="red" variant="light">
            Risco Detectado
          </Badge>
        ) : (
          <Badge color="green" variant="light">
            Seguro
          </Badge>
        )}
      </Group>

      {hasRisks && (
        <Text size="sm" c="dimmed" mb="md" ta="left">
          Encontramos os seguintes pontos de atenção no contrato:
        </Text>
      )}

      <Stack gap="sm">
        {hasRisks ? (
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
        ) : (
          <Alert
            variant="light"
            color="green"
            title="Tudo Certo"
            icon={<IconCheck size={16} />}
            ta="left"
          >
            Nenhum risco foi detectado neste documento.
          </Alert>
        )}
      </Stack>
    </Card>
  );
};

export default AIAnalysisResult;
