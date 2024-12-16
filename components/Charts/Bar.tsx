'use client'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { values } from '@/constants/values'

// TODO: REPLACE WITH CUSTOM STACKED BAR CHART AFTER RELEASE
const Bar = ({ labels, yourData, opponentData }: ChartOptions) => {
  const options: EChartsOption = {
    color: [ 'lightblue', 'aquamarine' ],
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: labels
      }
    ],
    series: [
      {
        name: 'Your',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left',
          formatter: function (value) {
            if (value?.dataIndex !== -1) {
              const yourValue: number = -(yourData[value?.dataIndex])
              const opponentValue: number = opponentData[value?.dataIndex]
  
              const yourStyle: ChartYourStyleLabel = (yourValue >= opponentValue && yourValue !== 0) ? 'yourFilled' : 'yourTransparent'
              return `{${yourStyle}|${yourValue}}`
            }
          },
          rich: values.chart.rich
        },
        data: yourData
      },
      {
        name: 'Opponent',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'right',
          formatter: function (value) {
            if (value?.dataIndex !== -1) {
              const yourValue: number = -(yourData[value?.dataIndex])
              const opponentValue: number = opponentData[value?.dataIndex]
  
              const opponentStyle: ChartOpponentStyleLabel = (opponentValue >= yourValue && opponentValue !== 0) ? 'opponentFilled' : 'opponentTransparent'  
              return `{${opponentStyle}|${opponentValue}}`
            }
          },
          rich: values.chart.rich
        },
        data: opponentData
      }
    ]
  }

  return (
    <ReactECharts 
      option={options} 
      style={{ height: 300, width: '40%' }} 
    />
  )
}

export default Bar