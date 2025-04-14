import { create } from 'zustand'

export interface ProductsCardPropTypes {
  productId: string
  storeId: string
  name: string
  price: number
  url: string
  variant: string
  img: string
  productType: string
  categoryName: string
}

interface FavoriteState {
  favoriteState: ProductsCardPropTypes[]
  setFavorite: (products: ProductsCardPropTypes[]) => void
  addProductToFavorite: (
    product: Omit<ProductsCardPropTypes, 'storeId'>,
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
    const storeId = `${product.productId}-${product.variant}`
    const productIndex = get().favoriteState.findIndex(
      (item) => item.storeId === storeId,
    )
    if (productIndex === -1) {
      const newProduct = { ...product, storeId }
      const newFavoriteState = [...get().favoriteState, newProduct]
      set({ favoriteState: newFavoriteState })
    }
    localStorage.setItem('favorite', JSON.stringify(get().favoriteState))
  },
  removeFavoriteProduct: (productId, variant) => {
    const storeId = `${productId}-${variant}`
    const updatedFavorite = get().favoriteState.filter(
      (obj) => obj.storeId !== storeId,
    )
    set({ favoriteState: updatedFavorite })
    localStorage.setItem('favorite', JSON.stringify(updatedFavorite))
  },
  clearFavorite: () => {
    set({ favoriteState: [] })
    localStorage.removeItem('favorite')
  },
}))
