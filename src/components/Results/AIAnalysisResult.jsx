import React from "react";
import { Card, Group, Text, Badge, Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

const AIAnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
      <Group justify="space-between" mb="xs">
        <Text fw={500}>Análise</Text>
        <Badge color="red" variant="light">
          Risco Detectado
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="md" ta="left">
        Encontramos os seguintes pontos de atenção no contrato:
      </Text>

      {analysis.points && analysis.points.length > 0 ? (
        analysis.points.map((point, index) => (
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
        ))
      ) : (
        <Alert variant="light" color="green" title="Tudo Certo" ta="left">
          Nenhum risco óbvio foi detectado neste trecho.
        </Alert>
      )}
    </Card>
  );
};

export default AIAnalysisResult;
