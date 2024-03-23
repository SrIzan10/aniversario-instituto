'use server'

import prisma from "@/db";
import {Activity} from "@/constants/activities";
import {randomString} from "util-utils";

export default async function createTeam(data: { teamName: string, activity: Activity, user: string }) {
  if (!data.teamName || !data.activity) return { success: false, message: 'missingFields' }
  if (await prisma.team.count({
    where:
      {
        members: { has: data.user },
        activity: data.activity.id
      }
  }) > 0)
    return { success: false, message: 'alreadyRegistered' }
  if (await prisma.team.count({
    where:
      {
        name: data.teamName,
        activity: data.activity.id
      }
  }) > 0)
    return { success: false, message: 'teamNameTaken' }

  const teamId = randomString(6, '0123456789')
  await prisma.team.create({
    data: {
      activity: data.activity.id,
      name: data.teamName,
      members: [data.user],
      teamOwner: data.user,
      teamId: teamId
    }
  })
  return { success: true, message: teamId }
}