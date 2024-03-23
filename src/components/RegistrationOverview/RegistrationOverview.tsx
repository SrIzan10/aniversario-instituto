import {auth} from "@clerk/nextjs";
import styles from '../../app/index.module.css'
import prisma from "@/db";
import {activities} from "@/constants/activities";

export default async function RegistrationOverview() {
  const { userId } = auth();
  const getRegistration = await prisma?.registration.findFirst({ where: { userId: userId! } })

  return (
    <main className={styles.mainContent}>
      <p>¡Ya estás registrado!</p>
      <p>Estás en las siguientes actividades:</p>
      <ul>
        {
          getRegistration!.activities.map(a => <li key={a}>{activities.find(act => act.id === a)?.name}</li>)
        }
      </ul>
    </main>
  )
}