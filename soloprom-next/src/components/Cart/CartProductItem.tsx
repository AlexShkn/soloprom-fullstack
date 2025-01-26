'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'
import { useCartStore } from '@/zustand/cartStore'
import { CartProductTypes } from '@/zustand/cartStore'

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
    useCartStore((state) => state)

  return (
    <div
      key={product.productId + product.variant}
      className="cart__item ga-5 flex items-center p-2.5"
    >
      <div className="flex flex-auto items-center">
        <div className="cart__item-image mr-5 h-[150px] w-[150px]">
          <Link href={product.url} className="cart__item-link">
            <Image
              src={
                product.img
                  ? `/img/catalog/${product.img}.webp`
                  : '/img/catalog/not-found.jpg'
              }
              width={150}
              height={150}
              alt=""
            />
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="cart__item-title text-lg font-medium leading-5">
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
      <div className="cart__item-row flex items-center gap-5">
        <div className="cart__item-counter flex items-center gap-2.5">
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
        <div className="cart__item-right flex items-center gap-5">
          <div className="cart__item-price whitespace-nowrap text-xl">
            <span>{getDigFormat(product.price * product.count)}₽</span>
          </div>

          <div className="cart__item-buttons flex flex-col items-center gap-5">
            <button
              onClick={() =>
                removeCartProduct(product.productId, product.variant)
              }
              data-cart-remove=""
              className="cart__item-button"
            >
              <svg className="icon">
                <use xlinkHref="/img/sprite.svg#remove"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
