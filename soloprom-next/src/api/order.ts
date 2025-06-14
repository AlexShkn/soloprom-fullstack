import { OrderTypes } from '@/components/Cart/types/order'
import { api } from '@/utils/fetch/instance.api'
import { CartProductTypes } from '@/store/useCartStore'

interface OrderDto {
  userId: string
  products: CartProductTypes[]
  totalAmount: number
}

interface UpdateOrderStatusDto {
  id: string
  status: string
}

export const getOrdersByUserId = async (
  userId: string,
): Promise<OrderTypes[]> => {
  try {
    const response = await api.get<OrderTypes[]>(`order/${userId}`)
    return response
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
    return []
  }
}

export const createOrder = async (
  orderDto: OrderDto,
): Promise<OrderTypes | null> => {
  try {
    const response = await api.post<OrderTypes>('order', orderDto)
    return response
  } catch (error) {
    console.error('Ошибка при создании заказа:', error)
    return null
  }
}

export const updateOrderStatus = async ({
  id,
  status,
}: UpdateOrderStatusDto): Promise<OrderTypes | null> => {
  try {
    const response = await api.patch<OrderTypes>(`order/${id}/${status}`)
    return response
  } catch (error) {
    console.error('Ошибка при обновлении статуса заказа:', error)
    return null
  }
}
