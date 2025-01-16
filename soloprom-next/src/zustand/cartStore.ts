import { create } from 'zustand'
import { calculateCartTotalAmount } from '@/utils/calculateCartTotalAmount'

export interface CartProductTypes {
  categoryName: string
  productId: string
  img: string
  storeId: string
  name: string
  price: number
  url: string
  variant: string
  count: number
  productType: string
}

interface CartState {
  cartState: CartProductTypes[]
  totalAmount: number
  addProductToCart: (
    product: Omit<CartProductTypes, 'count' | 'storeId'>,
  ) => void
  increaseProductCount: (productId: string, variant: string) => void
  decreaseProductCount: (productId: string, variant: string) => void
  removeCartProduct: (productId: string, variant: string) => void
  clearCart: () => void
  setCart: (products: CartProductTypes[]) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  cartState: [],
  totalAmount: 0,

  setCart: (products) => {
    set({
      cartState: products,
      totalAmount: calculateCartTotalAmount(products),
    })
  },
  addProductToCart: (product) => {
    const storeId = `${product.productId}-${product.variant}`
    const productIndex = get().cartState.findIndex(
      (item) => item.storeId === storeId,
    )

    if (productIndex === -1) {
      const newProduct = { ...product, storeId, count: 1 }
      const newCartState = [...get().cartState, newProduct]
      set({
        cartState: newCartState,
        totalAmount: calculateCartTotalAmount(newCartState),
      })
    } else {
      const updatedCart = get().cartState.map((item, index) =>
        index === productIndex ? { ...item, count: item.count + 1 } : item,
      )
      set({
        cartState: updatedCart,
        totalAmount: calculateCartTotalAmount(updatedCart),
      })
    }
    localStorage.setItem('cart', JSON.stringify(get().cartState))
  },
  increaseProductCount: (productId, variant) => {
    const storeId = `${productId}-${variant}`
    const updatedCart = get().cartState.map((item) =>
      item.storeId === storeId ? { ...item, count: item.count + 1 } : item,
    )
    set({
      cartState: updatedCart,
      totalAmount: calculateCartTotalAmount(updatedCart),
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  decreaseProductCount: (productId, variant) => {
    const storeId = `${productId}-${variant}`
    const updatedCart = get()
      .cartState.map((item) => {
        if (item.storeId === storeId) {
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
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  removeCartProduct: (productId, variant) => {
    const storeId = `${productId}-${variant}`
    const updatedCart = get().cartState.filter(
      (item) => item.storeId !== storeId,
    )
    set({
      cartState: updatedCart,
      totalAmount: calculateCartTotalAmount(updatedCart),
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  clearCart: () => {
    set({ cartState: [], totalAmount: 0 })
    localStorage.removeItem('cart')
  },
}))
