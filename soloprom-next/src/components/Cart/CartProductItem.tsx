'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'
import { useCartStore } from '@/store/cartStore'
import { CartProductTypes } from '@/store/cartStore'

interface CartProductItemProps {
  product: CartProductTypes
}

const sizeNameAdaptive: { [key: string]: string } = {
  tires: 'Размер',
  battery: 'ДхШхВ, мм',
  oils: 'Объём',
}
const typeNameAdaptive: { [key: string]: string } = {
  tires: 'Тип шины',
  battery: 'Тип аккумулятора',
  oils: 'Тип жидкости',
}

export const CartProductItem: React.FC<CartProductItemProps> = ({
  product,
}) => {
  const { decreaseProductCount, increaseProductCount, removeCartProduct } =
    useCartStore()

  return (
    <div
      key={product.productId + product.variant}
      className="mdl:flex-row mds:p-2.5 flex flex-col items-center gap-5 py-2.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayColor"
    >
      <div className="flex flex-auto items-center">
        <div className="mds:h-36 mds:w-36 mr-5 h-24 w-24">
          <Link href={product.url}>
            <Image
              src={
                product.img
                  ? `/img/catalog/${product.img}.webp`
                  : '/img/catalog/not-found.jpg'
              }
              className="h-full w-full object-contain"
              width={150}
              height={150}
              alt=""
            />
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="mdl:text-lg font-medium leading-5">
            <b>{product.name}</b>
          </div>
          <div>
            {sizeNameAdaptive[product.categoryName]}: <b>{product.variant}</b>
          </div>
          <div>
            {typeNameAdaptive[product.categoryName]}:{' '}
            <b>{product.productType}</b>
          </div>
        </div>
      </div>
      <div className="mdl:flex-col mds:flex-row mdl:gap-5 flex items-center gap-2.5 xs:gap-10">
        <div className="mds:order-none order-2 flex items-center gap-2.5">
          <button
            onClick={() =>
              decreaseProductCount(product.productId, product.variant)
            }
            disabled={product.count === 1}
            type="button"
            className="cart__item-count border-1-[#d4d4d4] inline-flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#f5f5f5] transition-colors"
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#minus"></use>
            </svg>
          </button>
          <div className="font-bold">{product.count}</div>
          <button
            onClick={() =>
              increaseProductCount(product.productId, product.variant)
            }
            type="button"
            className="cart__item-count border-1-[#d4d4d4] inline-flex h-[36px] w-[36px] items-center justify-center rounded-lg border bg-[#f5f5f5] transition-colors"
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#plus"></use>
            </svg>
          </button>
        </div>
        <div className="mdl:flex-col mdl:items-end mdl:order-none order-2 flex items-center gap-5 md:flex-row md:items-center">
          <div className="order-2 whitespace-nowrap text-xl md:order-none">
            <span className="font-bold">
              {getDigFormat(product.price * product.count)}₽
            </span>
          </div>

          <div className="mdl:order-none mdl:flex-row order-2 flex items-center gap-5 md:flex-col">
            <button
              onClick={() =>
                removeCartProduct(product.productId, product.variant)
              }
              className="group"
            >
              <svg className="icon h-6 w-6 fill-darkBlue transition-colors group-hover:fill-hoverBlue">
                <use xlinkHref="/img/sprite.svg#remove"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
