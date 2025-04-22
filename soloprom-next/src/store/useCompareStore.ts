import { create, StateCreator } from 'zustand'
import { ProductCardData } from '@/types/products.types'

interface CompareState {
  comparedItems: {
    tires: ProductCardData[]
    battery: ProductCardData[]
    oils: ProductCardData[]
  }
  totalComparedItemsCount: number
  updateTotalCount: () => void
  addToCompare: (category: string, product: ProductCardData) => void
  removeFromCompare: (
    category: string,
    productId: string,
    variant: string,
  ) => void
  setComparedItems: (items: CompareState['comparedItems']) => void
}

const compareStore: StateCreator<CompareState> = (set, get) => ({
  comparedItems: {
    tires: [],
    battery: [],
    oils: [],
  },
  totalComparedItemsCount: 0,
  updateTotalCount: () => {
    set((state) => {
      let total = 0
      for (const category in state.comparedItems) {
        total +=
          state.comparedItems[category as keyof typeof state.comparedItems]
            .length
      }
      return { totalComparedItemsCount: total }
    })
  },
  setComparedItems: (items) => {
    set({ comparedItems: items })
    get().updateTotalCount()
  },
  addToCompare: (category, product) => {
    set((state) => {
      const categoryItems =
        state.comparedItems[category as keyof typeof state.comparedItems] || []
      const isAlreadyAdded = categoryItems.some(
        (item) =>
          item.productId === product.productId &&
          item.variant === product.variant,
      )

      if (isAlreadyAdded) {
        return state
      }
      const updatedItems = {
        ...state.comparedItems,
        [category]: [...categoryItems, product],
      }
      localStorage.setItem('comparedItems', JSON.stringify(updatedItems))
      return {
        comparedItems: updatedItems,
      }
    })
    get().updateTotalCount()
  },
  removeFromCompare: (category, productId, variant) => {
    set((state) => {
      const categoryItems =
        state.comparedItems[category as keyof typeof state.comparedItems] || []
      const updatedItems = categoryItems.filter(
        (item) => !(item.productId === productId && item.variant === variant),
      )
      const updateCompare = {
        ...state.comparedItems,
        [category]: updatedItems,
      }
      localStorage.setItem('comparedItems', JSON.stringify(updateCompare))
      return {
        comparedItems: updateCompare,
      }
    })
    get().updateTotalCount()
  },
})

export const useCompareStore = create(compareStore)
