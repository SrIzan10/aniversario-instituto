import { Title } from "@mantine/core";
import styles from "./index.module.css";
import prisma from "@/db";
import {auth} from "@clerk/nextjs";
import RegistrationOverview from "@/components/RegistrationOverview/RegistrationOverview";
import {regsClosed} from "@/constants/regsClosed";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default async function Home() {
  const { userId } = auth();
  const userRegistered = await prisma.registration.count({ where: { userId: userId! } }) === 1
  return (
    <main className={styles.mainContent}>
      <Title order={2}>Regístrate</Title>
      {
        userRegistered ? <RegistrationOverview /> : (regsClosed ? <h3>Los registros están cerrados</h3> : <RegistrationForm />)
      }
    </main>
  );
}
