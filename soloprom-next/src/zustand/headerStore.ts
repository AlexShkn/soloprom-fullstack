import { create } from 'zustand'

interface HeaderState {
  headerFixed: boolean
  setHeaderFixedChange: (fixed: boolean) => void
}

export const useHeaderStore = create<HeaderState>((set) => ({
  headerFixed: false,
  setHeaderFixedChange: (fixed) => {
    set({ headerFixed: fixed })
  },
}))
