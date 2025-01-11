import axios from 'axios'
import { OrderTypes } from '@/components/Cart/types/order'
import { CartProduct } from '@/redux/slices/cartSlice'

interface OrderDto {
  userId: string
  products: CartProduct[]
  totalAmount: number
}

interface UpdateOrderStatusDto {
  id: string
  status: string
}

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/order`

export const getOrdersByUserId = async (
  userId: string,
): Promise<OrderTypes[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export const createOrder = async (
  orderDto: OrderDto,
): Promise<OrderTypes | null> => {
  console.log(orderDto)
  try {
    const response = await axios.post(BASE_URL, orderDto)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    return null
  }
}

export const updateOrderStatus = async ({
  id,
  status,
}: UpdateOrderStatusDto): Promise<OrderTypes | null> => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}/${status}`)
    return response.data
  } catch (error) {
    console.error('Error updating order status:', error)
    return null
  }
}
