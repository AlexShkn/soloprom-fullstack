import { createSlice } from '@reduxjs/toolkit'

export interface FavoriteProduct {
  id: string
  favoriteId: string
  name: string
  price: number
  url: string
  variant: string
  img: string
  type: string
  category: string
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
      const { id, name, variant, price, url, img, type, category } =
        action.payload
      const favoriteId = `${id}-${variant}`

      const productIndex = state.favoriteState.findIndex(
        (item) => item.favoriteId === favoriteId,
      )

      if (productIndex === -1) {
        state.favoriteState.push({
          favoriteId,
          id,
          name,
          variant,
          price,
          url,
          img,
          type,
          category,
        })
      }
      localStorage.setItem('favorite', JSON.stringify(state.favoriteState))
    },

    removeFavoriteProduct: (state, action) => {
      const { id, variant } = action.payload

      const favoriteId = `${id}-${variant}`

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
