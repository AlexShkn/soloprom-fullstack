'use client'
import React, { useEffect, useState } from 'react'

import { OrderTypes } from '@/components/Cart/types/order'
import { getOrdersByUserId } from '@/utils/api/order'
import { Loading } from '@/components/ui'
import { IUser } from '@/features/auth/types'

interface OrderListProps {
  user: IUser
}

export const OrderList: React.FC<OrderListProps> = ({ user }) => {
  const [orders, setOrders] = useState<OrderTypes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrdersByUserId(user.id)

        const result: OrderTypes[] = orders.map((order) => ({
          ...order,
          products: order.products,
        }))

        setOrders(result)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="page-container">
      {orders.length > 0
        ? orders.map((order) => (
            <div
              key={order.id}
              className="my-4 rounded border border-gray-300 p-4"
            >
              <h3 className="mb-2 text-xl font-bold">Order ID: {order.id}</h3>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
              <strong>Products:</strong>
              {/* <ul className="ml-5 list-disc">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} x {product.count}
                  </li>
                ))}
              </ul> */}
            </div>
          ))
        : ''}
    </div>
  )
}
