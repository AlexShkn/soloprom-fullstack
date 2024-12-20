import { CartProduct } from '@/redux/slices/cartSlice'

export const calculateCartTotalAmount = (cartState: CartProduct[]): number => {
  let totalAmount = 0
  for (const item of cartState) {
    totalAmount += item.price * item.count
  }
  return totalAmount
}
