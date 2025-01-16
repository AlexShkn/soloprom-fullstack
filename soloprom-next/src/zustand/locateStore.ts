import { create } from 'zustand'
import { CityTypes, fetchCities } from '@/zustand/thunks/locateThunk'

interface CityState {
  cities: CityTypes[]
  selectedCity: string
  loading: boolean
  error: string | null
  setSelectedCity: (city: string) => void
  fetchCitiesData: () => Promise<void>
}

export const useLocateStore = create<CityState>((set, get) => ({
  cities: [],
  selectedCity: '',
  loading: false,
  error: null,
  setSelectedCity: (city) => {
    set({ selectedCity: city })
  },
  fetchCitiesData: async () => {
    set({ loading: true, error: null })
    try {
      const cities = await fetchCities()
      set({ cities, loading: false })
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Failed to fetch cities' })
    }
  },
}))
