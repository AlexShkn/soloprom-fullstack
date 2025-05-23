'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '../ui'
import { getDigFormat } from '@/supports'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PromoCodeForm } from './PromoCodeForm'

interface Props {
  className?: string
  cartLength: number
  totalAmount: number
  formIsOpen: boolean
  handleOpenForm: () => void
  discountSum: number
}

export const CartSideSummary: React.FC<Props> = ({
  className,
  totalAmount,
  cartLength,
  handleOpenForm,
  formIsOpen,
  discountSum,
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const [stopSticky, setStopSticky] = useState(false)

  const isMobile = useMediaQuery('(max-width: 767.98px)')
  const orderAmount = getDigFormat(totalAmount + discountSum)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.cart-summary')
      const stickyElement = document.querySelector('.cart-summary-sticky')

      if (!element || !stickyElement) return

      const rect = element.getBoundingClientRect()
      const stickyRect = stickyElement.getBoundingClientRect()

      if (rect.top <= 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      if (rect.bottom <= stickyRect.height) {
        setStopSticky(true)
      } else {
        setStopSticky(false)
      }
    }

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setIsSticky(false)
      setStopSticky(false)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <div className={`cart-summary relative ${className}`}>
      <div
        className={`cart-summary-sticky w-full rounded-md p-4 shadow-full md:w-80 lg:w-96 ${
          isSticky && !isMobile ? 'fixed top-0' : ''
        } ${stopSticky && !isMobile ? 'absolute bottom-0 top-auto' : ''}`}
      >
        <div className="mb-5 text-lg font-bold">Ваш заказ</div>
        <div className="mb-5 flex flex-col gap-1">
          <div className="flex items-end py-1">
            <span className="whitespace-nowrap text-sm leading-none">
              Всего
            </span>
            <div className="mx-1 flex-auto border-b border-dashed border-[rgba(0,10,18,.08)]"></div>
            <span className="leading-none">{cartLength} шт.</span>
          </div>
          <div className="flex items-end py-1">
            <span className="whitespace-nowrap text-sm leading-none">
              Стоимость товаров в заказе
            </span>
            <div className="mx-1 flex-auto border-b border-dashed border-[rgba(0,10,18,.08)]"></div>
            <span className="leading-none">{orderAmount} ₽</span>
          </div>
          <div className="flex items-end py-1">
            <span className="whitespace-nowrap text-sm leading-none">
              Скидка
            </span>
            <div className="mx-1 flex-auto border-b border-dashed border-[rgba(0,10,18,.08)]"></div>
            <span
              className={`leading-none ${discountSum && 'font-bold text-redColor'} `}
            >
              {discountSum ? `-${getDigFormat(discountSum)} ` : 0} ₽
            </span>
          </div>
        </div>
        <PromoCodeForm />
        <div className="mb-4 flex items-end py-1">
          <span className="text-xl font-medium leading-none">
            Итого к оплате
          </span>
          <div className="mx-1 flex-auto border-b border-dashed border-[rgba(0,10,18,.08)]"></div>
          <span className="text-xl font-medium leading-none">
            {getDigFormat(totalAmount)} ₽
          </span>
        </div>
        {!formIsOpen && (
          <Button onClick={handleOpenForm} className="w-full rounded-md">
            <span className="">Перейти к оформлению</span>
          </Button>
        )}
      </div>
    </div>
  )
}
