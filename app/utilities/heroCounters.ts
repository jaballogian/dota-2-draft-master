import axiosFandom from '@/app/apis/axiosFandom'
import queryString from 'query-string'

const extractSections = (content: string): Record<string, { 
  // mainContent: string; 
  // othersContent: string; 
  mainHeroes: string[]; 
  othersHeroes: string[] 
}> => {
  const sections: Record<string, { 
    // mainContent: string; 
    // othersContent: string; 
    mainHeroes: string[]; 
    othersHeroes: string[] 
  }> = {}

  // Regex patterns to capture each section and "Others" subsection separately
  const badAgainstMatch = content.match(/== Bad against\.\.\. ==([\s\S]*?)(=== Others ===([\s\S]*?))(==|$)/)
  const goodAgainstMatch = content.match(/== Good against\.\.\. ==([\s\S]*?)(=== Others ===([\s\S]*?))(==|$)/)
  const worksWellWithMatch = content.match(/== Works well with\.\.\. ==([\s\S]*?)(=== Others ===([\s\S]*?))(==|$)/)

  // Helper functions for hero name extraction
  const extractMainHeroes = (text: string): string[] => {
    const matches = [...text.matchAll(/{{hero label\|([^|]+)\|border=[^}]+}}/g)]
    return matches.map(match => match[1])
  }

  const extractOthersHeroes = (text: string): string[] => {
    const matches = [...text.matchAll(/{{H\|([^}]+)}}/g)]
    return matches.map(match => match[1])
  }

  if (badAgainstMatch) {
    sections['badAgainst'] = {
      // mainContent: badAgainstMatch[1].trim(),
      // othersContent: badAgainstMatch[3]?.trim() || '',
      mainHeroes: extractMainHeroes(badAgainstMatch[1]),
      othersHeroes: extractOthersHeroes(badAgainstMatch[3] || '')
    }
  }

  if (goodAgainstMatch) {
    sections['goodAgainst'] = {
      // mainContent: goodAgainstMatch[1].trim(),
      // othersContent: goodAgainstMatch[3]?.trim() || '',
      mainHeroes: extractMainHeroes(goodAgainstMatch[1]),
      othersHeroes: extractOthersHeroes(goodAgainstMatch[3] || '')
    }
  }

  if (worksWellWithMatch) {
    sections['worksWellWith'] = {
      // mainContent: worksWellWithMatch[1].trim(),
      // othersContent: worksWellWithMatch[3]?.trim() || '',
      mainHeroes: extractMainHeroes(worksWellWithMatch[1]),
      othersHeroes: extractOthersHeroes(worksWellWithMatch[3] || '')
    }
  }

  return sections
}

export const getHeroCounters = async (heroName: string) => {
  try {
    const result = await axiosFandom.get(`?${queryString.stringify({
      action: 'query',
      format: 'json',
      prop: 'revisions',
      titles: `${heroName}/Counters`,
      rvprop: 'content'
    })}`)

    const pageId: string = Object.keys(result?.data?.query?.pages)[0]
    const page = result?.data?.query.pages[pageId]
    const content = page?.revisions[0]['*']
    const extractedSections = extractSections(content)

    return extractedSections
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}