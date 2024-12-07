import axiosDota from '@/app/_apis/axiosDota'

// TO DO: USE TRY AND CATCH
export const getAllGeneralHero = async (): Promise<GeneralHero[]> => {
  const result = await axiosDota.get('/herolist?language=english')
  return result?.data?.result?.data?.heroes || []
}

// TO DO: USE TRY AND CATCH
export const getDetailHero = async (heroId: number): Promise<DetailHero> => {
  const result = await axiosDota.get(`/herodata?language=english&hero_id=${heroId}`)
  return result?.data?.result?.data?.heroes[0] || {}
}