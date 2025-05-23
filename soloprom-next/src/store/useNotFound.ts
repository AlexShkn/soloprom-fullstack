import { create } from 'zustand'

interface NotFoundState {
  id: string

  setId: (id: string) => void
}

const useNotFound = create<NotFoundState>((set) => ({
  id: '',

  setId: (id) => set({ id }),
}))

export default useNotFound
