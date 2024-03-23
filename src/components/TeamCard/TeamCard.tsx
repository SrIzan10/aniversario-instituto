import type { Team } from '@prisma/client'
import {Badge, Card, Group, Text} from "@mantine/core";
import {activities} from "@/constants/activities";
import {clerkClient} from "@clerk/nextjs";
import TeamCodeButton from "@/components/TeamCodeButton/TeamCodeButton";

export default function TeamCard(data: Team) {
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{data.name}</Text>
          <Badge color="pink">{activities.find(act => act.id === data.activity)?.name}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Tu equipo de {activities.find(act => act.id === data.activity)?.name} está compuesto por {data.members.length} persona{data.members.length > 1 ? 's' : ''}:
          <ul>
            {data.members.map(async (member) => {
              const resolveUser = await clerkClient.users.getUser(member)
                  .catch(() => { return { firstName: 'Usuario', lastName: 'no encontrado' } })
              return <li key={member}>{resolveUser.firstName} {resolveUser.lastName}</li>
            })}
          </ul>
        </Text>
        <TeamCodeButton teamCode={data.teamId} />
      </Card>
    </div>
  )
}