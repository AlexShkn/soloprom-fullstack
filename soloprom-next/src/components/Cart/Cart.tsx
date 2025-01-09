'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Loading } from '../ui'

import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { CartResult } from '@/components/Cart/CartResult'
import { OrderForm } from './OrderForm/OrderForm'

import { CartProductList } from './CartProductList'

import './Cart.scss'

export const Cart: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { cartState, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [cartState])

  return (
    <>
      <div className="cart__inner-container">
        <BreadCrumbs />
        <div className="cart__head">
          <h1 className="cart__title">Корзина</h1>
          <Link href="/" className="cart__back-link">
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#back-arrow"></use>
            </svg>
            Вернуться к покупкам
          </Link>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        cartState.length > 0 && (
          <>
            <div className="inner-container">
              <CartProductList cartState={cartState} />
            </div>
            <div className="cart__container flex flex-col items-center">
              <CartResult
                cartLength={cartState.length}
                totalAmount={totalAmount}
              />
              <button
                onClick={() => setFormIsOpen(true)}
                type="button"
                className={`button cart__order-btn ${formIsOpen && 'hidden'}`}
              >
                Оформить заказ
              </button>

              {formIsOpen && <OrderForm />}
            </div>
          </>
        )
      )}
    </>
  )
}
