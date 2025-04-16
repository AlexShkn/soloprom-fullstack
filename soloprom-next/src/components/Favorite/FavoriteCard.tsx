'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'

import { useCartStore } from '@/store/cartStore'
import { useFavoriteStore } from '@/store/favoriteStore'

import { FavoriteProduct } from '@/types/products.types'

interface FavoriteCardProps {
  product: FavoriteProduct
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

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ product }) => {
  const {
    productId,
    name,
    variant,
    price,
    url,
    img,
    productType,
    categoryName,
  } = product
  const [cartIsLoad, setCartIsLoad] = useState(false)
  const [cartIsAdded, setCartIsAdded] = useState(false)

  const { cartState, addProductToCart, removeCartProduct } = useCartStore()

  const { removeFavoriteProduct } = useFavoriteStore()

  const storeId = `${productId}-${variant}`

  useEffect(() => {
    setCartIsAdded(cartState.some((item) => item.storeId === storeId))
  }, [])

  const handleAddToCart = () => {
    if (!cartIsAdded) {
      setCartIsLoad(true)
      const product = {
        productId,
        name,
        variant,
        price,
        url,
        img,
        productType,
        categoryName,
      }
      addProductToCart(product)
      setTimeout(() => {
        setCartIsAdded(true)
        setCartIsLoad(false)
      }, 1000)
    } else {
      setCartIsLoad(true)
      removeCartProduct(productId, variant)
      setTimeout(() => {
        setCartIsAdded(false)
        setCartIsLoad(false)
      }, 1000)
    }
  }

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
              alt=""
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
            {sizeNameAdaptive[product.categoryName]}: <b>{product.variant}</b>
          </div>
          <div>
            {typeNameAdaptive[product.categoryName]}:{' '}
            <b>{product.productType}</b>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 xs:gap-10 mds:flex-row mdl:flex-col mdl:gap-5">
        <div className="flex w-full items-center justify-between gap-2.5 border-b border-dashed border-gray-400">
          <div className="text-lg font-medium">
            <span>{getDigFormat(price)}₽</span>
          </div>

          <div className="order-2 flex items-center gap-5 mdl:order-none mdl:flex-row md:flex-col">
            <button
              onClick={() => removeFavoriteProduct(productId, variant)}
              className="group"
            >
              <svg className="icon h-6 w-6 fill-darkBlue transition-colors group-hover:fill-hoverBlue">
                <use xlinkHref="/img/sprite.svg#remove"></use>
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          type="button"
          className={`button relative gap-2.5 px-5 py-2.5 font-bold ${cartIsLoad && 'load'} ${cartIsAdded && 'added'}`}
        >
          <span className="ttall invisible absolute inline-flex h-full w-full items-center justify-center rounded-custom bg-hoverBlue opacity-0 transition-all">
            <img
              className="h-7 w-7"
              src="/img/icons/availability-w.svg"
              alt=""
            />
          </span>
          <svg className="icon h-7 w-7 fill-white">
            <use xlinkHref="img/sprite.svg#cart"></use>
          </svg>
          В корзину
        </button>
      </div>
    </div>
  )
}
