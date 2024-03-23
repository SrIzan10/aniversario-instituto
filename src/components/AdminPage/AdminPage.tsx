import prisma from "@/db";
import {activities} from "@/constants/activities";
import {courses} from "@/constants/courses";
import RegistrationTable from "@/components/RegistrationTable/RegistrationTable";
import SelectionGraph from "@/components/SelectionGraph/SelectionGraph";
import TeamTable from "@/components/TeamTable/TeamTable";
import ListByGroup from "@/components/ListByGroup/ListByGroup";

export default async function AdminPage() {
  const registeredUsers = (await prisma.registration.findMany({
    select: {
      activities: true,
      name: true,
      course: true,
      email: true,
    }
  })).map(user => {
    return {
      ...user,
      activities: user.activities.map(activity => {
        return activities.find(act => act.id === activity)?.name!
      }),
      course: courses.find(course => course.id === user.course)?.name!
    }
  })
  return (
    <div>
      <p>Esta página se ve mejor en ordenador</p>
      <h1>Listado de registros</h1>
      <RegistrationTable registrations={registeredUsers} />
      <h1>Listado de equipos</h1>
      <TeamTable teams={await prisma.team.findMany()} />
      <h1>Listado de grupos</h1>
      <ListByGroup registration={registeredUsers} />
      <h1>¿Qué están eligiendo?</h1>
      <SelectionGraph registrations={registeredUsers} />
    </div>
  )
}