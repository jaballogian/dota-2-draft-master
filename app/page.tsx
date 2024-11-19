'use client'
import React, { useEffect, useState } from 'react'
import { getCounterHeroes } from './utilities/heroCounters'
import { getAllGeneralHero, getDetailHero } from '@/app/utilities/heroes'
import { jsonToCsv } from './utilities/jsonToCsv'

const App: React.FC = () => {
  const [ heroes, setHeroes ] = useState<CompleteHero[]>([])

  // GET GENERAL, DETAIL, AND COUNTER DATA FOR ALL HEROES
  useEffect(() => {
    const getData = async () => {
      const allGeneralHero: GeneralHero[] = await getAllGeneralHero()

      if (allGeneralHero.length > 0) {
        const allHeroes: CompleteHero[] = await Promise.all(allGeneralHero.map(async (hero) => {
          const detailHero: DetailHero = await getDetailHero(hero.id)

          const counterHeroes: CounterHero = await getCounterHeroes(detailHero?.name_loc)
          console.log({ counterHeroes })

          return {
            ...hero,
            thumbnail: `/images/heroes/${hero.name.replace('npc_dota_hero_', '')}_vert.png`,
            attack_capability: detailHero?.attack_capability,
            role_levels: detailHero?.role_levels,
            counter: counterHeroes
          }
        }))

        if (allHeroes.length > 0) {
          setHeroes(allHeroes)
          jsonToCsv(allHeroes)
        }
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