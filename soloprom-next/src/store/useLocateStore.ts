import { create } from 'zustand'

interface CityState {
  selectedCity: string
  error: string | null
  setSelectedCity: (city: string) => void
}

export const useLocateStore = create<CityState>((set) => ({
  selectedCity: '',
  error: null,
  setSelectedCity: (city) => {
    set({ selectedCity: city })
  },
}))
