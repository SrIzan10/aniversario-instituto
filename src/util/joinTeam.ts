'use server'

import teamCodeExists from "@/util/teamCodeExists";
import prisma from '@/db'

export default async function joinTeam(data: { teamCode: string, userId: string }) {
  if (!await teamCodeExists(data.teamCode))
    return { success: false, message: 'teamNotExist' }

  const getTeam = (await prisma.team.findFirst({
    where: {
      teamId: data.teamCode
    }
  }))!
  if (await prisma.team.count({
    where:
      {
        members: { has: data.userId },
        activity: getTeam.activity
      }
  }) > 0)
    return { success: false, message: 'alreadyInTeam' }
  if (getTeam.activity === 'basket3v3' ? getTeam.members.length === 3 : getTeam.members.length === 6)
    return { success: false, message: 'teamFull' }

  await prisma.team.updateMany({
    where: {
      teamId: data.teamCode
    },
    data: {
      members: {
        push: data.userId
      }
    }
  })
  return { success: true, message: 'joined successfully' }
}