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
      className="flex flex-col items-center gap-5 py-2.5 mds:p-2.5 mdl:flex-row [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayColor"
    >
      <div className="flex flex-auto items-center">
        <div className="mr-5 h-24 w-24 mds:h-36 mds:w-36">
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
          <div className="font-medium leading-5 mdl:text-lg">
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
      <div className="flex items-center gap-2.5 xs:gap-10 mds:flex-row mdl:flex-col mdl:gap-5">
        <div className="order-2 flex items-center gap-2.5 mds:order-none">
          <button
            onClick={() =>
              decreaseProductCount(product.productId, product.variant)
            }
            disabled={product.count === 1}
            type="button"
            className="cart__item-count border-1-[#d4d4d4] rounded-custom inline-flex h-[36px] w-[36px] items-center justify-center bg-[#f5f5f5] transition-colors"
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#minus"></use>
            </svg>
          </button>
          <div className="text-lg font-bold">{product.count}</div>
          <button
            onClick={() =>
              increaseProductCount(product.productId, product.variant)
            }
            type="button"
            className="cart__item-count border-1-[#d4d4d4] rounded-custom inline-flex h-[36px] w-[36px] items-center justify-center border bg-[#f5f5f5] transition-colors"
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#plus"></use>
            </svg>
          </button>
        </div>
        <div className="order-2 flex items-center gap-5 mdl:order-none mdl:flex-col mdl:items-end md:flex-row md:items-center">
          <div className="order-2 whitespace-nowrap text-xl md:order-none">
            <span className="text-lg font-bold">
              {getDigFormat(product.price * product.count)}₽
            </span>
          </div>

          <div className="order-2 flex items-center gap-5 mdl:order-none mdl:flex-row md:flex-col">
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
