import { create } from 'zustand'

export interface ProductsCardPropTypes {
  productId: string
  storeId: string
  name: string
  size: string
  price: number
  url: string
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
  removeFavoriteProduct: (productId: string) => void
  clearFavorite: () => void
  favoriteCount: () => number
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteState: [],
  setFavorite: (products) => {
    set({ favoriteState: products })
  },
  addProductToFavorite: (product) => {
    const storeId = product.productId
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
  removeFavoriteProduct: (productId) => {
    const updatedFavorite = get().favoriteState.filter(
      (obj) => obj.storeId !== productId,
    )
    set({ favoriteState: updatedFavorite })
    localStorage.setItem('favorite', JSON.stringify(updatedFavorite))
  },
  clearFavorite: () => {
    set({ favoriteState: [] })
    localStorage.removeItem('favorite')
  },
  favoriteCount: () => get().favoriteState.length,
}))

export const useFavoriteCount = () =>
  useFavoriteStore((state) => state.favoriteCount())
