'use client'
import React, { useEffect, useState } from 'react'
import { parseHeroesCsv } from '../utilities/parseCsv'
import HeroPoolSection from '@/components/HeroPoolSection'
import Grid from '@mui/material/Grid2'
import SelectedHeroes from '@/components/SelectedHeroes'
import Stack from '@mui/material/Stack'
import BarChart from '@/sections/Comparison/Bar'
import RadarChart from '@/components/Charts/Radar'
import { getChartLabels, getChartData } from '@/utilities/charts'

const primaryAttributes: PrimaryAttributeOptions[] = [ 0, 1, 2, 3 ]

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<SelectionHero[]>([])

  const handleHeroOptionClick = (id: number, selectedBy: SelectionOptions) => {
    if (selectedBy === 'your' && heroes.filter(hero => hero.selectedBy === 'your').length === 5) return
    if (selectedBy === 'opponent' && heroes.filter(hero => hero.selectedBy === 'opponent').length === 5) return
    
    setHeroes(current => [ ...current ].map(hero => {
      return {
        ...hero,
        selectedBy: hero.id === id ? selectedBy : hero.selectedBy
      }
    }))
  }

  const handleSelectedHeroRightClick = (id: number) => {
    setHeroes(current => [ ...current ].map(hero => {
      return {
        ...hero,
        selectedBy: hero.id === id ? null : hero.selectedBy
      }
    }))
  }

  // GET ALL HEROES FROM A CSV FILE
  useEffect(() => {
    const parseData = async () => {
      try {
        const response = await fetch('/data/heroes.csv')
        const csvText = await response.text()
        const parsedData = parseHeroesCsv(csvText)
        setHeroes(parsedData.map(parsedHero => {
          return {
            ...parsedHero,
            selectedBy: null
          }
        }))
      } catch (error) {
        console.error('Error reading CSV:', error)
      }
    }

    parseData()
  }, [])

  console.log({ heroes })

  return (
    <Grid
      container 
      spacing={2}
    >
      {/* SELECTED HEROES */}
      <Grid size={12}>
        <Stack 
          direction='row' 
          spacing={2}
        >
          {/* TODO: ADD RESET BUTTON IN THE MIDDLE */}
          {[ 'your', 'opponent' ].map(selectedBy => (
            <SelectedHeroes
              key={selectedBy}
              list={heroes.filter(hero => hero.selectedBy === selectedBy)}
              selectedBy={selectedBy as SelectionOptions}
              onRightClick={handleSelectedHeroRightClick}
            />
          ))}
        </Stack>
      </Grid>

      {/* HERO POOL */}
      {primaryAttributes.map(primaryAttribute  => (
        <Grid 
          key={primaryAttribute}
          size={6}
        >
          <HeroPoolSection
            primaryAttribute={primaryAttribute}
            list={heroes}
            onLeftClick={handleHeroOptionClick}
            onRightClick={handleHeroOptionClick}
          />
        </Grid>
      ))}

      {/* ATTRIBUTES COMPARISON */}
      <Grid size={12}>
        <Stack direction='row'>
          {/* RADAR CHARTS */}
          <RadarChart
            labels={getChartLabels('attributes')}
            yourData={getChartData('your', 'attributes', heroes)}
            opponentData={getChartData('opponent', 'attributes', heroes)}
          />
          <RadarChart
            labels={getChartLabels('roles')}
            yourData={getChartData('your', 'roles', heroes)}
            opponentData={getChartData('opponent', 'roles', heroes)}
          />
        </Stack>
      </Grid>

      <Grid size={12}>
        <Stack direction='row'>
          {/* BAR CHART */}
          <BarChart
            type='attributes'
            heroes={heroes}
          />
          <BarChart
            type='roles'
            heroes={heroes}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default App