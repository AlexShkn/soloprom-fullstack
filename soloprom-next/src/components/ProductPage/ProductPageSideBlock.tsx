'use client'
import { getDigFormat } from '@/supports'
import { CardDataProps } from '@/types/products.types'
import React from 'react'
import { ConsultationBlock } from './ConsultationBlock'
import { FastOrderButton } from '../ProductsCard/FastOrderButton'
import { CartButton } from '../ProductsCard/CartButton'
import { formattedDiscountPrice } from '@/utils/formattedDiscountPrice'
import { ProductsCardSideButtons } from '../ProductsCard/ProductsCardSideButtons'

interface Props {
  cardData: CardDataProps
  defaultPrice: number
  discount: number
  stock: number
}

export const ProductPageSideBlock: React.FC<Props> = ({
  cardData,
  defaultPrice,
  discount,
  stock,
}) => {
  const { productId, url, name, img, defaultSize } = cardData

  const discountPrice = formattedDiscountPrice(defaultPrice, discount ?? 0)
  return (
    <div className="w-full lg:relative lg:w-full lg:max-w-[350px]">
      <div className="mb-5 rounded-custom bg-white px-5 py-7 shadow-custom">
        <ProductsCardSideButtons
          cardData={cardData}
          // mod={'grid'}
          mod={'static'}
          className="absolute right-4 top-3 flex-col"
        />
        <div className="flex h-full flex-col items-start">
          <div className="mb-10">
            <div className={`my-2.5 flex items-center justify-between gap-2.5`}>
              <div
                className={`relative flex font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} flex-row-reverse items-start gap-2 text-2xl`}
              >
                {discount ? (
                  <>
                    <b
                      className={`leading-1 whitespace-nowrap text-lg font-medium text-[#a7a0a0] line-through`}
                    >
                      {`${discountPrice} ₽`}
                    </b>
                    <span className={`whitespace-nowrap text-2xl`}>
                      {`${getDigFormat(defaultPrice)} ₽`}
                    </span>
                  </>
                ) : (
                  ''
                )}
                {!discount && (
                  <span>
                    {defaultPrice > 0
                      ? `${getDigFormat(defaultPrice)} ₽`
                      : 'По запросу'}
                  </span>
                )}
              </div>
            </div>
            <span className="rounded-custom bg-darkGreenColor px-4 py-1 text-white">
              В наличии{stock > 1 ? `: ${stock} шт` : ''}
            </span>
          </div>

          <div className="mt-auto flex w-full flex-col items-start">
            <FastOrderButton
              className={`my-2`}
              data={{
                productId,
                name,
                defaultSize,
                defaultPrice,
                url,
                img,
              }}
            />

            <CartButton cardData={cardData} className="w-full" />
          </div>
        </div>
      </div>

      <ConsultationBlock />
    </div>
  )
}
