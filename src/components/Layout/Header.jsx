import { AppShell, Group, Text, Container, Image } from "@mantine/core";

export default function Header() {
  const PRIMARY_COL = "#434be7";

  return (
    <AppShell.Header bg={PRIMARY_COL} withBorder={false}>
      <Container fluid h="100%" px="md">
        <Group justify="space-between" h="100%">
          <Group gap="xs">
            <Image
              src="/SysATU-White.png"
              h={50}
              w="auto"
              fit="contain"
              alt="Logo SysATU"
            />

            <Text size="xl" fw={900} c="white">
              SysATU
            </Text>
          </Group>

          <Text size="sm" c="gray.2" visibleFrom="xs">
            Analisador de Termos de Uso
          </Text>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
