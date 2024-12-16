'use client'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { values } from '@/constants/values'

// TODO: REPLACE WITH CUSTOM STACKED BAR CHART AFTER RELEASE
const Bar = ({ labels, yourData, opponentData }: ChartOptions) => {
  const options: EChartsOption = {
    color: [ 'green', 'red' ],
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
          formatter: value => {
            if (value?.dataIndex !== -1) {
              const yourValue: number = -(yourData[value?.dataIndex])
              const opponentValue: number = opponentData[value?.dataIndex]
  
              const yourStyle: ChartYourStyleLabel = (yourValue >= opponentValue && yourValue !== 0) ? 'yourFilled' : 'yourTransparent'
              return `{${yourStyle}|${yourValue}}`
            }
          },
          rich: values.chart.rich
        },
        itemStyle: {
          color: params => {
            if (params?.dataIndex !== -1) {
              const yourValue: number = -(yourData[params?.dataIndex])
              const opponentValue: number = opponentData[params?.dataIndex]
  
              const yourStyle: 'green' | 'grey' = (yourValue >= opponentValue && yourValue !== 0) ? 'green' : 'grey'
              return yourStyle
            }
          }
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
          formatter: value => {
            if (value?.dataIndex !== -1) {
              const yourValue: number = -(yourData[value?.dataIndex])
              const opponentValue: number = opponentData[value?.dataIndex]
  
              const opponentStyle: ChartOpponentStyleLabel = (opponentValue >= yourValue && opponentValue !== 0) ? 'opponentFilled' : 'opponentTransparent'  
              return `{${opponentStyle}|${opponentValue}}`
            }
          },
          rich: values.chart.rich
        },
        itemStyle: {
          color: params => {
            if (params?.dataIndex !== -1) {
              const yourValue: number = -(yourData[params?.dataIndex])
              const opponentValue: number = opponentData[params?.dataIndex]
  
              const opponentStyle: 'red' | 'grey' = (opponentValue >= yourValue && opponentValue !== 0) ? 'red' : 'grey'
              return opponentStyle
            }
          }
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