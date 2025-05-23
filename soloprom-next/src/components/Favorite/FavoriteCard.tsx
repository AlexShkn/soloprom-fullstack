'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'
import { useFavoriteStore } from '@/store/useFavoriteStore'

import { FavoriteProduct } from '@/types/products.types'
import { Trash2 } from 'lucide-react'
import { sizeNameAdaptive, typeNameAdaptive } from '@/supports/adaptiveDto'
import { CartButton } from '../ProductsCard/CartButton'

interface FavoriteCardProps {
  product: FavoriteProduct
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ product }) => {
  const { productId, name, size, price, url, img, productType, categoryName } =
    product
  const cardData = {
    productId,
    url,
    name,
    img,
    categoryName,
    defaultPrice: price,
    defaultSize: size,
    productType,
  }

  const { removeFavoriteProduct } = useFavoriteStore()

  return (
    <div className="flex flex-col gap-5 py-2.5 mds:p-2.5 mdl:flex-row mdl:items-center [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayColor">
      <div className="flex flex-auto items-center">
        <div className="mds:h-30 mds:w-30 mr-5 h-20 w-20">
          <Link href={product.url} className="cart__item-link">
            <Image
              src={
                product.img
                  ? `/img/catalog/${product.img}.webp`
                  : '/img/catalog/not-found.jpg'
              }
              className="h-full w-full object-contain"
              width={150}
              height={150}
              alt={product.name}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <Link
            href={product.url}
            className="cart__item-title link-hover font-medium leading-5"
          >
            <b>{product.name}</b>
          </Link>

          <div>
            {sizeNameAdaptive[product.categoryName]}: <b>{product.size}</b>
          </div>
          <div>
            {typeNameAdaptive[product.categoryName]}:{' '}
            <b>{product.productType}</b>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 xs:gap-10 mds:flex-row mdl:flex-col mdl:gap-5">
        <div className="flex w-full items-center justify-between gap-2.5 border-b border-dashed border-gray-400 pb-1">
          <div className="text-lg font-medium">
            {price ? <span>{getDigFormat(price)}₽</span> : ''}
          </div>

          <div className="order-2 flex items-center gap-5 mdl:order-none mdl:flex-row md:flex-col">
            <button
              onClick={() => removeFavoriteProduct(productId)}
              className="text-darkBlue hover:text-accentBlue"
            >
              <Trash2 className="icon h-5 w-5 transition-colors" />
            </button>
          </div>
        </div>

        <CartButton cardData={cardData} />
      </div>
    </div>
  )
}
