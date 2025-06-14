import { create } from 'zustand'
import { scrollHiddenStatusChange } from '@/utils/scrollStatusChange'

interface CatalogMenuState {
  catalogIsOpen: boolean
  catalogMenuStateChange: (status: boolean, screen?: boolean) => void
}

export const useCatalogMenuStore = create<CatalogMenuState>((set) => ({
  catalogIsOpen: false,
  catalogMenuStateChange: (status, screen) => {
    set({ catalogIsOpen: status })
    if (screen) {
      scrollHiddenStatusChange(status)
    }
  },
}))
