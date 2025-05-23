'use client'
import React from 'react'
import Link from 'next/link'

import { ProductsCardPropTypes } from '@/types/products.types'
import { DescriptionTemplate } from './DescriptionTemplate'
import { RegaliaList } from './RegaliaList'

import { ProductsCardImageBlock } from './ProductsCardImageBlock'
import { ProductsCardBottom } from './ProductsCardBottom'

import { ProductsCardSchemaOrg } from './ProductsCardSchemaOrg'

export const ProductsCard: React.FC<ProductsCardPropTypes> = ({
  cardData,
  mod,
}) => {
  const {
    url,
    name,
    categoryName,
    regalia = [],
    defaultSize,
    discount = 0,
    stock,
  } = cardData

  return (
    <div className="h-full">
      <ProductsCardSchemaOrg cardData={cardData} />
      <div
        className={`product-card relative flex h-full ${mod !== 'row' && 'flex-col'} ${mod === 'row' && 'justify-between gap-5'} rounded-custom bg-white p-4 shadow-custom`}
      >
        {regalia.length || discount ? (
          <RegaliaList regalia={regalia} discount={discount} />
        ) : (
          ''
        )}

        <div
          className={` ${mod === 'row' && 'flex flex-1 items-center gap-2.5'}`}
        >
          <ProductsCardImageBlock cardData={cardData} mod={mod} />
          <div
            className={`mb-2.5 ${mod === 'row' ? 'flex flex-auto flex-col' : 'flex w-full flex-col items-start'}`}
          >
            {!mod && (stock || categoryName === 'oils') ? (
              <span className="mb-1 text-ss leading-none text-darkGreenColor">
                В наличии
              </span>
            ) : (
              ''
            )}

            <Link href={url || '/'} className="relative mb-1.5 text-center">
              <div
                className={`link-hover flex items-center gap-2 font-bold uppercase leading-none text-[#272b2c] ${mod === 'grid' ? 'text-left text-sm' : 'text-center'}`}
              >
                {name}
              </div>
            </Link>

            {['battery', 'oils'].includes(categoryName) && mod ? (
              <div className="text-right text-sm font-medium leading-none">
                {defaultSize}
              </div>
            ) : (
              ''
            )}

            <DescriptionTemplate cardData={cardData} mod={mod} />
          </div>
        </div>

        <ProductsCardBottom cardData={cardData} mod={mod} />
      </div>
    </div>
  )
}
