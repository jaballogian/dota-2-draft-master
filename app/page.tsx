'use client'
import React, { useEffect } from 'react'
import { getHeroCounters } from './utilities/heroCounters'

const App: React.FC = () => {
  useEffect(() => {
    const getData = async () => {
      const result = await getHeroCounters()
      console.log(result)
    }

    getData()
  }, [])

  return (
    <div>
      Home
    </div>
  )
}

export default App