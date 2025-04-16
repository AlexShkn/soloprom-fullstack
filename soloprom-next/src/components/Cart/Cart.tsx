'use client'
import React, { useEffect, useState, useCallback } from 'react'

import { Loading } from '../ui'
import { useCartStore } from '@/store/cartStore'

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { CartResult } from '@/components/Cart/CartResult'
import { OrderForm } from './OrderForm/OrderForm'

import { CartProductList } from './CartProductList'

import { CartHeader } from './CartHeader'

const CartEmptyState = () => (
  <div className="page-container flex justify-center py-10 text-2xl font-medium">
    Корзина пуста
  </div>
)

export const Cart: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { cartState, totalAmount } = useCartStore()

  const handleOpenForm = useCallback(() => setFormIsOpen(true), [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [cartState])

  if (isLoading) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Loading size={10} />
      </div>
    )
  }

  return (
    <>
      <div className="cart inner-container">
        <BreadCrumbs />
        <CartHeader title="Корзина" />
      </div>

      {cartState.length > 0 ? (
        <>
          <div className="cart inner-container mb-12">
            <CartProductList cartState={cartState} />
          </div>
          <div className="cart__container flex flex-col items-center">
            <CartResult
              cartLength={cartState.length}
              totalAmount={totalAmount}
            />

            {!formIsOpen && (
              <button
                onClick={handleOpenForm}
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
        <CartEmptyState />
      )}
    </>
  )
}
