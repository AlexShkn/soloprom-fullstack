import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, AuthMethod, UserRole } from '@/features/auth/types'

export interface authStateTypes {
  isAuth: boolean
  isLoading: boolean
  userState: IUser
}

const initialState: authStateTypes = {
  isAuth: false,
  isLoading: false,
  userState: {
    id: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    password: '',
    displayName: '',
    picture: '',
    role: UserRole.Regular,
    isVerified: false,
    isTwoFactorEnabled: false,
    method: AuthMethod.Credentials,
    accounts: [],
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUserData: (state, action) => {
      state.userState = { ...action.payload }
      state.isLoading = true
    },
  },
})

export const { changeAuthStatus, setUserData } = authSlice.actions
export default authSlice.reducer
