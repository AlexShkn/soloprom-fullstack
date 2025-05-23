'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getOrdersByUserId } from '../../../api/order'
import { formatDateTime } from '@/utils/formatDateTime'

import { Button, Loading } from '@/components/ui'
import { IUser } from '@/features/auth/types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { CartProductTypes } from '@/store/useCartStore'
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
    icon: <CheckCircle className="h-4 w-4 text-accentBlue" />,
    color: 'text-accentBlue',
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
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

      try {
        setLoading(true)

        await delay(500)

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
    return (
      <div className="relative h-80">
        <Loading
          classNames="absolute ttall z-20 text-accentBlue"
          spinClasses="w-10 h-10"
        />
      </div>
    )
  }
  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>
  }

  return (
    <div className="w-full space-y-6">
      {orders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="bg-accentBlue text-white">
              <tr>
                <th className="px-4 py-2">Номер заказа</th>
                <th className="px-4 py-2">Создан</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, rowIndex) => {
                const products = JSON.parse(order.products)
                return (
                  <React.Fragment key={order.id}>
                    <tr className={`border-t bg-grayColor text-darkBlue`}>
                      <td className="px-4 py-2 font-medium">{order.id}</td>
                      <td className="px-4 py-2 font-medium">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                          {orderDto[order.status]?.icon}
                          <span
                            className={`${orderDto[order.status]?.color} font-medium`}
                          >
                            {orderDto[order.status]?.label}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium">
                        {getDigFormat(order.totalAmount)} ₽
                      </td>
                    </tr>
                    <tr className={`bg-gray-5 border-t`}>
                      <td colSpan={4} className="px-4 py-2">
                        <ul className="space-y-1">
                          {products.map(
                            (product: CartProductTypes, index: number) => (
                              <li
                                key={product.productId}
                                className={`link-hover border-1 flex items-center justify-between border-b border-gray-200 p-2`}
                              >
                                <Link
                                  href={`/products/${product.productId}`}
                                  className="flex items-center gap-2.5 text-sm"
                                >
                                  <Image
                                    src={
                                      (product.img &&
                                        `/img/catalog/${product.img}.webp`) ||
                                      '/img/catalog/not-found.webp'
                                    }
                                    alt=""
                                    width={30}
                                    height={30}
                                  />
                                  <span className="min-w-36">
                                    {product.name}
                                  </span>
                                  <span
                                    className={'whitespace-nowrap font-medium'}
                                  >
                                    {product.size}
                                  </span>
                                  <span className="whitespace-nowrap">
                                    x {product.count}
                                  </span>
                                  <span className="whitespace-nowrap">
                                    - {getDigFormat(product.price)} ₽
                                  </span>
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      </td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-6 text-center text-gray-500">
          <p className="mx-auto">
            У вас нет заказов. Сделайте покупку, чтобы увидеть историю заказов.
          </p>
          <Link
            href={'/catalog'}
            className="button button--accent mx-auto w-auto px-4 py-1"
          >
            За покупками
          </Link>
        </div>
      )}
    </div>
  )
}
