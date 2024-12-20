import { createSlice } from '@reduxjs/toolkit'
import { calculateCartTotalAmount } from '@/utils/calculateCartTotalAmount'

export interface CartProduct {
  id: string
  cartId: string
  name: string
  price: number
  url: string
  variant: string
  count: number
}

interface CartStateTypes {
  cartState: CartProduct[]
  totalAmount: number
}

const getCartFromLocalStorage = (): CartProduct[] => {
  const cartJson = localStorage.getItem('cart')
  return cartJson ? JSON.parse(cartJson) : []
}

const initialState: CartStateTypes = {
  cartState: getCartFromLocalStorage(),
  totalAmount: calculateCartTotalAmount(getCartFromLocalStorage()),
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { id, name, variant, price, url } = action.payload
      const cartId = `${id}-${variant}`

      const productIndex = state.cartState.findIndex(
        (item) => item.cartId === cartId,
      )

      if (productIndex === -1) {
        state.cartState.push({
          cartId,
          id,
          name,
          variant,
          price,
          url,
          count: 1,
        })

        state.totalAmount = calculateCartTotalAmount(state.cartState)
      } else {
        state.cartState[productIndex].count += 1
      }

      localStorage.setItem('cart', JSON.stringify(state.cartState))
      state.totalAmount = calculateCartTotalAmount(state.cartState)
    },
    // increaseProductCount: (state, action) => {
    //   const { cartId } = action.payload;
    //   const existingProductIndex = state.cartState.findIndex((item) => item.cartId === cartId);

    //   if (existingProductIndex !== -1) {
    //     state.cartState[existingProductIndex].count += 1;
    //   }
    //   localStorage.setItem('cart', JSON.stringify(state.cartState));
    //   state.totalAmount = calculateCartTotalAmount(state.cartState);
    // },
    // decreaseProductCount: (state, action) => {
    //   const { cartId } = action.payload;
    //   const existingProductIndex = state.cartState.findIndex((item) => item.cartId === cartId);

    //   if (existingProductIndex !== -1) {
    //     if (state.cartState[existingProductIndex].count > 1) {
    //       state.cartState[existingProductIndex].count -= 1;
    //     } else {
    //       state.cartState.splice(existingProductIndex, 1);
    //     }
    //   }
    //   localStorage.setItem('cart', JSON.stringify(state.cartState));
    //   state.totalAmount = calculateCartTotalAmount(state.cartState);
    // },
    removeCartProduct: (state, action) => {
      const { id, variant } = action.payload

      const cartId = `${id}-${variant}`

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

export const { addProductToCart, removeCartProduct, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
