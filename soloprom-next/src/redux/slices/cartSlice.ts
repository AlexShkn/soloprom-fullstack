import { createSlice } from '@reduxjs/toolkit'
import { calculateCartTotalAmount } from '@/utils/calculateCartTotalAmount'

export interface CartProduct {
  categoryName: string
  productId: string
  img: string
  cartId: string
  name: string
  price: number
  url: string
  variant: string
  count: number
  productType: string
}

interface CartStateTypes {
  cartState: CartProduct[]
  totalAmount: number
}

const initialState: CartStateTypes = {
  cartState: [],
  totalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartState = action.payload
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    addProductToCart: (state, action) => {
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
      const cartId = `${productId}-${variant}`

      const productIndex = state.cartState.findIndex(
        (item) => item.cartId === cartId,
      )

      if (productIndex === -1) {
        state.cartState.push({
          categoryName,
          cartId,
          productId,
          name,
          variant,
          price,
          url,
          img,
          productType,
          count: 1,
        })

        state.totalAmount = calculateCartTotalAmount(state.cartState)
      } else {
        state.cartState[productIndex].count += 1
      }

      localStorage.setItem('cart', JSON.stringify(state.cartState))
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    increaseProductCount: (state, action) => {
      const { productId, variant } = action.payload
      const cartId = `${productId}-${variant}`

      const existingProductIndex = state.cartState.findIndex(
        (item) => item.cartId === cartId,
      )

      if (existingProductIndex !== -1) {
        state.cartState[existingProductIndex].count += 1
      }
      localStorage.setItem('cart', JSON.stringify(state.cartState))
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    decreaseProductCount: (state, action) => {
      const { productId, variant } = action.payload
      const cartId = `${productId}-${variant}`
      const existingProductIndex = state.cartState.findIndex(
        (item) => item.cartId === cartId,
      )

      if (existingProductIndex !== -1) {
        if (state.cartState[existingProductIndex].count > 1) {
          state.cartState[existingProductIndex].count -= 1
        } else {
          state.cartState.splice(existingProductIndex, 1)
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cartState))
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    removeCartProduct: (state, action) => {
      const { productId, variant } = action.payload
      const cartId = `${productId}-${variant}`

      state.cartState = state.cartState.filter((obj) => obj.cartId !== cartId)
      state.totalAmount = calculateCartTotalAmount(state.cartState)
      localStorage.setItem('cart', JSON.stringify(state.cartState))
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    clearCart: (state) => {
      state.cartState = []
      localStorage.removeItem('cart')
      state.totalAmount = 0
    },
  },
})

export const {
  addProductToCart,
  removeCartProduct,
  clearCart,
  increaseProductCount,
  decreaseProductCount,
  setCart,
} = cartSlice.actions
export default cartSlice.reducer
