'use client'

import {Alert, Button, Modal, NativeSelect, Space, TextInput} from "@mantine/core";
import {activities, Activity} from "@/constants/activities";
import React from "react";
import {useUser} from "@clerk/nextjs";
import createTeam from "@/util/createTeam";
import {notifications} from "@mantine/notifications";
import {useDisclosure} from "@mantine/hooks";
import {useRouter} from "next-nprogress-bar";
import * as Sentry from "@sentry/nextjs";
import {PiWarningLight} from "react-icons/pi";
import revalidatePathServer from "@/util/revalidatePath";
import TeamCode from "@/components/TeamCode/TeamCode";

export default function CreateTeam(props: { activities: Activity[] }) {
  const userId = useUser().user!.id!
  const router = useRouter()
  const [selectedActivity, setSelectedActivity] = React.useState<Activity>(props.activities[0]);
  const [teamName, setTeamName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // modal hooks
  const [opened, { open, close }] = useDisclosure(false);
  const [teamCode, setTeamCode] = React.useState('');

  return (
    <div className='mainContent'>
      <h1>Crear equipo</h1>
      <TextInput
        label="Nombre del equipo"
        placeholder="El mejor equipo"
        onChange={ev => setTeamName(ev.currentTarget.value)}
      />
      <NativeSelect
        label="Elige tu deporte"
        data={props.activities.map(act => act.name)}
        defaultValue={props.activities[0].name}
        onChange={ev => {
          setSelectedActivity(activities.find(act => act.name === ev.currentTarget.value)!)
        }}
      />
      <Space h="md" />
      <Button
        onClick={() => {
          setLoading(true)
          createTeam({ teamName, activity: selectedActivity, user: userId })
            .then((ret) => {
              // errors not getting handled in prod for some reason
              if (ret.success) {
                setTeamCode(ret.message!)
                open()
                notifications.show({
                  title: 'Equipo creado',
                  message: `Tu equipo ha sido creado correctamente`,
                  color: 'green',
                })
              } else {
                switch (ret.message) {
                  case 'missingFields':
                    return notifications.show({
                      title: 'Error',
                      message: `Por favor, rellena todos los campos`,
                      color: 'red',
                    })
                  case 'alreadyRegistered':
                    return notifications.show({
                      title: 'Error',
                      message: `Ya estás registrado en un equipo para esta actividad`,
                      color: 'red',
                    })
                  case 'teamNameTaken':
                    return notifications.show({
                      title: 'Error',
                      message: `El nombre del equipo en esta actividad ya está en uso`,
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
          setLoading(false)
        }}
        loading={loading}
      >
        Crear
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close()
          revalidatePathServer('/teams')
          router.push('/teams')
        }}
        title="Código del equipo"
      >
        <p>Este es el código del equipo:</p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Envíaselo a tus compañeros, después deben entrar a la web y darle al botón de "Entrar".</p>
        <TeamCode teamCode={teamCode} />

        <Alert variant="light" color="yellow" title="No habrá vuelta atrás" icon={<PiWarningLight />}>
          Una vez crees el equipo no podrás salir ni controlar quién entra, así que asegúrate de que mandas el código a las personas correctas.
        </Alert>
      </Modal>
    </div>
  )
}