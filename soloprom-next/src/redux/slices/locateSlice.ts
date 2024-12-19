import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CityTypes } from '@/redux/thunks/locateThunk'
import { fetchCities } from '../thunks/locateThunk'

interface CityState {
	cities: CityTypes[]
	selectedCity: string
	loading: boolean
	error: string | null
}

const initialState: CityState = {
	cities: [],
	selectedCity: '',
	loading: false,
	error: null,
}

const locateSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		setSelectedCity(state, action) {
			state.selectedCity = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCities.fulfilled, (state, action) => {
				state.loading = false
				state.cities = action.payload
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})
export const { setSelectedCity } = locateSlice.actions
export default locateSlice.reducer
