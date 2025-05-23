'use client'
import { getDigFormat } from '@/supports'
import { formattedDiscountPrice } from '@/utils/formattedDiscountPrice'
import React from 'react'

interface PriceProps {
  discount?: number
  price: number
  mod?: string
}

export const PriceBlock: React.FC<PriceProps> = ({ discount, price, mod }) => {
  const discountPrice = formattedDiscountPrice(price, discount ?? 0)
  return (
    <div className={`flex items-center justify-between gap-2.5`}>
      <div
        className={`relative flex font-bold leading-none ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} ${mod ? 'flex-col items-end text-lg' : 'flex-row-reverse items-start gap-2 text-2xl'} `}
      >
        {discountPrice && (
          <>
            <b
              className={`whitespace-nowrap font-medium leading-none text-[#a7a0a0] line-through ${mod ? 'text-sm' : 'text-lg'}`}
            >
              {`${discountPrice} ₽`}
            </b>
            <span
              className={`whitespace-nowrap leading-none ${mod && 'text-lg'}`}
            >
              {`${getDigFormat(price)} ₽`}{' '}
            </span>
          </>
        )}
        {!discountPrice && (
          <span className="leading-none">
            {price > 0 ? `${getDigFormat(price)} ₽` : 'По запросу'}{' '}
          </span>
        )}
      </div>
    </div>
  )
}
