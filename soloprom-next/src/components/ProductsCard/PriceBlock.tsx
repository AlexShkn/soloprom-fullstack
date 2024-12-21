'use client'
import { getDigFormat } from '@/supports'
import React from 'react'

interface PriceProps {
  discount?: number
  price: number
}

export const PriceBlock: React.FC<PriceProps> = ({ discount, price }) => {
  const formattedDiscountPrice =
    discount && price
      ? `${getDigFormat(Math.floor(price * (1 + discount / 100)))}`
      : ''
  return (
    <div
      className={`flex items-center justify-between gap-2.5 ${discount ? 'mt-7' : 'mt-2'}`}
    >
      <div
        data-price
        className={`relative text-2xl font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} `}
      >
        {formattedDiscountPrice && (
          <>
            <span>{`${getDigFormat(price)} ₽`} </span>
            <b className="absolute -top-5 left-4 rotate-[7deg] whitespace-nowrap text-xl font-medium text-[#ff6666] line-through">
              {`${getDigFormat(formattedDiscountPrice)} ₽`}
            </b>
          </>
        )}
        {!formattedDiscountPrice && (
          <span>{price > 0 ? `${getDigFormat(price)} ₽` : 'По запросу'} </span>
        )}
      </div>
    </div>
  )
}
