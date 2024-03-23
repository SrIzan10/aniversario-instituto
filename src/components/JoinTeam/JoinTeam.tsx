'use client'

import React from "react";
import {Alert, Button, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useUser} from "@clerk/nextjs";
import joinTeam from "@/util/joinTeam";
import {useRouter} from "next-nprogress-bar";
import {notifications} from "@mantine/notifications";
import * as Sentry from "@sentry/nextjs";
import {PiWarningLight} from "react-icons/pi";
import revalidatePathServer from "@/util/revalidatePath";

export default function JoinTeam() {
  const [loading, setLoading] = React.useState(false);
  const userId = useUser().user?.id!
  const router = useRouter()

  const form = useForm({
    initialValues: {
      teamCode: '',
    },
    validate: {
      teamCode: (value) => value.length === 6 ? null : 'El código debe tener 6 caracteres',
    },
  })

  return (
    <div className='mainContent'>
      <form onSubmit={form.onSubmit((values) => {
        setLoading(true)
        joinTeam({ teamCode: values.teamCode, userId })
          .then((ret) => {
            // errors not getting handled in prod for some reason
            if (ret.success) {
              notifications.show({
                title: 'Equipo creado',
                message: `Te has unido correctamente al equipo`,
                color: 'green',
              })
              revalidatePathServer('/teams')
              router.push('/teams')
            } else {
              switch (ret.message) {
                case 'teamNotFound':
                  return notifications.show({
                    title: 'Error',
                    message: `El código del equipo no existe`,
                    color: 'red',
                  })
                case 'alreadyInTeam':
                  return notifications.show({
                    title: 'Error',
                    message: `Ya estás en este equipo`,
                    color: 'red',
                  })
                case 'teamFull':
                  return notifications.show({
                    title: 'Error',
                    message: `El equipo está lleno`,
                    color: 'red',
                  })
              }
            }
          })
          .catch(err => {
            notifications.show({
              title: 'Error',
              message: `Ha ocurrido un error inesperado\nSe ha enviado la info a los desarrolladores`,
              color: 'red',
            })
            Sentry.captureException(err)
          })
          .finally(() => setLoading(false))
      })}>
        <h1>Unirse a un equipo</h1>
        <TextInput
          label="Código del equipo"
          placeholder="123456"
          {...form.getInputProps('teamCode')}
        />
        <Space h={'md'} />
        <Button type={'submit'} loading={loading}>
          Unirse
        </Button>
      </form>
      <Space h={'md'} />
      <Alert variant="light" color="yellow" title="No habrá vuelta atrás" icon={<PiWarningLight />}>
        Una vez que entres en un equipo no podrás salir. <strong>INTRODUCE EL CÓDIGO CORRECTO</strong>
      </Alert>
    </div>
  )
}