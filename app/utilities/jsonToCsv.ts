const flattenJson = (data: any[]): any[] => {
  return data.map(item => {
    return {
      id: item.id,
      name: item.name,
      name_loc: item.name_loc,
      name_english_loc: item.name_english_loc,
      primary_attr: item.primary_attr,
      complexity: item.complexity,
      attack_capability: item.attack_capability,
      role_levels: item.role_levels.join(','),
      bad_against_main_heroes: item.counter.badAgainst.mainHeroes.join(','),
      bad_against_others_heroes: item.counter.badAgainst.othersHeroes.join(','),
      good_against_main_heroes: item.counter.goodAgainst.mainHeroes.join(','),
      good_against_others_heroes: item.counter.goodAgainst.othersHeroes.join(','),
      works_well_with_main_heroes: item.counter.worksWellWith.mainHeroes.join(','),
      works_well_with_others_heroes: item.counter.worksWellWith.othersHeroes.join(',')
    }
  })
}

export const jsonToCsv = (data: any[]) => {
  const flatData = flattenJson(data)
  const headers = Object.keys(flatData[0])
  const csvRows = [
    headers.join(','),
    ...flatData.map(row => 
      headers.map(field => JSON.stringify(row[field], null, 0)).join(',')
    )
  ]

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'heroes.csv'
  link.click()

  URL.revokeObjectURL(url)

  console.log('exporting is done')
}
