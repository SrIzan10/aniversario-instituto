import styles from './index.module.css'
import {SignOutButton} from "@clerk/nextjs";

export default function SchoolEmailLogin() {
  return (
    <div className={styles.centered}>
      <h1>Debes iniciar sesión con el correo del instituto</h1>
      <p>¡Hola! Necesitamos que inicies sesión con el correo del instituto para así identificarte mejor.</p>
      <SignOutButton />
    </div>
  )
}