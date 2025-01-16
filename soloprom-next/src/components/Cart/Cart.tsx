'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Loading } from '../ui'
import { useCartStore } from '@/zustand/cartStore'

import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { CartResult } from '@/components/Cart/CartResult'
import { OrderForm } from './OrderForm/OrderForm'

import { CartProductList } from './CartProductList'

import './Cart.scss'

export const Cart: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { cartState, totalAmount } = useCartStore((state) => state)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [cartState])

  return (
    <>
      <div className="cart inner-container">
        <BreadCrumbs />
        <div className="mb-10 flex items-center justify-between">
          <h1 className="cart__title font-bold">Корзина</h1>
          <Link
            href="/"
            className="cart__back-link inline-flex items-center gap-2.5 transition-colors"
          >
            <svg className="h-5 w-5 fill-darkBlue transition-colors">
              <use xlinkHref="/img/sprite.svg#back-arrow"></use>
            </svg>
            Вернуться к покупкам
          </Link>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : cartState.length > 0 ? (
        <>
          <div className="cart inner-container">
            <CartProductList cartState={cartState} />
          </div>
          <div className="cart__container flex flex-col items-center">
            <CartResult
              cartLength={cartState.length}
              totalAmount={totalAmount}
            />

            {!formIsOpen && (
              <button
                onClick={() => setFormIsOpen(true)}
                type="button"
                className="button px-7 py-4 text-lg"
              >
                Оформить заказ
              </button>
            )}

            {formIsOpen && <OrderForm />}
          </div>
        </>
      ) : (
        <div className="cart__item cart__item--empty page-container flex justify-center py-10 text-2xl font-medium">
          Корзина пуста
        </div>
      )}
    </>
  )
}
