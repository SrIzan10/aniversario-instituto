import TeamCreationButtons from "@/components/TeamCreationButtons/TeamCreationButtons";
import {auth} from "@clerk/nextjs";
import TeamCard from "@/components/TeamCard/TeamCard";
import {Grid, GridCol} from "@mantine/core";
import prisma from '@/db'
import {regsClosed} from "@/constants/regsClosed";

export default async function Page() {
  const { userId } = auth()
  const getTeams = await prisma.team.findMany({
    where: {
      members: {
        has: userId!
      }
    }
  })
  return (
    <>
      <TeamCreationButtons regsClosed={regsClosed} />
      <div className={'mainContent'} style={{ paddingTop: '5px' }}>
        {/* this was a bit smart, the grid will return nothing if there's no team, so I just put the header in line 33 */}
        <Grid>
          {getTeams.map(act => {
            return (
              // if the user is in only one team, the card will take the full grid span (12), else it will take half of it (12 / 2 = 6)
              <GridCol key={act.activity} span={getTeams.length === 1 ? 12 : 6}>
                <TeamCard {...act} />
              </GridCol>
            )
          })}
        </Grid>
        {getTeams.length === 0 && <h1>Aún no has entrado a ningún equipo!</h1>}
      </div>
    </>
  )
}