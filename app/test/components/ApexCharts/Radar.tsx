'use client'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Radar = () => {
  const series: ApexAxisChartSeries = [{
    name: 'Your',
    data: [80, 50, 30, 40, 100, 20]
  }, {
    name: 'Opponent',
    data: [20, 30, 40, 80, 20, 80]
  }]
  const categories: string[] = ['2011', '2012', '2013', '2014', '2015', '2016']
  const positions = [
    { x: '50%', y: 0 },
    { x: '50%' + 10, y: '33%' },
    { x: '60%', y: '80%' },
    { x: '50%', y: '100%' },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
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
    yaxis: {
      show: false,
      stepSize: 20
    },
    xaxis: {
      categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
      labels: {
        formatter: function (value) {
          const index = ['2011', '2012', '2013', '2014', '2015', '2016'].indexOf(value);
          const yourData = [80, 50, 30, 40, 100, 20][index];
          const opponentData = [20, 30, 40, 80, 20, 80][index];
    
          return `
            <strong>${value}:</strong> 
            <span style="background: #056517; padding: 2px 4px; border-radius: 3px;">
              ${yourData}
            </span> 
            vs 
            <span style="background: #bf1029; padding: 2px 4px; border-radius: 3px;">
              ${opponentData}
            </span>
          `;
        }
      }
    },  
    colors: ['#056517', '#bf1029'],
    legend: {
      show: false
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    }
  }

  return (
    <Stack
      position='relative'
      bgcolor='orange'
      height={350}
    >
      {/* LABELS */}
      {/* {categories.map((category, index) => (
        <Stack
          key={category}
          position='absolute'
          sx={{ 
            left: positions[index].x, 
            top: positions[index].y, 
            transform: `translate(-${positions[index].x}, -${positions[index].y})`
          }}
        >
          <Typography>
            {category}
          </Typography>
        </Stack>
      ))} */}

      {/* CHART */}
      <ReactApexChart 
        options={options} 
        series={series} 
        type='radar' 
        height={350} 
      />
    </Stack>
  )
}

export default Radar