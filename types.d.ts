type GeneralHeroData = {
  id: number,
  name: string,
  name_loc: string,
  name_english_loc: string,
  primary_attr: number,
  complexity: number
}

type DetailHeroData = GeneralHeroData & {
  attack_capability: number,
  role_levels: number[],
}

type HeroCounterData = {
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