'use client'

import {Button, Group, Select} from "@mantine/core";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {activities} from "@/constants/activities";

export default function TeamTablePdf({ teams }: { teams: TreatedTeam[] }) {
  return (
    <Group>
      <Button onClick={() => {
        const doc = new jsPDF()
        autoTable(doc, {
          head: [['Nombre', 'Actividad', 'Miembros', 'Código']],
          body: [...teams.map(team => [team.name, team.activity, team.members, team.teamId])],
          theme: 'grid'
        })
        doc.save('listadoEquipos.pdf')
      }}>
        Exportar PDF (todos los equipos)
      </Button>
      <Button onClick={() => {
        const csvConfig = mkConfig({ useKeysAsHeaders: true })
        // @ts-ignore
        const csv = generateCsv(csvConfig)(teams)
        download(csvConfig)(csv)
      }}>
        Exportar CSV (Excel, todos los equipos)
      </Button>
      <Select
        placeholder={'Exportar listado de solo una actividad'}
        data={activities.filter(act => act.isTeam).map(act => act.name)}
        onChange={val => {
          const doc = new jsPDF()
          doc.text(`Listado de ${val}`, 10, 10)
          autoTable(doc, {
            head: [['Nombre', 'Miembros', 'Código']],
            body: [...teams.filter(team => team.activity === val!).map(team => [team.name, team.members, team.teamId])],
            theme: 'grid'
          })
          doc.save(`listadoEquipos-${val}.pdf`)
        }}
      />
    </Group>
  )
}

type TreatedTeam = { name: string, teamId: string, activity: string, members: string }