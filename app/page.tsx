'use client'
import React, { useEffect, useState } from 'react'
import { getHeroCounters } from './utilities/heroCounters'
import { getAllGeneralHeroData, getDetailHeroData } from '@/app/utilities/heroes'

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<DetailHeroData[]>([])

  // GET COUNTER DATA FOR A SINGLE HERO
  useEffect(() => {
    const getData = async () => {
      const heroCounter = await getHeroCounters()
      console.log({ heroCounter })
    }

    getData()
  }, [])

  // GET GENERAL AND DETAIL DATA FOR ALL HEROES
  useEffect(() => {
    const getData = async () => {
      const allGeneralHeroData: GeneralHeroData[] = await getAllGeneralHeroData()

      if (allGeneralHeroData.length > 0) {
        const allHeroes: DetailHeroData[] = await Promise.all(allGeneralHeroData.map(async (hero) => {
          const detailHerodata: DetailHeroData = await getDetailHeroData(hero.id)

          return {
            ...hero,
            attack_capability: detailHerodata.attack_capability,
            role_levels: detailHerodata.role_levels
          }
        }))

        if (allHeroes.length > 0) setHeroes(allHeroes)
      }
    }

    getData()
  }, [])

  console.log(heroes)

  return (
    <div>
      Home
    </div>
  )
}

export default App