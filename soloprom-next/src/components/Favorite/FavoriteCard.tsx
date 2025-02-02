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

  const { cartState, addProductToCart, removeCartProduct } = useCartStore(
    (state) => state,
  )

  const removeFavoriteProduct = useFavoriteStore(
    (state) => state.removeFavoriteProduct,
  )

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
    <div className="cart__item ga-5 flex items-center p-2.5">
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
          <Link
            href={product.url}
            className="cart__item-title link-hover text-lg font-medium leading-5"
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

      <div className="cart__item-row cart__item-row flex flex-col items-center gap-2.5">
        <div className="flex w-full items-center justify-between gap-2.5 border-b border-dashed border-gray-400">
          <div className="text-lg font-medium">
            <span>{getDigFormat(price)}₽</span>
          </div>

          <div className="cart__item-buttons">
            <button
              onClick={() => removeFavoriteProduct(productId, variant)}
              className="cart__item-button"
            >
              <svg className="icon">
                <use xlinkHref="img/sprite.svg#remove"></use>
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          type="button"
          className={`button cart__item-order-button ${cartIsLoad && 'load'} ${cartIsAdded && 'added'}`}
        >
          <span>
            <img src="img/icons/availability.svg" alt="" />
          </span>
          <svg className="icon">
            <use xlinkHref="img/sprite.svg#cart"></use>
          </svg>
          В корзину
        </button>
      </div>
    </div>
  )
}
