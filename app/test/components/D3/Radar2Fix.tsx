// SOURCE: https://gist.github.com/bricedev/18093c83ec7e02db0e4c
'use client'
import ReactDOM from 'react-dom/client'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const SkillText = ({ skill, x, y }) => {
  return (
    <button
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#333',
        background: 'white',
        border: '1px solid #ccc',
        cursor: 'pointer'
      }}
      onClick={(event) => console.log(`Clicked: ${skill}`)}
    >
      {skill}
    </button>
  )
}

const RadarChart = ({ data }) => {
  const svgRef = useRef(null)
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const width = 960
    const height = 500
    const barHeight = height / 2 - 40

    const color = d3.scaleOrdinal().range([
      '#9eb36f',
      '#cadd9e',
      '#eee9a6',
      '#e3bf6b',
      '#c87572'
    ])
    
    const tickValues = [4, 8, 12, 16, 20]
    
    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
    
    const numBars = data.length

    // Define Scales
    const radius = d3
      .scaleLinear()
      .domain([0, 20])
      .range([0, barHeight])
  
    // Define Line and Area
    const line = d3
      .lineRadial()
      .curve(d3.curveLinearClosed)
      .radius((d) => radius(d.count))
      .angle((d, i) => (i * 2 * Math.PI) / numBars)
  
    const area = d3
      .areaRadial()
      .curve(d3.curveLinearClosed)
      .innerRadius(radius(0))
      .outerRadius(line.radius())
      .angle(line.angle())

    tickValues.sort((a, b) => b - a)

    const tickPath = svg
      .selectAll('.tickPath')
      .data(tickValues)
      .enter()
      .append('path')
      .attr('class', 'tickPath')
      .attr('d', (d) => {
        const tickArray = []
        for (let i = 0; i < numBars; i++) tickArray.push({ count: d })
        return area(tickArray)
      })
      .style('fill', (d) => color(d))
      .style('stroke', (d, i) => (i === 0 ? 'black' : '#5e5e5e'))
      .style('stroke-width', (d, i) => (i === 0 ? '1px' : '.5px'))

    const lines = svg
      .selectAll('line')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'lines')

    lines
      .append('line')
      .attr('y2', -barHeight)
      .style('stroke', '#5e5e5e')
      .style('stroke-width', '.5px')
      .attr('transform', (d, i) => `rotate(${(i * 360) / numBars})`)

    // Log the coordinates to check if they are correct
    lines.each((d, i, nodes) => {
      const node = nodes[i]
      const x = (barHeight + 15) * Math.sin((i * 2 * Math.PI) / numBars)
      const y = -(barHeight + 15) * Math.cos((i * 2 * Math.PI) / numBars)

      // Log coordinates for debugging
      console.log(`Skill: ${d.skill}, x: ${x}, y: ${y}`)

      // Render React component with the correct coordinates
      const group = node.appendChild(document.createElement('g'))
      const root = ReactDOM.createRoot(group)
      root.render(<SkillText skill={d.skill} x={x} y={y} />)
    })

    // Draw the radar chart
    svg
      .selectAll('.layer')
      .data([data])
      .enter()
      .append('path')
      .attr('class', 'layer')
      .attr('d', (d) => area(d))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '2px')

    // Calculate and set label positions
    const svgRect = svgRef.current.getBoundingClientRect()
    const newLabels = data.map((d, i) => {
      const x = (barHeight + 15) * Math.sin((i * 2 * Math.PI) / numBars)
      const y = -(barHeight + 15) * Math.cos((i * 2 * Math.PI) / numBars)

      return {
        skill: d.skill,
        x: svgRect.left + width / 2 + x,
        y: svgRect.top + height / 2 + y
      }
    })

    setLabels(newLabels)
  }, [data])

  return (
    <>
      <svg ref={svgRef} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {labels.map(({ skill, x, y }, index) => (
          <SkillText key={index} skill={skill} x={x} y={y} />
        ))}
      </div>
    </>
  )
}

export default RadarChart
