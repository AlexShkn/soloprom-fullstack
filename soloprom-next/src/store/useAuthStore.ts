import { create } from 'zustand'
import { IUser, AuthMethod, UserRole } from '@/features/auth/types'

interface AuthState {
  isAuth: boolean
  isLoading: boolean
  userState: IUser
  changeAuthStatus: (isAuth: boolean) => void
  setUserData: (userData: IUser) => void
  setUserLoading: (isLoading: boolean) => void
  updateUserProfile: (values: {
    name?: string
    email?: string
    isTwoFactorEnabled?: boolean
  }) => void
}

const initialUserState: IUser = {
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
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  isLoading: true,
  userState: initialUserState,

  changeAuthStatus: (isAuth) => {
    set({ isAuth: isAuth })
  },

  setUserData: (userData) => {
    set({ userState: userData })
  },

  setUserLoading: (isLoading) => {
    set({ isLoading })
  },

  updateUserProfile: (values) => {
    set((state) => ({
      userState: {
        ...state.userState,
        displayName: values.name ?? state.userState.displayName,
        email: values.email ?? state.userState.email,
        isTwoFactorEnabled:
          values.isTwoFactorEnabled ?? state.userState.isTwoFactorEnabled,
      },
    }))
  },
}))
