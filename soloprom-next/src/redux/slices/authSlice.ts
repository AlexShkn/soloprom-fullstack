import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/features/auth/types'

export interface ModalsState {
  isAuth: boolean
}

const initialState: ModalsState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { changeAuthState } = authSlice.actions
export default authSlice.reducer
