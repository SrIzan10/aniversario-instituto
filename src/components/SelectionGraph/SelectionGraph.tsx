'use client'

import {Registration} from "@/components/RegistrationTable/RegistrationTable";
import {Bar} from "react-chartjs-2";
import {activities} from "@/constants/activities";
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

const randomBetween = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
const r = randomBetween(0, 255);
const g = randomBetween(0, 255);
const b = randomBetween(0, 255);

export default function SelectionGraph({ registrations }: { registrations: Registration[] }) {
  return (
    <div style={{ height: '300px' }}>
      <Bar
        data={{
          labels: activities.map(act => act.name),
          datasets: [{
            label: 'Número de inscritos',
            data: activities.map(act => registrations.filter(reg => reg.activities.includes(act.name)).length),
            backgroundColor: Array(activities.length).fill(`rgba(${r}, ${g}, ${b}, 0.2)`),
          }],
        }}
      />
    </div>
  )
}