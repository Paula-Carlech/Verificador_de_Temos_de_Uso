import { AppShell, Container, Text, Group, Image } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AppShell.Footer p="md">
      <Container fluid>
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            SysATU ® 2023 - {currentYear}
          </Text>

          <Image
            src="/SysATU.png"
            h={25}
            w="auto"
            fit="contain"
            opacity={0.5}
            alt="Logo SysATU Footer"
          />
        </Group>
      </Container>
    </AppShell.Footer>
  );
}
