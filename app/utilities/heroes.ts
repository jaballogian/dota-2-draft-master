import axiosDota from '@/app/apis/axiosDota'

// TO DO: USE TRY AND CATCH
export const getAllGeneralHeroData = async (): Promise<GeneralHeroData[]> => {
  const result = await axiosDota.get('/herolist?language=english')
  return result?.data?.result?.data?.heroes || []
}

// TO DO: USE TRY AND CATCH
export const getDetailHeroData = async (heroId: number): Promise<DetailHeroData> => {
  const result = await axiosDota.get(`/herodata?language=english&hero_id=${heroId}`)
  return result?.data?.result?.data?.heroes[0] || {}
}