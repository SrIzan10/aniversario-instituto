'use client'

import {Alert, Button, MultiSelect, NativeSelect, Space} from "@mantine/core";
import { useState } from "react";
import { activities, type Activity } from "@/constants/activities";
import { PiWarningCircleBold } from "react-icons/pi";
import {useUser} from "@clerk/nextjs";
import {courses} from "@/constants/courses";
import submitForm from "@/util/submitForm";
import {notifications} from "@mantine/notifications";
import {useRouter} from "next-nprogress-bar";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function RegistrationForm() {
  const user = useUser()
  const router = useRouter()
    const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].id)

    return (
      <>
        <p>Regístrate a las actividades que quieras</p>
        <NativeSelect
          label={`Soy ${user.user!.fullName!}, del curso...`}
          description="Selecciona tu curso"
          data={courses.map(course => course.name)}
          defaultValue={courses[0].name}
          onChange={course => {
            const resolveCourseId = courses.find(c => c.name === course.target.value)!
            setSelectedCourse(resolveCourseId.id)
          }}
        />
        <MultiSelect
          label="...y quiero apuntarme a..."
          placeholder={'Robótica, Basket 3 vs 3...'}
          data={activities.map(act => act.name)}
          onChange={(selectedNames) => {
            const selectedActivities = activities.filter(act => selectedNames.includes(act.name));
            setSelectedActivities(selectedActivities);
            if (selectedActivities.length === 0) return;
          }}
        />
        <Space h="md" />
        <Button onClick={() => {
          submitForm({course: selectedCourse, activities: selectedActivities.map(act => act.id), user: user.user!.id!})
            .then((ret) => {
              // errors not getting handled in prod for some reason
              if (ret.success) {
                notifications.show({
                  title: 'Registrado',
                  message: 'Te has registrado correctamente',
                  color: 'green',
                  autoClose: 4000
                })
                router.refresh()
              } else {
                switch (ret.message) {
                  case 'missingFields':
                    return notifications.show({
                      title: 'Faltan campos',
                      message: 'Por favor, rellena todos los campos',
                      color: 'red',
                      autoClose: 4000
                    })
                  case 'alreadyRegistered':
                    return notifications.show({
                      title: 'Ya estás registrado',
                      message: 'Solo puedes registrarte una vez.',
                      color: 'red',
                      autoClose: 4000
                    })
                  case 'teamsNotJoined':
                    router.push('/teams')
                    return notifications.show({
                      title: 'No te has unido a un equipo',
                      message: 'Hemos detectado que has seleccionado una actividad que requiere equipo, pero no te has unido a ninguno. Te voy a enviar a la página de equipos para crear o unirte a uno',
                      color: 'red',
                      autoClose: 8000
                    })
                }
              }
            })
            .catch(err => {
              notifications.show({
                title: 'Error desconocido',
                message: 'Ha ocurrido un error desconocido. Prueba a unirte o crear un equipo',
                color: 'red',
                autoClose: 4000
              })
              Sentry.captureException(err)
            })
        }}>Registrar</Button>
        <Space h="md" />
        <Alert variant="light" color="blue" title="Juegos en equipo" icon={<PiWarningCircleBold />}>
          Las siguientes actividades necesitan un equipo para poder participar:
          <ul>
            <li>Basket 3v3: 3 personas por equipo</li>
            <li>Voleibol: 6 personas por equipo</li>
          </ul>
          <strong>Entra <Link href={'/teams'}>aquí</Link> para crear o entrar a los equipos</strong> si te interesa participar en estos deportes.
        </Alert>
      </>
    )
}