'use client'
import React, { useEffect, useState } from 'react'
import { parseHeroesCsv } from './utilities/parseCsv'

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
    <div>
      Home
    </div>
  )
}

export default App