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
    <div className={`flex items-center justify-between gap-2.5`}>
      <div
        data-price
        className={`relative flex flex-col items-end font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} ${mod ? 'text-lg' : 'text-2xl'} `}
      >
        {formattedDiscountPrice && (
          <>
            <b
              className={`leading-1 whitespace-nowrap font-medium text-[#ff6666] line-through ${mod ? 'text-sm' : '-mb-1 mt-1 text-xl'}`}
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
