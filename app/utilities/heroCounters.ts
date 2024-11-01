import axiosFandom from '@/app/apis/axiosFandom'
import queryString from 'query-string'
import { initialCounterHero } from '../constants/heroes'

const extractSections = (content: string): CounterHero => {
  const sections: CounterHero = { ...initialCounterHero }

  // Regex patterns to capture each section and "Others" subsection separately
  const badAgainstMatch = content.match(/==?\s*Bad against\.\.\.\s*==?([\s\S]*?)(===?\s*Others\s*===?([\s\S]*?))(==|$)/i)
  const goodAgainstMatch = content.match(/==?\s*Good against\.\.\.\s*==?([\s\S]*?)(===?\s*Others\s*===?([\s\S]*?))(==|$)/i)
  const worksWellWithMatch = content.match(/==?\s*Works well with\.\.\.\s*==?([\s\S]*?)(===?\s*Others\s*===?([\s\S]*?))(==|$)/i)

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
      mainHeroes: extractMainHeroes(badAgainstMatch[1]),
      othersHeroes: extractOthersHeroes(badAgainstMatch[3] || '')
    }
  }

  if (goodAgainstMatch) {
    sections['goodAgainst'] = {
      mainHeroes: extractMainHeroes(goodAgainstMatch[1]),
      othersHeroes: extractOthersHeroes(goodAgainstMatch[3] || '')
    }
  }

  if (worksWellWithMatch) {
    sections['worksWellWith'] = {
      mainHeroes: extractMainHeroes(worksWellWithMatch[1]),
      othersHeroes: extractOthersHeroes(worksWellWithMatch[3] || '')
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
    return { ...initialCounterHero }
  }
}