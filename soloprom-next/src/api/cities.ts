import { api } from '@/utils/fetch/instance.api'

export interface CityType {
  name: string
}

export const getCityForName = async (name: string) => {
  try {
    const response = await api.get<CityType[]>(`cities/${name}`)
    return response
  } catch (error) {
    console.error(`Ошибка получения города: ${name}`, error)
    throw error
  }
}
