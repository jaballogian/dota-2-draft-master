import RadarChart from '@/components/Charts/Radar'

type Props = {
  type: TypeOptions,
  heroes: SelectionHero[]
}
type TypeOptions = 'attributes' | 'roles'

const getLabels = (type: TypeOptions): { name: string }[] => {
  switch (type) {
  case 'attributes':
    return [ 'Strength', 'Agility', 'Intelligence', 'Universal', 'Meele', 'Range' ].map(label => {
      return { name: label }
    })
  case 'roles':
    return [ 'Carry', 'Support', 'Nuker', 'Disabler', 'Jungler', 'Durable', 'Escape', 'Pusher', 'Initiator' ].map(label => {
      return { name: label }
    })
  default:
    return []
  }
}

const getRolePowerByRoleIndex = (selectedHeroes: SelectionHero[], roleIndex: number): number => {
  return selectedHeroes.map(hero => hero.role_levels[roleIndex]).reduce((a, b) => a + b, 0)
}

const getData = (team: SelectionOptions, type: TypeOptions, heroes: SelectionHero[]): number[] => {
  const selectedHeroes = heroes.filter(hero => hero.selectedBy === team)
  
  if (type === 'attributes') return [
    ...Array.from(Array(4).keys())
      .map(key => selectedHeroes.filter(hero => hero.primary_attr === key).length),
    selectedHeroes.filter(hero => hero.attack_capability === 1).length,
    selectedHeroes.filter(hero => hero.attack_capability === 2).length
  ]
  else if (type === 'roles') return Array.from(Array(9).keys())
    .map(key => getRolePowerByRoleIndex(selectedHeroes, key))
  else return []
}

const Radar = ({ type, heroes }: Props) => {
  return (
    <RadarChart
      labels={getLabels(type)}
      yourData={getData('your', type, heroes)}
      opponentData={getData('opponent', type, heroes)}
    />
  )
}

export default Radar