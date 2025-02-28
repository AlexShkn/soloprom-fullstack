'use client'
import React, { useEffect, useState, useCallback } from 'react'

import { Loading } from '../ui'
import { useCartStore } from '@/store/cartStore'

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { CartResult } from '@/components/Cart/CartResult'
import { OrderForm } from './OrderForm/OrderForm'

import { CartProductList } from './CartProductList'

import './Cart.scss'
import { CartHeader } from './CartHeader'

export const Cart: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { cartState, totalAmount } = useCartStore()

  const handleOpenForm = useCallback(() => {
    setFormIsOpen(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [cartState])

  return (
    <>
      <div className="cart inner-container">
        <BreadCrumbs />
        <CartHeader title="Корзина" />
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
        <div className="page-container flex justify-center py-10 text-2xl font-medium">
          Корзина пуста
        </div>
      )}
    </>
  )
}
