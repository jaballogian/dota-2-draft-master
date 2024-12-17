// CHART

type ChartTypeOptions = 'attributes' | 'roles'

type ChartOptions = {
  labels: string[], 
  yourData: number[], 
  opponentData: number[]
}

type ChartYourStyleLabel = 'yourFilled' | 'yourTransparent'
type ChartOpponentStyleLabel = 'opponentFilled' | 'opponentTransparent'

// FILTER

type FilterIcons = { 
  label: string, 
  iconUrl: string,
  isSelected: boolean
}

// HERO

type PrimaryAttributeOptions = 0 | 1 | 2 | 3
type SelectionOptions = null | 'your' | 'opponent' | 'banned'

type GeneralHero = {
  id: number,
  name: string,
  name_loc: string,
  name_english_loc: string,
  primary_attr: number,
  complexity: number,
  thumbnail_vertical: string,
  thumbnail_horizontal: string,
  icon: string
}

type DetailHero = GeneralHero & {
  attack_capability: number,
  role_levels: number[],
}

type CounterHero = {
  badAgainst: {
    mainHeroes: string[],
    othersHeroes: string[]
  },
  goodAgainst: {
    mainHeroes: string[],
    othersHeroes: string[]
  },
  worksWellWith: {
    mainHeroes: string[],
    othersHeroes: string[]
  }
}

type CompleteHero = DetailHero & {
  counters: CounterHero
}

type CsvHero = Omit<DetailHero, 'role_levels'> & {
  role_levels: string,
  bad_against_main_heroes: string,
  bad_against_others_heroes: string,
  good_against_main_heroes: string,
  good_against_others_heroes: string,
  works_well_with_main_heroes: string,
  works_well_with_others_heroes: string,
}

type SelectionHero = CompleteHero & {
  selectedBy: SelectionOptions
}

type OnHeroClick = {
  onLeftClick: (id: number, selectedBy: SelectionOptions) => void,
  onRightClick: (id: number, selectedBy: SelectionOptions) => void
}