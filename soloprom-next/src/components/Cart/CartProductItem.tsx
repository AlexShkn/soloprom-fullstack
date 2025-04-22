'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'
import { useCartStore, CartProductTypes } from '@/store/useCartStore'
import { Minus, Plus, Trash2 } from 'lucide-react'

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
      className="flex flex-col gap-5 py-2.5 mds:p-2.5 mdl:flex-row mdl:items-center [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayColor"
    >
      <div className="flex flex-auto items-center">
        <div className="mds:h-30 mds:w-30 mr-5 h-20 w-20">
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
        </div>

        <div className="flex flex-col gap-1">
          <div className="link-hover font-medium leading-5">
            <Link href={product.url}>
              <b>{product.name}</b>
            </Link>
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
      <div className="flex flex-row items-center justify-end gap-2.5 xs:gap-5 mdl:flex-col mdl:gap-5 md:flex-row">
        <div className="order-2 flex items-center gap-2.5 mds:order-none">
          <button
            onClick={() =>
              decreaseProductCount(product.productId, product.variant)
            }
            disabled={product.count === 1}
            type="button"
            className="cart__item-count border-1-[#d4d4d4] inline-flex h-[30px] w-[30px] items-center justify-center rounded-custom bg-[#f5f5f5] transition-colors"
          >
            <Minus />
          </button>
          <div className="text-lg">{product.count}</div>
          <button
            onClick={() =>
              increaseProductCount(product.productId, product.variant)
            }
            type="button"
            className="cart__item-count border-1-[#d4d4d4] inline-flex h-[30px] w-[30px] items-center justify-center rounded-custom border bg-[#f5f5f5] transition-colors"
          >
            <Plus />
          </button>
        </div>
        <div className="order-2 flex flex-row items-center gap-5 mdl:order-none mdl:items-end md:items-center">
          <div className="order-2 whitespace-nowrap text-xl md:order-none">
            <span className="text-lg font-medium">
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
              <Trash2 className="icon h-5 w-5 stroke-darkBlue transition-colors group-hover:fill-hoverBlue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
