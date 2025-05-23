import { create } from 'zustand'
import { calculateCartTotalAmount } from '@/utils/calculateCartTotalAmount'

export interface CartProductTypes {
  categoryName: string
  productId: string
  img: string
  storeId: string
  name: string
  price: number
  discount: number
  size: string
  url: string
  count: number
  productType: string
}

interface CartState {
  cartState: CartProductTypes[]
  cartCount: number
  totalAmount: number
  addProductToCart: (
    product: Omit<CartProductTypes, 'count' | 'storeId'>,
  ) => void
  increaseProductCount: (productId: string) => void
  decreaseProductCount: (productId: string) => void
  removeCartProduct: (productId: string) => void
  clearCart: () => void
  setCart: (products: CartProductTypes[]) => void
}

const getCartStateCount = (cartState: CartProductTypes[]) => {
  return cartState.reduce((count, item) => count + item.count, 0)
}

export const useCartStore = create<CartState>((set, get) => ({
  cartState: [],
  cartCount: 0,
  totalAmount: 0,

  setCart: (products) => {
    set({
      cartState: products,
      totalAmount: calculateCartTotalAmount(products),
      cartCount: products.reduce((count, item) => count + item.count, 0),
    })
  },
  addProductToCart: (product) => {
    const storeId = product.productId
    const productIndex = get().cartState.findIndex(
      (item) => item.storeId === product.productId,
    )

    if (productIndex === -1) {
      const newProduct = { ...product, storeId, count: 1 }
      const newCartState = [...get().cartState, newProduct]
      set({
        cartState: newCartState,
        totalAmount: calculateCartTotalAmount(newCartState),
        cartCount: getCartStateCount(newCartState),
      })
    } else {
      const updatedCart = get().cartState.map((item, index) =>
        index === productIndex ? { ...item, count: item.count + 1 } : item,
      )
      set({
        cartState: updatedCart,
        totalAmount: calculateCartTotalAmount(updatedCart),
        cartCount: getCartStateCount(updatedCart),
      })
    }
    localStorage.setItem('cart', JSON.stringify(get().cartState))
  },
  increaseProductCount: (productId) => {
    const updatedCart = get().cartState.map((item) =>
      item.storeId === productId ? { ...item, count: item.count + 1 } : item,
    )
    set({
      cartState: updatedCart,
      totalAmount: calculateCartTotalAmount(updatedCart),
      cartCount: getCartStateCount(updatedCart),
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  decreaseProductCount: (productId) => {
    const updatedCart = get()
      .cartState.map((item) => {
        if (item.storeId === productId) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 }
          } else {
            return null
          }
        } else {
          return item
        }
      })
      .filter(Boolean) as CartProductTypes[]
    set({
      cartState: updatedCart,
      totalAmount: calculateCartTotalAmount(updatedCart),
      cartCount: getCartStateCount(updatedCart),
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  removeCartProduct: (productId) => {
    const updatedCart = get().cartState.filter(
      (item) => item.storeId !== productId,
    )
    set({
      cartState: updatedCart,
      totalAmount: calculateCartTotalAmount(updatedCart),
      cartCount: getCartStateCount(updatedCart),
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  clearCart: () => {
    set({ cartState: [], totalAmount: 0 })
    localStorage.removeItem('cart')
  },
}))
