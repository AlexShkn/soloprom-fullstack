export interface CityTypes {
  id: number
  city: string
  oblast: string
}

export const fetchCities = async (): Promise<CityTypes[]> => {
  try {
    const response = await fetch('/data/cities.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return (await response.json()) as CityTypes[]
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch cities')
  }
}
