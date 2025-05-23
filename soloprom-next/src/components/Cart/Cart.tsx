'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

import { Loading } from '../ui'
import { useCartStore } from '@/store/useCartStore'

import BreadCrumbs from '@/components/BreadCrumbs'
import { OrderForm } from './OrderForm/OrderForm'

import { CartProductList } from './CartProductList'

import { CartHeader } from './CartHeader'
import { CartSideSummary } from './CartSideSummary'
import Link from 'next/link'
import { ArrowRight, ShoppingCart } from 'lucide-react'

const CartEmptyState = () => (
  <div className="page-container flex flex-col items-center justify-center py-10 text-2xl font-medium">
    <div className="relative flex justify-center">
      <Image src="/img/benefits/zp.webp" width={150} height={150} alt="" />
      <Image src="/img/benefits/search.webp" width={150} height={150} alt="" />

      <span className="ttall absolute flex w-full items-center justify-center gap-3 rounded-custom bg-white p-2 text-center shadow-custom">
        <ShoppingCart className="h-5 w-5" />
        Корзина пуста
      </span>

      <Link
        href={'/catalog'}
        className="button absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 px-4 py-2 text-base"
      >
        В каталог
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
)

export const Cart: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [discountSum, setDiscountSum] = useState(0)
  const { cartState, totalAmount, cartCount } = useCartStore()

  const handleOpenForm = useCallback(() => setFormIsOpen(true), [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const calculatedDiscountSum = cartState.reduce((acc, product) => {
      const discountPercentage = product.discount / 100
      const discountAmount = product.price * discountPercentage * product.count
      return acc + discountAmount
    }, 0)

    const roundedDiscountSum = Math.floor(calculatedDiscountSum)

    setDiscountSum(roundedDiscountSum)
  }, [cartState])

  if (isLoading) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Loading spinClasses="w-10 h-10" classNames="text-accentBlue" />
      </div>
    )
  }

  return (
    <>
      <div className="cart inner-container">
        <BreadCrumbs />
        <CartHeader title="" />
      </div>

      {cartState.length > 0 ? (
        <>
          <div className="page-container mb-12 grid grid-cols-1 gap-5 md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,384px]">
            <CartProductList cartState={cartState} />
            <CartSideSummary
              cartLength={cartCount}
              totalAmount={totalAmount}
              handleOpenForm={handleOpenForm}
              formIsOpen={formIsOpen}
              discountSum={discountSum}
            />
          </div>

          <div className="cart__container flex flex-col items-center">
            {formIsOpen && <OrderForm />}
          </div>
        </>
      ) : (
        <CartEmptyState />
      )}
    </>
  )
}
