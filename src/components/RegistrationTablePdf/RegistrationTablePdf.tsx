'use client'

import {Registration} from "@/components/RegistrationTable/RegistrationTable";
import {Button, Group, Select} from "@mantine/core";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {activities} from "@/constants/activities";

export default function RegistrationTablePdf({ registrations }: { registrations: Registration[] }) {
  return (
    <Group>
      <Button onClick={() => {
        const doc = new jsPDF()
        autoTable(doc, {
          head: [['Nombre', 'Curso', 'Actividades', 'Email']],
          body: [...registrations.map(reg => [reg.name, reg.course, reg.activities.join(', '), reg.email])],
          theme: 'grid'
        })
        doc.save('listado.pdf')
      }}>Exportar PDF (todas las actividades)</Button>
      <Button onClick={() => {
        const csvConfig = mkConfig({ useKeysAsHeaders: true })
        // @ts-ignore
        const csv = generateCsv(csvConfig)([...registrations.map(reg => ({ ...reg, activities: reg.activities.join(', ') }))])
        download(csvConfig)(csv)
      }}>Exportar CSV (Excel, todas las actividades)</Button>
      <Select
        placeholder="Exportar listado de solo una actividad"
        data={activities.map(act => act.name)}
        onChange={val => {
          const doc = new jsPDF()
          doc.text(`Listado de ${val}`, 10, 10)
          autoTable(doc, {
            head: [['Nombre', 'Curso', 'Email']],
            body: [...registrations.filter(reg => reg.activities.includes(val!)).map(reg => [reg.name, reg.course, reg.email])],
            theme: 'grid'
          })
          doc.save(`listado-${val}.pdf`)
        }}
      />
    </Group>
  )
}