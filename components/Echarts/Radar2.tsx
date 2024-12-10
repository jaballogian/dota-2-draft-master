'use client'

import React, { useEffect, useState, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const RadarChart = () => {
  const [labelPositions, setLabelPositions] = useState([])
  const chartRef = useRef(null)

  // Data and categories
  const seriesData = [
    { name: 'Your', data: [80, 50, 30, 40, 100, 20] },
    { name: 'Opponent', data: [20, 30, 40, 80, 20, 80] }
  ]
  const categories = ['2011', '2012', '2013', '2014', '2015', '2016']

  // ECharts options
  const options = {
    tooltip: {},
    legend: {
      data: seriesData.map((s) => s.name),
      top: 10
    },
    radar: {
      indicator: categories.map((name) => ({ name, max: 100 }))
    },
    series: [
      {
        name: 'Comparison',
        type: 'radar',
        data: seriesData.map((s) => ({
          value: s.data,
          name: s.name
        }))
      }
    ]
  }

  // Calculate label positions
  const recalculateLabelPositions = () => {
    if (!chartRef.current) return

    const chart = chartRef.current.getEchartsInstance()
    const radarModel = chart.getModel().getComponent('radar')

    const positions = categories.map((_, idx) => {
      const labelPoint = chart.convertToPixel(
        { seriesIndex: 0 },
        radarModel?.axis?.getLabelPosition(idx)
      )
      return labelPoint && labelPoint.length === 2
        ? { x: labelPoint[0], y: labelPoint[1] }
        : { x: 0, y: 0 }
    })

    setLabelPositions(positions)
  }

  useEffect(() => {
    const handleResize = () => recalculateLabelPositions()
    window.addEventListener('resize', handleResize)

    recalculateLabelPositions() // Initial calculation
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ position: 'relative', height: 400 }}>
      <ReactECharts
        ref={chartRef}
        option={options}
        style={{ height: '100%' }}
        onChartReady={recalculateLabelPositions}
      />

      {labelPositions.map((pos, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            top: pos.y - 16, // Center the icon
            left: pos.x - 16, // Center the icon
            color: '#f39c12',
            fontSize: 32,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <EmojiEventsIcon fontSize='large' />
        </div>
      ))}
    </div>
  )
}

export default RadarChart
