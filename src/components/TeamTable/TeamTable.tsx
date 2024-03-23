import type {Team} from "@prisma/client";
import {Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr} from "@mantine/core";
import {activities} from "@/constants/activities";
import {clerkClient} from "@clerk/nextjs";
import TeamTablePdf from "@/components/TeamTablePdf/TeamTablePdf";

export default async function TeamTable({ teams }: { teams: Team[] }) {
  const treatedTeams = await Promise.all(teams.map(async (team) => {
    return {
      name: team.name,
      teamId: team.teamId,
      activity: activities.find(act => act.id === team.activity)?.name!,
      members: (await Promise.all(team.members.map(async (member) => {
        const resolveUser = await clerkClient.users.getUser(member)
          .catch(() => {
            return {firstName: 'Usuario', lastName: 'no encontrado'}
          })
        return `${resolveUser.firstName} ${resolveUser.lastName}`
      }))).join(', '),
    }
  }));
  const rows = treatedTeams.map((team) => (
    <TableTr key={team.teamId}>
      <TableTd>{team.name}</TableTd>
      <TableTd>{team.activity}</TableTd>
      <TableTd>{team.members}</TableTd>
      <TableTd>{team.teamId}</TableTd>
    </TableTr>
  ));

  return (
    <div>
      <TeamTablePdf teams={treatedTeams} />
      <div>
        <TableScrollContainer minWidth={500}>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Nombre</TableTh>
                <TableTh>Actividad</TableTh>
                <TableTh>Miembros</TableTh>
                <TableTh>Código</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>{rows}</TableTbody>
          </Table>
        </TableScrollContainer>
      </div>
    </div>
  )
}