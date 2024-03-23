'use client'

import {useDisclosure} from "@mantine/hooks";
import {Button, Modal} from "@mantine/core";
import TeamCode from "@/components/TeamCode/TeamCode";

export default function TeamCodeButton({ teamCode }: { teamCode: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Código del equipo">
        Este es el código del equipo:
        <TeamCode teamCode={teamCode} />
      </Modal>

      <Button onClick={open}>Código del equipo</Button>
    </>
  );
}