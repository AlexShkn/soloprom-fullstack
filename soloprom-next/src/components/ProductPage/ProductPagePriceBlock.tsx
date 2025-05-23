'use client'
import { getDigFormat } from '@/supports'
import { formattedDiscountPrice } from '@/utils/formattedDiscountPrice'
import React from 'react'

interface PriceProps {
  discount?: number
  price: number
}

export const ProductPagePriceBlock: React.FC<PriceProps> = ({
  discount,
  price,
}) => {
  const discountPrice = formattedDiscountPrice(price, discount ?? 0)

  return (
    <div className={`${discount ? 'mt-7' : 'mt-2'}`}>
      <div
        className={`relative whitespace-nowrap text-2xl font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} `}
      >
        {discountPrice && (
          <>
            <span>{`${getDigFormat(price)} ₽`} </span>
            <b className="leading-1 whitespace-nowrap text-base font-medium text-[#a7a0a0] line-through">
              {`${discountPrice} ₽`}
            </b>
          </>
        )}
        {!discountPrice && (
          <span>{price > 0 ? `${getDigFormat(price)} ₽` : 'По запросу'} </span>
        )}
      </div>
    </div>
  )
}
