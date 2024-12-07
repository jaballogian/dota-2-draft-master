'use client'
import React, { useEffect, useState } from 'react'
import { parseHeroesCsv } from '../utilities/parseCsv'
import HeroPoolSection from '@/components/HeroPoolSection'
import Grid from '@mui/material/Grid2'

const primaryAttributes: PrimaryAttributeOptions[] = [ 0, 1, 2, 3 ]

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<CompleteHero[]>([])

  // GET ALL HEROES FROM A CSV FILE
  useEffect(() => {
    const parseData = async () => {
      try {
        const response = await fetch('/data/heroes.csv')
        const csvText = await response.text()
        const parsedData = parseHeroesCsv(csvText)
        setHeroes(parsedData)
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
      {/* HERO POOL */}
      {primaryAttributes.map(primaryAttribute  => (
        <Grid 
          key={primaryAttribute}
          size={6}
        >
          <HeroPoolSection
            primaryAttribute={primaryAttribute}
            list={heroes}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default App