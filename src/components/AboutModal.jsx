import {
  Modal,
  ActionIcon,
  Text,
  Title,
  Stack,
  Affix,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { PRIMARY_COL } from "../constants/theme";

export default function AboutModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Affix position={{ bottom: 80, right: 20 }}>
        <ActionIcon
          color={PRIMARY_COL}
          size="xl"
          radius="xl"
          variant="filled"
          onClick={open}
          style={{ boxShadow: "var(--mantine-shadow-md)" }}
        >
          <IconInfoCircle style={{ width: rem(30), height: rem(30) }} />
        </ActionIcon>
      </Affix>

      <Modal
        opened={opened}
        onClose={close}
        title={
          <Title order={3} c={PRIMARY_COL}>
            Sobre o SysATU
          </Title>
        }
        centered
        radius="md"
        size="lg"
      >
        <Stack gap="md">
          <Text size="sm">
            Desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC),
            nosso compromisso é oferecer informações valiosas e pertinentes para
            os usuários. Nosso foco principal é simplificar a compreensão dos
            intricados termos de uso que frequentemente encontramos na web.
          </Text>

          <div>
            <Text fw={700} size="sm">
              Como Funciona:
            </Text>
            <Text size="sm">
              O SysATU é uma ferramenta intuitiva projetada para tornar a
              leitura e entendimento dos termos de uso uma tarefa fácil. Você
              pode simplesmente inserir o texto ou o PDF e nossa aplicação
              destacará os pontos mais importantes.
            </Text>
          </div>

          <div>
            <Text fw={700} size="sm">
              Nosso Compromisso:
            </Text>
            <Text size="sm">
              Estamos dedicados a proporcionar a melhor experiência possível.
              Agradecemos por escolher o SysATU e esperamos que encontre tudo o
              que precisa.
            </Text>
          </div>

          <Text size="xs" c="dimmed" ta="right">
            SysATU ® 2026
          </Text>
        </Stack>
      </Modal>
    </>
  );
}
