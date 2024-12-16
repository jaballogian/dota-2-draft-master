'use client'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { values } from '@/constants/values'

// TODO: REPLACE WITH CUSTOM RADAR CHART AFTER RELEASE
const Radar = ({ labels, yourData, opponentData }: ChartOptions) => {
  const options: EChartsOption = {
    color: [ 'green', 'red' ],
    radar: {
      indicator: labels.map(label => {
        return { name: label }
      }),
      axisName: {
        color: 'black',
        formatter: (value: string) => {
          const index = labels.findIndex(item => item === value)
          if (index !== -1) {
            const yourValue: number = yourData[index]
            const opponentValue: number = opponentData[index]

            const yourStyle: ChartYourStyleLabel = (yourValue >= opponentValue && yourValue !== 0) ? 'yourFilled' : 'yourTransparent'
            const opponentStyle: ChartOpponentStyleLabel = (opponentValue >= yourValue && opponentValue !== 0) ? 'opponentFilled' : 'opponentTransparent'

            return `${value}: {${yourStyle}|${yourValue}} vs {${opponentStyle}|${opponentValue}}`
          }
          return value
        },
        rich: values.chart.rich
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

  return (
    <ReactECharts 
      option={options} 
      style={{ height: 300, width: '30%' }} 
    />
  )
}

export default Radar
