export const getChartLabels = (type: ChartTypeOptions): string[] => {
  switch (type) {
  case 'attributes':
    return [ 'Strength', 'Agility', 'Intelligence', 'Universal', 'Meele', 'Range' ]
  case 'roles':
    return [ 'Carry', 'Support', 'Nuker', 'Disabler', 'Jungler', 'Durable', 'Escape', 'Pusher', 'Initiator' ]
    // TODO: REMOVE JUNGLER BECAUSE NO JUNGLER HEROES
    // .filter((_, key) => key !== 4)
  default:
    return []
  }
}

const getRolePowerByRoleIndex = (selectedHeroes: SelectionHero[], roleIndex: number): number => {
  return selectedHeroes.map(hero => hero.role_levels[roleIndex]).reduce((a, b) => a + b, 0)
}

export const getChartData = (team: SelectionOptions, type: ChartTypeOptions, heroes: SelectionHero[]): number[] => {
  const selectedHeroes = heroes.filter(hero => hero.selectedBy === team)
  
  if (type === 'attributes') return [
    ...Array.from(Array(4).keys())
      .map(key => selectedHeroes.filter(hero => hero.primary_attr === key).length),
    selectedHeroes.filter(hero => hero.attack_capability === 1).length,
    selectedHeroes.filter(hero => hero.attack_capability === 2).length
  ]
  else if (type === 'roles') return Array.from(Array(9).keys())
    .map(key => getRolePowerByRoleIndex(selectedHeroes, key))
    // TODO: REMOVE JUNGLER BECAUSE NO JUNGLER HEROES
    // .filter((_, key) => key !== 4)
  else return []
}