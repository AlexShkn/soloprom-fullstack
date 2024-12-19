import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

export interface MenuState {
	menuIsOpen: boolean
}

const initialState: MenuState = {
	menuIsOpen: false,
}

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		menuStateChange: (state, action: PayloadAction<boolean>) => {
			state.menuIsOpen = action.payload
			scrollStatusChange(action.payload)
		},
	},
})

export const { menuStateChange } = menuSlice.actions
export default menuSlice.reducer
