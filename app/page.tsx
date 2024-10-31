'use client'
import React, { useEffect, useState } from 'react'
import { getHeroCounters } from './utilities/heroCounters'
import { getAllGeneralHeroData, getDetailHeroData } from '@/app/utilities/heroes'
import { sampleDetailHeroData, sampleGeneralHeroDataList } from '@/app/constants/samples'

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<DetailHeroData[]>([])

  // GET GENERAL, DETAIL, AND COUNTER DATA FOR ALL HEROES
  useEffect(() => {
    const getData = async () => {
      // TO DO: UNCOMMENT THIS LINE
      // const allGeneralHeroData: GeneralHeroData[] = await getAllGeneralHeroData()
      const allGeneralHeroData: GeneralHeroData[] = sampleGeneralHeroDataList

      if (allGeneralHeroData.length > 0) {
        const allHeroes: DetailHeroData[] = await Promise.all(allGeneralHeroData.map(async (hero) => {
          // TO DO: UNCOMMENT THIS LINE
          const detailHerodata: DetailHeroData = await getDetailHeroData(hero.id)
          // const detailHerodata: DetailHeroData = sampleDetailHeroData

          const heroCounter = await getHeroCounters(detailHerodata?.name_loc)

          return {
            ...hero,
            attack_capability: detailHerodata?.attack_capability,
            role_levels: detailHerodata?.role_levels,
            counter: heroCounter
          }
        }))

        if (allHeroes.length > 0) setHeroes(allHeroes)
      }
    }

    getData()
  }, [])

  console.log({ heroes })

  return (
    <div>
      Home
    </div>
  )
}

export default App