import { AppShell, Group, Text, Container, Image } from "@mantine/core";

export default function Header() {
  return (
    <AppShell.Header>
      <Container fluid h="100%" px="md">
        <Group justify="space-between" h="100%">
          <Group gap="xs">
            <Image
              src="/SysATU.png"
              h={35}
              w="auto"
              fit="contain"
              alt="Logo SysATU"
            />
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              SysATU
            </Text>
          </Group>

          <Text size="sm" c="dimmed" visibleFrom="xs">
            Analisador de Termos de Uso
          </Text>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
