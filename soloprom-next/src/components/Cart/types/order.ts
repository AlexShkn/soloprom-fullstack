import { CartProductTypes } from '@/store/useCartStore'

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface OrderTypes {
  id: string
  userId: string
  products: CartProductTypes[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
