'use server'
import { revalidatePath } from "next/cache";

export default async function revalidatePathServer(path: string) {
  return revalidatePath(path, 'page')
}