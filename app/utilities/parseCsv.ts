export const parseCsv = (csvText: string): CsvHero[] => {
  const rows = csvText.split('\n').filter(row => row.trim() !== '')
  const parsedData: CsvHero[] = rows.slice(1).map((row) => {
    const values = row.split(';').map(value => value.trim().replaceAll('"', ''))

    return {
      id: Number(values[0]),
      name: values[1],
      name_loc: values[2],
      name_english_loc: values[3],
      primary_attr: Number(values[4]),
      complexity: Number(values[5]),
      thumbnail: values[6],
      attack_capability: Number(values[7]),
      role_levels: values[8] ? values[8].split(',').map(Number) : [],
      bad_against_main_heroes: values[9] ? values[9].split(',') : [],
      bad_against_others_heroes: values[10] ? values[10].split(',') : [],
      good_against_main_heroes: values[11] ? values[11].split(',') : [],
      good_against_others_heroes: values[12] ? values[12].split(',') : [],
      works_well_with_main_heroes: values[13] ? values[13].split(',') : [],
      works_well_with_others_heroes: values[14] ? values[14].split(',') : []
    }
  })

  return parsedData
}