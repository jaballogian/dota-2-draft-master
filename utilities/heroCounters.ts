import axiosFandom from '@/apis/axiosFandom'
import queryString from 'query-string'

const initialCounterHero = {
  badAgainst: {
    mainHeroes: [],
    othersHeroes: []
  },
  goodAgainst: {
    mainHeroes: [],
    othersHeroes: []
  },
  worksWellWith: {
    mainHeroes: [],
    othersHeroes: []
  }
}

const extractSections = (content: string): CounterHero => {
  const sections: CounterHero = { ...initialCounterHero }

  // Adjusted regex patterns with stricter grouping for optional "Others" section
  const badAgainstMatch = content.match(/==?\s*Bad against\.\.\.\s*==?\s*([\s\S]*?)(?:===?\s*Others\s*===?\s*([\s\S]*?))?(?===|$)/i)
  const goodAgainstMatch = content.match(/==?\s*Good against\.\.\.\s*==?\s*([\s\S]*?)(?:===?\s*Others\s*===?\s*([\s\S]*?))?(?===|$)/i)
  const worksWellWithMatch = content.match(/==?\s*Works well with\.\.\.\s*==?\s*([\s\S]*?)(?:===?\s*Others\s*===?\s*([\s\S]*?))?(?===|$)/i)

  // Helper functions for hero name extraction
  const extractMainHeroes = (text: string): string[] => {
    const matches = [...text.matchAll(/{{hero label\|([^|]+)\|border=[^}]+}}/gi)]
    return matches.map(match => match[1])
  }

  const extractOthersHeroes = (text: string): string[] => {
    const matches = [...text.matchAll(/{{H\|([^}]+)}}/g)]
    return matches.map(match => match[1])
  }

  // Populate each section only if there's a match
  if (badAgainstMatch) {
    sections['badAgainst'] = {
      mainHeroes: extractMainHeroes(badAgainstMatch[1] || ''),
      othersHeroes: badAgainstMatch[2] ? extractOthersHeroes(badAgainstMatch[2]) : []
    }
  }

  if (goodAgainstMatch) {
    sections['goodAgainst'] = {
      mainHeroes: extractMainHeroes(goodAgainstMatch[1] || ''),
      othersHeroes: goodAgainstMatch[2] ? extractOthersHeroes(goodAgainstMatch[2]) : []
    }
  }

  if (worksWellWithMatch) {
    sections['worksWellWith'] = {
      mainHeroes: extractMainHeroes(worksWellWithMatch[1] || ''),
      othersHeroes: worksWellWithMatch[2] ? extractOthersHeroes(worksWellWithMatch[2]) : []
    }
  }

  return sections
}

export const getCounterHeroes = async (heroName: string): Promise<CounterHero> => {
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
    console.error(`Error fetching data for ${heroName}`, error)
    return initialCounterHero
  }
}