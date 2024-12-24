'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { addProductToCart, removeCartProduct } from '@/redux/slices/cartSlice'

import { removeFavoriteProduct } from '@/redux/slices/favoriteSlice'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { getDigFormat } from '@/supports'

import { FavoriteProduct } from './Favorite'

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

  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart.cartState)

  const cartId = `${productId}-${variant}`

  useEffect(() => {
    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
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
      dispatch(addProductToCart(product))
      setTimeout(() => {
        setCartIsAdded(true)
        setCartIsLoad(false)
      }, 1000)
    } else {
      setCartIsLoad(true)
      dispatch(removeCartProduct({ productId, variant }))
      setTimeout(() => {
        setCartIsAdded(false)
        setCartIsLoad(false)
      }, 1000)
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-left">
        <Link href={url} className="cart__item-link"></Link>
        <div className="cart__item-image">
          <Link href={url} className="cart__item-link">
            <Image
              src={
                img ? `/img/catalog/${img}.webp` : '/img/catalog/not-found.jpg'
              }
              width={150}
              height={150}
              alt=""
            />
          </Link>
        </div>

        <div className="cart__item-description">
          <div className="cart__item-title">
            <b>{name}</b>
          </div>
          <div className="cart__item-sizes">
            {sizeNameAdaptive[categoryName]}: <b>{variant}</b>
          </div>
          <div className="cart__item-type">
            {typeNameAdaptive[categoryName]}: <b>{productType}</b>
          </div>
        </div>
      </div>

      <div className="cart__item-row cart__item-row--column">
        <div className="cart__item-right">
          <div className="cart__item-price">
            <span>{getDigFormat(price)}₽</span>
          </div>

          <div className="cart__item-buttons">
            <button
              onClick={() =>
                dispatch(
                  removeFavoriteProduct({
                    productId: productId,
                    variant: variant,
                  }),
                )
              }
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
