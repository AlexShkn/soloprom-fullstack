'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { OrderTypes } from '@/components/Cart/types/order'
import { getOrdersByUserId } from '@/utils/api/order'
import { Loading } from '@/components/ui'
import { IUser } from '@/features/auth/types'

import { CartProductTypes } from '@/zustand/cartStore'
import { getDigFormat } from '@/supports'
import { AlertTriangle, Package, CheckCircle, XCircle } from 'lucide-react'

interface OrderListProps {
  user: IUser
}

const orderDto: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  PROCESSING: {
    label: 'В обработке',
    icon: <Package className="h-4 w-4 text-yellow-500" />,
    color: 'text-yellow-500',
  },
  SHIPPED: {
    label: 'Отправлен',
    icon: <AlertTriangle className="h-4 w-4 text-accentBlue" />,
    color: 'text-accentBlue',
  },
  DELIVERED: {
    label: 'Исполнен',
    icon: <CheckCircle className="text-success h-4 w-4" />,
    color: 'text-success',
  },
  CANCELED: {
    label: 'Отменен',
    icon: <XCircle className="h-4 w-4 text-destructive" />,
    color: 'text-destructive',
  },
}

export const OrderList: React.FC<OrderListProps> = ({ user }) => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrdersByUserId(user.id)

        const result = orders.map((order) => ({
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
    return <div className="text-red-500">Ошибка: {error}</div>
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="mb-5 text-2xl font-bold">История заказов</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Номер заказа</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2">Сумма</th>
                <th className="px-4 py-2">Товары</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, rowIndex) => {
                const products = JSON.parse(order.products)
                return (
                  <tr
                    key={order.id}
                    className={`border-t ${
                      rowIndex % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-darkBlue text-white'
                    }`}
                  >
                    <td className="px-4 py-2 font-medium">{order.id}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        {orderDto[order.status]?.icon}
                        <span
                          className={`${orderDto[order.status]?.color} font-medium`}
                        >
                          {orderDto[order.status]?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {getDigFormat(order.totalAmount)} ₽
                    </td>
                    <td className="px-4 py-2">
                      <ul className="space-y-1">
                        {products.map(
                          (product: CartProductTypes, index: number) => (
                            <li
                              key={index}
                              className={`link-hover border-1 flex items-center justify-between border-b border-gray-200 p-2`}
                            >
                              <Link
                                href={`/products/${product.productId}`}
                                className="flex items-center gap-2.5"
                              >
                                <img
                                  src={`/img/catalog/${product.img}.webp`}
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                                <span>{product.name}</span>
                                <span className={'font-medium'}>
                                  {product.variant}
                                </span>
                                <span>x {product.count}</span>
                                <span>- {getDigFormat(product.price)} ₽</span>
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          У вас нет заказов. Сделайте покупку, чтобы увидеть историю заказов.
        </div>
      )}
    </div>
  )
}
