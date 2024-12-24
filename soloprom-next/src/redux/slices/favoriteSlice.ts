import { createSlice } from '@reduxjs/toolkit'

export interface FavoriteProduct {
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

interface FavoriteStateTypes {
  favoriteState: FavoriteProduct[]
}

const initialState: FavoriteStateTypes = {
  favoriteState: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favoriteState = action.payload
    },
    addProductToFavorite: (state, action) => {
      const {
        productId,
        name,
        variant,
        price,
        url,
        img,
        productType,
        categoryName,
      } = action.payload
      const favoriteId = `${productId}-${variant}`

      const productIndex = state.favoriteState.findIndex(
        (item) => item.favoriteId === favoriteId,
      )

      if (productIndex === -1) {
        state.favoriteState.push({
          favoriteId,
          productId,
          name,
          variant,
          price,
          url,
          img,
          productType,
          categoryName,
        })
      }
      localStorage.setItem('favorite', JSON.stringify(state.favoriteState))
    },

    removeFavoriteProduct: (state, action) => {
      const { productId, variant } = action.payload

      const favoriteId = `${productId}-${variant}`

      state.favoriteState = state.favoriteState.filter(
        (obj) => obj.favoriteId !== favoriteId,
      )
      localStorage.setItem('favorite', JSON.stringify(state.favoriteState))
    },
    clearFavorite: (state) => {
      state.favoriteState = []
      localStorage.removeItem('favorite')
    },
  },
})

export const {
  addProductToFavorite,
  removeFavoriteProduct,
  clearFavorite,
  setFavorite,
} = favoriteSlice.actions
export default favoriteSlice.reducer
