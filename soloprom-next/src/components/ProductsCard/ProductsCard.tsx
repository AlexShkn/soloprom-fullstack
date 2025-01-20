'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import './ProductsCard.scss'
import { ProductsCardPropTypes } from '@/types/products.types'
import { DescriptionTemplate } from './DescriptionTemplate'
import { PriceBlock } from './PriceBlock'
import { RegaliaList } from './RegaliaList/RegaliaList'

import { useCartStore } from '@/zustand/cartStore'
import { useFavoriteStore } from '@/zustand/favoriteStore'
import { useModalsStore } from '@/zustand/modalsStore'
import { RatingDisplay } from './RatingDisplay'

export const ProductsCard: React.FC<ProductsCardPropTypes> = ({
  cardData,
  mod,
}) => {
  const [variantValue, setVariantValue] = useState('')
  const [cartIsAdded, setCartIsAdded] = useState(false)
  const [favoriteIsAdded, setFavoriteIsAdded] = useState(false)
  const [cartIsLoad, setCartIsLoad] = useState(false)

  const cartState = useCartStore((state) => state.cartState)
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const removeCartProduct = useCartStore((state) => state.removeCartProduct)

  const { favoriteState, removeFavoriteProduct, addProductToFavorite } =
    useFavoriteStore((state) => state)
  const { modalCallbackStateChange, setFastOrderProduct } = useModalsStore(
    (state) => state,
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
    stock,
    delivery,
    rating,
  } = cardData

  const sizesData = sizes || volumes

  useEffect(() => {
    let defaultSize
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]

      setVariantValue(defaultSize)
    }
    const storeId = `${productId}-${defaultSize}`

    setCartIsAdded(cartState.some((item) => item.storeId === storeId))
    setFavoriteIsAdded(favoriteState.some((item) => item.storeId === storeId))
  }, [])

  useEffect(() => {
    const storeId = `${productId}-${variantValue}`

    setCartIsAdded(cartState.some((item) => item.storeId === storeId))
    setFavoriteIsAdded(favoriteState.some((item) => item.storeId === storeId))
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
    addProductToCart(product)
    setTimeout(() => {
      setCartIsAdded(true)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleRemoveFromCart = () => {
    setCartIsLoad(true)
    removeCartProduct(productId, variantValue)
    setTimeout(() => {
      setCartIsAdded(false)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleAddToFavorites = () => {
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
    addProductToFavorite(product)
    setFavoriteIsAdded(true)
  }

  const handleRemoveFromFavorites = () => {
    removeFavoriteProduct(productId, variantValue)
    setFavoriteIsAdded(false)
  }

  const fastOrderHandle = () => {
    setFastOrderProduct({
      productId,
      name,
      variant: variantValue,
      price: sizesData?.[variantValue] ?? defaultPrice,
      url,
      img,
    })
    modalCallbackStateChange(true)
  }

  return (
    <div
      data-product-card
      className="product-card relative flex h-full flex-col rounded bg-white p-4 shadow-custom"
    >
      {regalia.length > 0 && (
        <RegaliaList regalia={regalia} discount={discount} />
      )}
      <div className="mb-2.5 flex justify-center">
        <Image
          className="inline-block h-[120px] object-contain"
          src={
            (img && `/img/catalog/${img}.webp`) || '/img/catalog/not-found.jpg'
          }
          width={120}
          height={120}
          alt={name}
        />
      </div>

      <Link href={url || '/'} className="relative mb-2.5 text-center">
        <div
          className={`link-hover font-bold uppercase leading-5 text-[#272b2c] ${mod === 'mini' ? 'text-left text-sm' : 'text-center'}`}
        >
          {name}
        </div>
      </Link>

      <DescriptionTemplate
        variantValue={variantValue}
        setVariantValue={setVariantValue}
        cardData={cardData}
        mod={mod || ''}
      />

      <div className="mt-auto flex flex-col gap-2.5">
        {mod !== 'mini' ? (
          <PriceBlock
            price={sizesData?.[variantValue] ?? defaultPrice}
            discount={discount}
          />
        ) : (
          ''
        )}

        <div className="mb-1 flex items-end justify-between gap-2.5">
          <RatingDisplay rating={rating} />
          <button
            onClick={() => fastOrderHandle()}
            type="button"
            className={`ml-auto font-medium text-[#dd3824] underline ${mod === 'mini' && 'text-[14px]'}`}
          >
            Купить в 1 клик
          </button>
        </div>
        {volumes && (
          <div className="mb-1">
            <ul className="flex flex-wrap justify-end gap-2.5">
              {Object.keys(volumes).map((volume) => (
                <li
                  key={volume}
                  className={`relative flex cursor-pointer items-center justify-center rounded bg-accentBlue ${mod === 'mini' ? 'px-2 py-1 text-sm' : 'px-4 py-1'} text-center transition-colors ${volume === variantValue && 'bg-successColor'}`}
                  onClick={() => setVariantValue(volume)}
                >
                  <span className="font-medium text-white">{volume}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className={`flex ${mod === 'mini' ? 'w-auto flex-col' : 'items-center justify-between'}`}
        >
          {mod === 'mini' && (
            <div className="mb-2.5 flex items-center justify-between gap-2.5">
              <div className="font-medium text-slate-600">
                {categoryName === 'oils'
                  ? 'В наличии'
                  : stock
                    ? `${stock} шт.`
                    : delivery}
              </div>
              <PriceBlock
                price={sizesData?.[variantValue] ?? defaultPrice}
                discount={discount}
                mod={mod}
              />
            </div>
          )}
          <div className="flex items-center gap-4">
            <button
              type="button"
              // onClick={
              //   favoriteIsAdded ? handleRemoveFromFavorites : handleAddToFavorites
              // }
              className={`product-card__favorite ${mod === 'mini' && 'absolute right-2 top-12'} ${favoriteIsAdded && 'added'}`}
            >
              <svg className="icon h-7 w-7 fill-accentBlue transition-colors">
                <use xlinkHref="/img/sprite.svg#scales" />
              </svg>
            </button>
            <button
              type="button"
              onClick={
                favoriteIsAdded
                  ? handleRemoveFromFavorites
                  : handleAddToFavorites
              }
              className={`product-card__favorite ${mod === 'mini' && 'absolute right-3 top-3'} ${favoriteIsAdded && 'added'}`}
            >
              <svg className="icon h-6 w-6 fill-accentBlue transition-colors">
                <use xlinkHref="/img/sprite.svg#bookmark" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
            disabled={cartIsLoad}
            className={`button product-card__button ${mod === 'mini' && 'mini w-auto'} ${cartIsLoad && mod !== 'mini' && 'load'} ${cartIsLoad && mod === 'mini' && 'load load--mini'} ${cartIsAdded && 'added'}`}
          >
            <span className="ttall invisible absolute inline-flex h-full w-full items-center justify-center rounded bg-hoverBlue opacity-0 transition-colors">
              <img
                className="h7 w-7"
                src="/img/icons/availability.svg"
                alt="Availability"
              />
            </span>
            <svg className={`${mod === 'mini' && 'mini'}`}>
              <use xlinkHref="/img/sprite.svg#cart" />
            </svg>

            <b className={`${mod === 'mini' && 'text-sm'}`}>В корзину</b>
          </button>
        </div>
      </div>
    </div>
  )
}
