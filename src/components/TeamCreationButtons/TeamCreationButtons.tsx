'use client'

import { useRouter } from "next-nprogress-bar";
import {Button, Group} from "@mantine/core";
import React from "react";
import revalidatePathServer from "@/util/revalidatePath";

export default function TeamCreationButtons({ regsClosed }: { regsClosed: boolean }) {
  const router = useRouter()

  return (
    <div style={{ marginRight: '5px' }}>
      <Group justify={'end'} gap={'xs'}>
        <Button
          onClick={() => {
            router.push('/teams/join')
          }}
          disabled={regsClosed}
          variant={'outline'}
          radius={'xs'}
        >
          Entrar
        </Button>
        <Button
          onClick={() => {
            revalidatePathServer('/teams/create')
            router.push('/teams/create')
          }}
          disabled={regsClosed}
          variant={'filled'}
          radius={'xs'}
        >
          Crear
        </Button>
      </Group>
    </div>
  )
}