import { CartProduct } from '@/redux/slices/cartSlice'

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export interface OrderTypes {
  id: string
  userId: string
  products: CartProduct[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
