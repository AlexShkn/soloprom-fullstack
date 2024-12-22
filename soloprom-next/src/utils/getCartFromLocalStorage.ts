import { CartProduct } from '@/redux/slices/cartSlice'

export const getStateFromLocalStorage = (itemName: string): CartProduct[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const cartJson = localStorage.getItem(itemName)
    return cartJson ? JSON.parse(cartJson) : []
  } else {
    return []
  }
}
