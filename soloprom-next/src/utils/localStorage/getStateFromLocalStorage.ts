import { CartProductTypes } from '@/store/useCartStore'

export const getStateFromLocalStorage = (
  itemName: string,
): CartProductTypes[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const cartJson = localStorage.getItem(itemName)
    return cartJson ? JSON.parse(cartJson) : []
  } else {
    return []
  }
}
