'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'

const RadarChart = () => {
  const yourData = [80, 50, 30, 40, 100, 20, 10, 70, 30]
  const opponentData = [20, 30, 40, 80, 20, 80, 40, 60, 80]

  const indicators = [
    { name: '2011', max: 100 },
    { name: '2012', max: 100 },
    { name: '2013', max: 100 },
    { name: '2014', max: 100 },
    { name: '2015', max: 100 },
    { name: '2016', max: 100 },
    { name: '2017', max: 100 },
    { name: '2018', max: 100 },
    { name: '2019', max: 100 }
  ]

  const options = {
    tooltip: {},
    radar: {
      indicator: indicators,
      axisName: {
        color: 'black',
        formatter: (value) => {
          const index = indicators.findIndex((ind) => ind.name === value)
          if (index !== -1) {
            const yourValue = yourData[index]
            const opponentValue = opponentData[index]

            const yourStyle = yourValue >= opponentValue ? 'yourFilled' : 'yourTransparent'
            const opponentStyle = opponentValue >= yourValue ? 'opponentFilled' : 'opponentTransparent'

            return `${value}: {${yourStyle}|${yourValue}} vs {${opponentStyle}|${opponentValue}}`
          }
          return value
        },
        rich: {
          yourFilled: {
            color: '#fff',
            backgroundColor: 'green',
            padding: [2, 2],
            borderRadius: 4,
            align: 'center'
          },
          yourTransparent: {
            color: '#000',
            backgroundColor: 'transparent',
            padding: [0, 0],
            borderRadius: 4,
            align: 'center'
          },
          opponentFilled: {
            color: '#fff',
            backgroundColor: 'red',
            padding: [2, 2],
            borderRadius: 4,
            align: 'center'
          },
          opponentTransparent: {
            color: '#000',
            backgroundColor: 'transparent',
            padding: [0, 0],
            borderRadius: 4,
            align: 'center'
          }
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            name: 'Your',
            value: yourData
          },
          {
            name: 'Opponent',
            value: opponentData
          }
        ]
      }
    ]
  }

  return <ReactECharts option={options} style={{ height: 300 }} />
}

export default RadarChart
