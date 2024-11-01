type GeneralHero = {
  id: number,
  name: string,
  name_loc: string,
  name_english_loc: string,
  primary_attr: number,
  complexity: number
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

type CompleteHero = DetailHero & CounterHero