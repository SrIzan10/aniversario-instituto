'use server'

import prisma from '@/db'

export default async function teamCodeExists(code: string) {
  return await prisma.team.count({
    where: {
      teamId: code
    }
  }) === 1
}