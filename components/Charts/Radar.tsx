'use client' // Ensure client-side rendering

import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const labels = [
  { text: 'Attack', icon: '⚔️' },  // Use emoji
  { text: 'Defense', icon: '🛡️' },  // Use emoji
  { text: 'Speed', icon: '⚡' },   // Use emoji
  { text: 'Magic', icon: '✨' }   // Use emoji
]

const RadarChart = () => {
  const data = {
    labels: labels.map((label) => `${label.icon} ${label.text}`),
    datasets: [
      {
        label: 'Character Stats',
        data: [80, 60, 90, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }
    ]
  }

  const options = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 14 // Adjust label size
          }
        }
      }
    }
  }

  return <Radar data={data} options={options} />
}

export default RadarChart
