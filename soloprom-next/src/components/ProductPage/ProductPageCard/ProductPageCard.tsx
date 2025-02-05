'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductsCardPropTypes } from '@/types/products.types'
import './ProductPageCard.scss'
import { ProductPageCardDescription } from '../ProductPageCardDescription'
import { ProductPagePriceBlock } from '../ProductPagePriceBlock'
import { RegaliaList } from '@/components/ProductsCard/RegaliaList'

import { useCartStore } from '@/store/cartStore'
import { useModalsStore } from '@/store/modalsStore'
import { ProductsPageOffers } from '../ProductsPageOffers'

export const ProductPageCard: React.FC<ProductsCardPropTypes> = ({
  cardData,
}) => {
  const {
    productId,
    url,
    name,
    img,
    categoryName,
    regalia = [],
    sizes,
    defaultPrice,
    volumes,
    discount,
    productType,
    rating,
  } = cardData

  const sizesData = sizes || volumes
  let defaultSize: string | undefined = undefined

  useEffect(() => {
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]
    }
  }, [])

  return (
    <div className="product-page-card border-1 mb-7 border-b border-accentBlue">
      <div className="product-page-card__title mb-7 font-bold">{name}</div>
      <div className="product-page-card__wrapper">
        <div className="relative flex flex-col gap-5 md:flex-row">
          <div className="relative flex justify-center gap-2 pt-10">
            {rating > 1 && (
              <div className="absolute right-2.5 top-2.5 z-10 flex justify-end text-2xl font-bold text-accentBlue">
                {rating}
                <img
                  className="mb-1 h-4 w-5"
                  src="/img/icons/star.svg"
                  alt=""
                />
              </div>
            )}
            {regalia.length > 0 && (
              <RegaliaList regalia={regalia} discount={discount} />
            )}
            {/* <ul className="flex flex-col items-center gap-2">
              <li className="border-1 cursor-pointer border border-accentBlue p-1">
                <Image
                  className="product-page-card__image object-contain"
                  src={`/img/catalog/${img}.webp`}
                  alt=""
                  width={80}
                  height={80}
                />
              </li>
            </ul> */}
            <div className="relative flex flex-auto justify-center">
              <Image
                className="product-page-card__image aspect-square h-60 w-60 object-contain xl:h-72 xl:w-72"
                src={
                  (img && `/img/catalog/${img}.webp`) ||
                  '/img/catalog/not-found.jpg'
                }
                alt=""
                width={288}
                height={288}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ProductPageCardDescription cardData={cardData} />
            <ProductsPageOffers cardData={cardData} />
          </div>
        </div>
      </div>
      <div
        itemScope
        itemType="http://schema.org/Product"
        aria-hidden="true"
        className="hidden"
      >
        <meta itemProp="name" content={name} />
        <meta itemProp="description" content={name} />
        <meta itemProp="productID" content={productId} />
        <meta itemProp="sku" content={defaultSize} />

        <link
          itemProp="image"
          href={`https://soloprom.ru/img/catalog/${img}.jpg`}
        />

        <div itemProp="offers" itemScope itemType="http://schema.org/Offer" />
        <meta itemProp="price" content={defaultPrice.toString()} />
        <link
          itemProp="url"
          href={`https://soloprom.ru/products/${productId}`}
        />
        <meta itemProp="priceCurrency" content="RUR" />
        <link itemProp="availability" href="https://schema.org/InStock" />
      </div>
    </div>
  )
}
