import { createAsyncThunk } from '@reduxjs/toolkit'

export interface CityTypes {
  city: string
  oblast: string
}

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/data/cities.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return (await response.json()) as CityTypes[]
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
