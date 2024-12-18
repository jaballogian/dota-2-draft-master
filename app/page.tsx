'use client'
import React, { useEffect, useState } from 'react'
import { parseHeroesCsv } from '../utilities/parseCsv'
import HeroPoolSection from '@/components/HeroPoolSection'
import Grid from '@mui/material/Grid2'
import SelectedHeroes from '@/components/SelectedHeroes'
import Stack from '@mui/material/Stack'
import BarChart from '@/components/Charts/Bar'
import RadarChart from '@/components/Charts/Radar'
import { getChartLabels, getChartData } from '@/utilities/charts'
import Filters from '@/components/Filters'
import { typeIcons, attackTypeIcons, tagIcons } from '@/constants/initialData'

const primaryAttributes: PrimaryAttributeOptions[] = [ 0, 1, 2, 3 ]

const updateFilters = (filters: FilterIcons[], label: string): FilterIcons[] => {
  const newFilters: FilterIcons[] = [ ...filters ].map(filter => {
    let isSelected = filter.isSelected

    if (filter.label === label) isSelected = !filter.isSelected
    if (label === 'Melee' && filter.label === 'Range' && isSelected) isSelected = false
    if (label === 'Range' && filter.label === 'Melee' && isSelected) isSelected = false

    return {
      ...filter,
      isSelected
    }
  })

  return newFilters
}

const updateHeroesByFilters = (heroes: SelectionHero[], newFilters: FilterIcons[]): SelectionHero[] => {
  const newHeroes: SelectionHero[] = heroes.map(hero => {
    const selectedFilters = newFilters.filter(filter => filter.isSelected)
    let isFiltered = selectedFilters.length === 0

    if (selectedFilters.some(filter => filter.label === 'Melee' && hero.attack_capability === 1)) {
      isFiltered = true
    }

    if (selectedFilters.some(filter => filter.label === 'Range' && hero.attack_capability === 2)) {
      isFiltered = true
    }

    const roleFilters = selectedFilters.filter(filter => filter.index !== undefined)

    if (roleFilters.length > 0) {
      const roleMatch = roleFilters.every(filter => hero.role_levels[filter.index!] > 0)
      if (roleMatch) {
        isFiltered = true
      }
    }

    return {
      ...hero,
      isFiltered
    }
  })

  return newHeroes
}

const App: React.FC = () => {
  const [ filters, setFilters ] = useState<FilterIcons[]>([
    ...typeIcons, ...attackTypeIcons, ...tagIcons
  ])
  const [ heroes, setHeroes ] = useState<SelectionHero[]>([])

  const handleFilterIconClick = (label: string) => {
    const newFilters: FilterIcons[] = updateFilters([ ...filters ], label)
    setFilters(newFilters)

    setHeroes(updateHeroesByFilters([ ...heroes ], newFilters))
  }  

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
            selectedBy: null,
            isFiltered: true
          }
        }))
      } catch (error) {
        console.error('Error reading CSV:', error)
      }
    }

    parseData()
  }, [])

  // console.log({ filters })
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
          alignItems='center'
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

          <Filters
            filters={filters}
            onIconClick={handleFilterIconClick}
          />
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
            labels={getChartLabels('attributes')}
            yourData={getChartData('your', 'attributes', heroes).map(number => -(number))}
            opponentData={getChartData('opponent', 'attributes', heroes)}
          />
          <BarChart
            labels={getChartLabels('roles')}
            yourData={getChartData('your', 'roles', heroes).map(number => -(number))}
            opponentData={getChartData('opponent', 'roles', heroes)}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default App