import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HeaderState {
	headerFixed: boolean
}

const initialState: HeaderState = {
	headerFixed: false,
}

const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		setHeaderFixedChange: (state, action: PayloadAction<boolean>) => {
			state.headerFixed = action.payload
		},
	},
})

export const { setHeaderFixedChange } = headerSlice.actions
export default headerSlice.reducer
