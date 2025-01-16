import { create } from 'zustand'

export interface FavoriteProductTypes {
  productId: string
  favoriteId: string
  name: string
  price: number
  url: string
  variant: string
  img: string
  productType: string
  categoryName: string
}

interface FavoriteState {
  favoriteState: FavoriteProductTypes[]
  setFavorite: (products: FavoriteProductTypes[]) => void
  addProductToFavorite: (
    product: Omit<FavoriteProductTypes, 'favoriteId'>,
  ) => void
  removeFavoriteProduct: (productId: string, variant: string) => void
  clearFavorite: () => void
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteState: [],
  setFavorite: (products) => {
    set({ favoriteState: products })
  },
  addProductToFavorite: (product) => {
    const favoriteId = `${product.productId}-${product.variant}`
    const productIndex = get().favoriteState.findIndex(
      (item) => item.favoriteId === favoriteId,
    )
    if (productIndex === -1) {
      const newProduct = { ...product, favoriteId }
      const newFavoriteState = [...get().favoriteState, newProduct]
      set({ favoriteState: newFavoriteState })
    }
    localStorage.setItem('favorite', JSON.stringify(get().favoriteState))
  },
  removeFavoriteProduct: (productId, variant) => {
    const favoriteId = `${productId}-${variant}`
    const updatedFavorite = get().favoriteState.filter(
      (obj) => obj.favoriteId !== favoriteId,
    )
    set({ favoriteState: updatedFavorite })
    localStorage.setItem('favorite', JSON.stringify(updatedFavorite))
  },
  clearFavorite: () => {
    set({ favoriteState: [] })
    localStorage.removeItem('favorite')
  },
}))
