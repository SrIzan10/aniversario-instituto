'use client'

import {Registration} from "@/components/RegistrationTable/RegistrationTable";
import {Group, Select} from "@mantine/core";
import {courses} from "@/constants/courses";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ListByGroup({ registration }: { registration: Registration[] }) {
  return (
    <Group>
      <Select
        placeholder={'Exportar listado de solo un grupo'}
        data={courses.map(course => course.name)}
        onChange={val => {
          const doc = new jsPDF()
          doc.text(`Listado del curso ${val}`, 10, 10)
          autoTable(doc, {
            head: [['Nombre', 'Actividad']],
            body: [...registration.filter(reg => reg.course === val).map(reg => {
              const [firstName, ...lastName] = reg.name.split(' ')
              return [`${lastName.join(' ')}, ${firstName}`, reg.activities.join(', ')]
            })],
            theme: 'grid'
          })
          doc.save(`listado-curso-${val}.pdf`)
        }}
      />
    </Group>
  )
}