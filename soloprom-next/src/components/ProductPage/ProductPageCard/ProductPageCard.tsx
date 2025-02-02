'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductsCardPropTypes } from '@/types/products.types'
import './ProductPageCard.scss'
import { ProductPageCardDescription } from '../ProductPageCardDescription'
import { ProductPagePriceBlock } from '../ProductPagePriceBlock'
import { RegaliaList } from '@/components/ProductsCard/RegaliaList/RegaliaList'

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
  } = cardData

  return (
    <div className="product-page__card product-page-card">
      <div className="product-page-card__title">{name}</div>
      <div className="product-page-card__wrapper">
        <div className="product-page-card__body">
          <div className="relative flex gap-2 pt-10">
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
            <div className="">
              <Image
                className="product-page-card__image"
                src={
                  (img && `/img/catalog/${img}.webp`) ||
                  '/img/catalog/not-found.jpg'
                }
                alt=""
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ProductPageCardDescription cardData={cardData} />
            <ProductsPageOffers cardData={cardData} />
          </div>
        </div>
      </div>
      {/* <div
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
        <link itemProp="url" href={`https://soloprom.ru/${url}`} />
        <meta itemProp="priceCurrency" content="RUR" />
        <link itemProp="availability" href="https://schema.org/InStock" />
      </div> */}
    </div>
  )
}
