import {auth} from "@clerk/nextjs";
import CreateTeam from "@/components/CreateTeam/CreateTeam";
import { activities } from "@/constants/activities";
import prisma from '@/db'
import {regsClosed} from "@/constants/regsClosed";

export default async function Page() {
  if (regsClosed) return <h1>Los registros están cerrados</h1>
  const { userId } = auth()
  const getTeams = await prisma.team.findMany({
    where: {
      members: {
        has: userId!
      }
    }
  })
  if (getTeams.length >= 2) {
    return <div><h1>Ya tienes todos los equipos creados</h1></div>
  }

  const notJoinedActivities = activities
    .filter(act => act.isTeam)
    .filter(act => !getTeams.map(team => team.activity).includes(act.id))

  return <CreateTeam activities={notJoinedActivities} />
}