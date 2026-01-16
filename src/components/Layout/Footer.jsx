import { AppShell, Container, Text, Group, Image } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const PRIMARY_COL = "#434be7";

  return (
    <AppShell.Footer p="md" bg={PRIMARY_COL} withBorder={false}>
      <Container fluid>
        <Group justify="space-between">
          <Text size="xs" c="white">
            SysATU ® 2023 - {currentYear}
          </Text>

          <Image
            src="/SysATU-White.png"
            h={35}
            w="auto"
            fit="contain"
            style={{ opacity: 0.9 }}
            alt="Logo SysATU Footer"
          />
        </Group>
      </Container>
    </AppShell.Footer>
  );
}
