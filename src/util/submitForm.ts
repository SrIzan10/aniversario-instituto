'use server'

import prisma from "@/db";
import {clerkClient} from "@clerk/nextjs";

export default async function submitForm(data: { activities: string[], course: string, user: string}) {
  if (data.activities.length === 0) return { success: false, message: "missingFields" }
  if (await prisma.registration.count({ where: { userId: data.user } }) > 0) return { success: false, message: "alreadyRegistered" }
  if (data.activities.includes('basket3v3')) {
    if (await prisma.team.count({ where: { activity: 'basket3v3', members: { has: data.user } } }) === 0) return { success: false, message: "teamsNotJoined" }
  }
  if (data.activities.includes('voleibol')) {
    if (await prisma.team.count({ where: { activity: 'voleibol', members: { has: data.user } } }) === 0) return { success: false, message: "teamsNotJoined" }
  }

  const resolveUser = await clerkClient.users.getUser(data.user)
  await prisma.registration.create({
        data: {
          userId: data.user,
          name: resolveUser.firstName! + ' ' + resolveUser.lastName!,
          email: resolveUser.emailAddresses![0].emailAddress!,
          course: data.course,
          activities: data.activities
        }
  })
  return { success: true, message: 'success' }
}