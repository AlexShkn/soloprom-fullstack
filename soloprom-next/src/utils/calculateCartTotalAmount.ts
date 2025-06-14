import { CartProductTypes } from '@/store/useCartStore'

export const calculateCartTotalAmount = (
  cartState: CartProductTypes[],
): number => {
  let totalAmount = 0
  for (const item of cartState) {
    totalAmount += item.price * item.count
  }
  return totalAmount
}
