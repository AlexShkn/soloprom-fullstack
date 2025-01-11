'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addProductToCart, removeCartProduct } from '@/redux/slices/cartSlice'

import './ProductsCard.scss'
import { ProductsCardPropTypes } from '@/types/products.types'
import { DescriptionTemplate } from './DescriptionTemplate'
import { PriceBlock } from './PriceBlock'
import { RegaliaList } from './RegaliaList/RegaliaList'
import {
  addProductToFavorite,
  removeFavoriteProduct,
} from '@/redux/slices/favoriteSlice'
import {
  setFastOrderProduct,
  modalCallbackStateChange,
} from '@/redux/slices/modalsSlice'
import Link from 'next/link'

export const ProductsCard: React.FC<ProductsCardPropTypes> = ({ cardData }) => {
  const [variantValue, setVariantValue] = useState('')
  const [cartIsAdded, setCartIsAdded] = useState(false)
  const [favoriteIsAdded, setFavoriteIsAdded] = useState(false)
  const [cartIsLoad, setCartIsLoad] = useState(false)
  const [favoriteIsLoad, setFavoriteIsLoad] = useState(false)
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart.cartState)
  const favoriteState = useSelector(
    (state: RootState) => state.favorite.favoriteState,
  )

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

  const sizesData = sizes || volumes

  useEffect(() => {
    let defaultSize
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]

      setVariantValue(defaultSize)
    }
    const cartId = `${productId}-${defaultSize}`

    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
    setFavoriteIsAdded(favoriteState.some((item) => item.favoriteId === cartId))
  }, [])

  useEffect(() => {
    const cartId = `${productId}-${variantValue}`

    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
    setFavoriteIsAdded(favoriteState.some((item) => item.favoriteId === cartId))
  }, [variantValue])

  const handleAddToCart = () => {
    setCartIsLoad(true)
    const product = {
      productId,
      name,
      variant: variantValue,
      price: sizesData?.[variantValue] ?? defaultPrice,
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
  }

  const handleRemoveFromCart = () => {
    setCartIsLoad(true)
    dispatch(removeCartProduct({ productId, variant: variantValue }))
    setTimeout(() => {
      setCartIsAdded(false)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleAddToFavorites = () => {
    setFavoriteIsLoad(true)
    const product = {
      productId,
      name,
      variant: variantValue,
      price: sizesData?.[variantValue] ?? defaultPrice,
      url,
      img,
      productType,
      categoryName,
    }
    dispatch(addProductToFavorite(product))
    setTimeout(() => {
      setFavoriteIsAdded(true)
      setFavoriteIsLoad(false)
    }, 1000)
  }

  const handleRemoveFromFavorites = () => {
    setFavoriteIsLoad(true)
    dispatch(removeFavoriteProduct({ productId, variant: variantValue }))
    setTimeout(() => {
      setFavoriteIsAdded(false)
      setFavoriteIsLoad(false)
    }, 1000)
  }

  const fastOrderHandle = () => {
    dispatch(
      setFastOrderProduct({
        productId,
        name,
        variant: variantValue,
        price: sizesData?.[variantValue] ?? defaultPrice,
        url,
        img,
      }),
    )

    dispatch(modalCallbackStateChange(true))
  }

  return (
    <div
      data-product-card
      className="product-card relative flex h-full flex-col rounded bg-white p-4 shadow-custom"
    >
      {regalia.length > 0 && (
        <RegaliaList regalia={regalia} discount={discount} />
      )}

      <Link href={url || '/'} className="relative text-center">
        <img
          className="mb-2.5 inline-block h-[120px] object-contain"
          src={
            (img && `/img/catalog/${img}.webp`) || '/img/catalog/not-found.jpg'
          }
          alt={name}
        />
        <span className="product-card__more invisible absolute right-1 top-2 z-10 rounded bg-white px-2.5 py-1 font-bold opacity-0 transition-all">
          Подробнее
        </span>
      </Link>
      <div className="mb-2.5 text-center font-bold uppercase leading-5 text-[#272b2c]">
        {name}
      </div>

      <DescriptionTemplate
        variantValue={variantValue}
        setVariantValue={setVariantValue}
        cardData={cardData}
      />
      <div className="mt-auto flex flex-col gap-2.5">
        <PriceBlock
          price={sizesData?.[variantValue] ?? defaultPrice}
          discount={discount}
        />
        <div className="mb-1 flex items-end justify-between gap-2.5">
          <button
            onClick={() => fastOrderHandle()}
            type="button"
            className="ml-auto font-medium text-[#dd3824] underline"
          >
            Купить в 1 клик
          </button>
        </div>
        {volumes && (
          <div className="product-card__volumes">
            <ul className="product-card__volumes-list">
              {Object.keys(volumes).map((volume) => (
                <li
                  key={volume}
                  className={`product-card__volumes-item ${volume === variantValue && 'current'}`}
                  onClick={() => setVariantValue(volume)}
                >
                  <span className="product-card__volumes-value">{volume}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div data-add-buttons className="flex items-center gap-5">
          <button
            type="button"
            onClick={
              favoriteIsAdded ? handleRemoveFromFavorites : handleAddToFavorites
            }
            className={`product-card__favorite ${favoriteIsLoad && 'load load--mini'} ${favoriteIsAdded && 'added'}`}
          >
            <svg className="icon h-7 w-7 fill-accentBlue transition-colors">
              <use xlinkHref="/img/sprite.svg#heart" />
            </svg>
          </button>
          <button
            type="button"
            onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
            disabled={cartIsLoad}
            className={`button product-card__button ${cartIsLoad && 'load'} ${cartIsAdded && 'added'}`}
          >
            <span className="ttall invisible absolute inline-flex h-full w-full items-center justify-center rounded bg-hoverBlue opacity-0 transition-colors">
              <img
                className="h7 w-7"
                src="/img/icons/availability.svg"
                alt="Availability"
              />
            </span>
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#cart" />
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
