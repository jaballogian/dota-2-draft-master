import RadarApex from '@/app/test/components/ApexCharts/Radar'
import RadarEchart from '@/app/test/components/Echarts/Radar'
// import Radar from '@/components/D3/Radar'
import RadarChart from '@/app/test/components/Charts/Radar'
import RadarD3 from '@/app/test/components/D3/Radar2Fix'
// import RadarD3 from '@/components/D3/Radar3'

const Test = () => {
  // const labels = ['Strength', 'Agility', 'Intelligence', 'Defense', 'Magic']
  // const data = [
  //   [80, 70, 90, 85, 95],  // Your data
  //   [75, 65, 85, 80, 92]  // Opponent data
  // ]

  const data = {
    id: 'Raphael Varane',
    data: [
      { skill: 'Defending', count: 16 },
      { skill: 'Physical', count: 14 },
      { skill: 'Speed', count: 12 },
      { skill: 'Creativity', count: 10 },
      { skill: 'Attacking', count: 10 },
      { skill: 'Technical', count: 11 },
      { skill: 'Aerial', count: 15 },
      { skill: 'Mental', count: 14 },
    ]
  }

  return (
    <div>
      <h1>This is just a page to test the development of some components</h1>
      {/* <Radar data={data} labels={labels} /> */}
      {/* <RadarApex/> */}
      <RadarEchart/>
      {/* <RadarChart/> */}
      <RadarD3 data={data.data}/>
    </div>
  )
}

export default Test