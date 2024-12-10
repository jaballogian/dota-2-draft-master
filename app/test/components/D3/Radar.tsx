'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { IconButton, Box, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const RadarChart = ({ data, labels }) => {
  const svgRef = useRef()
  const [labelPositions, setLabelPositions] = useState([])

  useEffect(() => {
    const margin = 50
    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2 - margin
    const angleSlice = (Math.PI * 2) / labels.length
    const labelOffset = 1.4 // Increase this for more spacing

    // Create the SVG element using D3
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Create grid lines
    const gridLines = svg
      .selectAll('.grid')
      .data([1, 2, 3, 4, 5])
      .enter()
      .append('circle')
      .attr('r', (d) => (radius / 5) * d)
      .attr('fill', 'none')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1)

    // Create axes (lines from center to outer radius)
    svg
      .selectAll('.axis')
      .data(labels)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', '#aaa')
      .attr('stroke-width', 2)

    // Create labels
    const positions = labels.map((label, i) => {
      const x = radius * labelOffset * Math.cos(angleSlice * i - Math.PI / 2) + width / 2
      const y = radius * labelOffset * Math.sin(angleSlice * i - Math.PI / 2) + height / 2
      return { label, x, y }
    })
    setLabelPositions(positions)

    // Function to create the radar chart polygon for each data series
    const drawRadarPolygon = (data, color, opacity = 0.3) => {
      svg
        .append('polygon')
        .attr(
          'points',
          data
            .map(
              (d, i) =>
                `${radius * Math.cos(angleSlice * i - Math.PI / 2)},${radius * Math.sin(angleSlice * i - Math.PI / 2)}`
            )
            .join(' ')
        )
        .attr('stroke', color) // Different colors for different data types
        .attr('stroke-width', 2)
        .attr('fill', color)
        .attr('fill-opacity', opacity)
    }

    // Draw polygons for each data series
    data.forEach((series, index) => {
      const color = index === 0 ? '#1E88E5' : '#FF5733' // Blue for "your data", Red for "opponent data"
      drawRadarPolygon(series, color)
    })

    // Add data points (circles) on the radar for each series
    data.forEach((series, index) => {
      svg
        .selectAll(`.data-point-${index}`)
        .data(series)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('cy', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('r', 6)
        .attr('fill', index === 0 ? '#1E88E5' : '#FF5733') // Blue for "your data", Red for "opponent data"
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
    })
  }, [data, labels])

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px' }}>
      <svg ref={svgRef} />
      {labelPositions.map((pos, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '4px 8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '12px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 'bold', color: '#1E88E5' }}>
            {pos.label}
          </Typography>
          <IconButton size='small' color='primary' aria-label={`Info about ${pos.label}`}>
            <InfoIcon fontSize='small' />
          </IconButton>
        </Box>
      ))}
    </div>
  )
}

export default RadarChart
