'use client'
import { getDigFormat } from '@/supports'
import React from 'react'

interface PriceProps {
  discount?: number
  price: number
  mod?: string
}

export const PriceBlock: React.FC<PriceProps> = ({ discount, price, mod }) => {
  const formattedDiscountPrice =
    discount && price
      ? `${getDigFormat(Math.floor(price * (1 + discount / 100)))}`
      : ''
  return (
    <div className={`mt-2.5 flex items-center justify-between gap-2.5`}>
      <div
        data-price
        className={`relative flex font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} ${mod ? 'flex-col items-end text-lg' : 'flex-row-reverse items-center gap-2 text-2xl'} `}
      >
        {formattedDiscountPrice && (
          <>
            <b
              className={`leading-1 whitespace-nowrap font-medium text-[#a7a0a0] line-through ${mod ? 'text-sm' : 'text-lg'}`}
            >
              {`${getDigFormat(formattedDiscountPrice)} ₽`}
            </b>
            <span className={`whitespace-nowrap ${mod && 'text-lg'}`}>
              {`${getDigFormat(price)} ₽`}{' '}
            </span>
          </>
        )}
        {!formattedDiscountPrice && (
          <span>{price > 0 ? `${getDigFormat(price)} ₽` : 'По запросу'} </span>
        )}
      </div>
    </div>
  )
}
