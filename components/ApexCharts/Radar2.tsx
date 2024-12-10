'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { Home, School, Work, FitnessCenter, Favorite, Flight } from '@mui/icons-material'

const categories = [
  { label: 'Home', icon: <Home /> },
  { label: 'School', icon: <School /> },
  { label: 'Work', icon: <Work /> },
  { label: 'Gym', icon: <FitnessCenter /> },
  { label: 'Love', icon: <Favorite /> },
  { label: 'Travel', icon: <Flight /> }
]

const Radar = () => {
  const chartRef = useRef<any>(null) // Using ref to access the chart
  const [labelsContainer, setLabelsContainer] = useState<Element | null>(null)

  useEffect(() => {
    // Access the DOM elements after the chart is mounted
    if (chartRef.current) {
      const container = chartRef?.current?.container?.querySelector('.apexcharts-xaxis')
      if (container) {
        setLabelsContainer(container)
      }
    }
  }, [ chartRef.current ])

  const series: ApexAxisChartSeries = [
    {
      name: 'Your',
      data: [80, 50, 30, 40, 100, 20]
    }, 
    {
      name: 'Opponent',
      data: [20, 30, 40, 80, 20, 80]
    }
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radar'
    },
    title: {
      text: 'Radar Chart - Custom Labels'
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: categories.map(cat => cat.label),
      labels: {
        show: false
      }
    },
    colors: ['#056517', '#bf1029'],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    }
  }

  // Render custom labels
  const renderCustomLabels = () => {
    if (!labelsContainer) return null

    return categories.map((cat, index) =>
      ReactDOM.createPortal(
        <div key={index} style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {cat.icon}
        </div>,
        labelsContainer
      )
    )
  }

  return (
    <div style={{ position: 'relative' }} ref={chartRef}>
      <ReactApexChart 
        options={options} 
        series={series} 
        type='radar' 
        height={350} 
      />
      {renderCustomLabels()}
    </div>
  )
}

export default Radar
