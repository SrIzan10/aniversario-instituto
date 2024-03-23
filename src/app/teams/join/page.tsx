import {auth} from "@clerk/nextjs";
import prisma from '@/db'
import JoinTeam from "@/components/JoinTeam/JoinTeam";
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
    return <div><h1>Ya has entrado a todas las actividades de equipo</h1></div>
  }

  return <JoinTeam />
}