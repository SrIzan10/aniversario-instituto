'use server'

import {authorizedAdmins} from "@/constants/authorizedAdmins";

export default async function isAdmin(email: string) {
  return authorizedAdmins.includes(email)
}