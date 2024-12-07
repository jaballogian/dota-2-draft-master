'use client'
import React, { useEffect, useState } from 'react'
import { parseHeroesCsv } from '../utilities/parseCsv'
import HeroPoolSection from '@/components/HeroPoolSection'
import Grid from '@mui/material/Grid2'
import SelectedHeroes from '@/components/SelectedHeroes'
import Stack from '@mui/material/Stack'

const primaryAttributes: PrimaryAttributeOptions[] = [ 0, 1, 2, 3 ]

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<SelectionHero[]>([])

  const handleClick = (id: number, selectedBy: SelectionOptions) => {
    if (selectedBy === 'your' && heroes.filter(hero => hero.selectedBy === 'your').length === 5) return
    if (selectedBy === 'opponent' && heroes.filter(hero => hero.selectedBy === 'opponent').length === 5) return
    
    setHeroes(current => [ ...current ].map(hero => {
      return {
        ...hero,
        selectedBy: hero.id === id ? selectedBy : hero.selectedBy
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
          {[ 'your', 'opponent' ].map(selectedBy => (
            <SelectedHeroes
              key={selectedBy}
              list={heroes.filter(hero => hero.selectedBy === selectedBy)}
              selectedBy={selectedBy as SelectionOptions}
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
            onLeftClick={handleClick}
            onRightClick={handleClick}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default App