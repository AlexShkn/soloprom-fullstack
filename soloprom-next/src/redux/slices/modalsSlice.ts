import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

export interface ModalsState {
	callbackIsOpen: boolean
}

const initialState: ModalsState = {
	callbackIsOpen: false,
}

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		modalCallbackStateChange: (state, action: PayloadAction<boolean>) => {
			state.callbackIsOpen = action.payload
			scrollStatusChange(action.payload)
		},
	},
})

export const { modalCallbackStateChange } = modalsSlice.actions
export default modalsSlice.reducer
