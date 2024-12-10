'use client'
import ReactECharts from 'echarts-for-react'

type Props = {
  labels: { name: string }[], 
  yourData: number[], 
  opponentData: number[]
}

const Radar = ({ labels, yourData, opponentData }: Props) => {
  const options = {
    color: [ 'green', 'red' ],
    radar: {
      indicator: labels,
      axisName: {
        color: 'black',
        formatter: (value: string) => {
          const index = labels.findIndex(item => item.name === value)
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

export default Radar
