export const parseHeroesCsv = (csvText: string): CompleteHero[] => {
  const rows = csvText.split('\n').filter(row => row.trim() !== '')
  const parsedData: CompleteHero[] = rows.slice(1).map((row) => {
    const values = row.split(';').map(value => value.trim().replaceAll('"', ''))

    return {
      id: Number(values[0]),
      name: values[1],
      name_loc: values[2],
      name_english_loc: values[3],
      primary_attr: Number(values[4]),
      complexity: Number(values[5]),
      thumbnail_vertical: values[6],
      thumbnail_horizontal: values[7],
      icon: values[8],
      attack_capability: Number(values[9]),
      role_levels: values[10] ? values[10].split(',').map(Number) : [],
      counters: {
        badAgainst: {
          mainHeroes: values[11] ? values[11].split(',') : [],
          othersHeroes: values[12] ? values[12].split(',') : []
        },
        goodAgainst: {
          mainHeroes: values[13] ? values[13].split(',') : [],
          othersHeroes: values[14] ? values[14].split(',') : []
        },
        worksWellWith: {
          mainHeroes: values[15] ? values[15].split(',') : [],
          othersHeroes: values[16] ? values[16].split(',') : []
        }
      }
    }
  })

  return parsedData
}