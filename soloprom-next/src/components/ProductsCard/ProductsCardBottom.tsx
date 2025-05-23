'use client'
import React from 'react'

import { PriceBlock } from './PriceBlock'
import { RatingDisplay } from './RatingDisplay'
import { CardDataProps } from '@/types/products.types'
import { CartButton } from './CartButton'
import { ProductsCardSideButtons } from './ProductsCardSideButtons'
import { FastOrderButton } from './FastOrderButton'

interface Props {
  cardData: CardDataProps
  mod?: string
}

export const ProductsCardBottom: React.FC<Props> = ({ cardData, mod }) => {
  const {
    productId,
    url,
    name,
    img,
    categoryName,
    defaultPrice,
    defaultSize,
    discount = 0,
    stock,
    delivery,
    rating,
    productType,
  } = cardData

  return (
    <div className="mt-auto flex flex-col gap-2.5">
      {mod !== 'grid' ? (
        <PriceBlock price={defaultPrice} discount={discount} />
      ) : (
        ''
      )}

      <div className="mb-1 flex items-center justify-between gap-2.5">
        <RatingDisplay rating={rating} />

        <FastOrderButton
          data={{ productId, name, defaultPrice, defaultSize, url, img }}
          className={`ml-auto ${mod === 'grid' && 'text-[14px]'}`}
        />
      </div>
      <div
        className={`flex ${mod === 'grid' ? 'w-auto flex-col' : 'items-center justify-between gap-2.5'}`}
      >
        {mod === 'grid' && (
          <div className="mb-2.5 flex items-end justify-between gap-2.5">
            <div className="font-medium leading-none text-darkGreenColor">
              {categoryName === 'oils'
                ? 'В наличии'
                : stock
                  ? `${stock} шт.`
                  : delivery}
            </div>
            <PriceBlock price={defaultPrice} discount={discount} mod={mod} />
          </div>
        )}
        <ProductsCardSideButtons cardData={cardData} mod={mod} />

        <CartButton
          cardData={{
            productId,
            url,
            name,
            img,
            categoryName,
            defaultPrice,
            discount,
            defaultSize,
            productType,
          }}
          mod={mod}
        />
      </div>
    </div>
  )
}
