// ProductsCard.tsx

'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { ArrowLeft } from 'lucide-react'

import './ProductsCard.scss'
import { ProductsCardPropTypes, ProductCardData } from '@/types/products.types'
import { DescriptionTemplate } from './DescriptionTemplate'
import { PriceBlock } from './PriceBlock'
import { RegaliaList } from './RegaliaList'

import { useCartStore } from '@/store/cartStore'
import { useFavoriteStore } from '@/store/favoriteStore'
import { useModalsStore } from '@/store/modalsStore'
import { RatingDisplay } from './RatingDisplay'
import { useCompareStore } from '@/store/compareStore'

export const ProductsCard: React.FC<ProductsCardPropTypes> = ({
  cardData,
  mod,
}) => {
  const [variantValue, setVariantValue] = useState('')
  const [cartIsAdded, setCartIsAdded] = useState(false)
  const [favoriteIsAdded, setFavoriteIsAdded] = useState(false)
  const [compareIsAdded, setCompareIsAdded] = useState(false)
  const [cartIsLoad, setCartIsLoad] = useState(false)

  const { cartState } = useCartStore()
  const { addProductToCart } = useCartStore()
  const { removeCartProduct } = useCartStore()

  const { setShareModal } = useModalsStore()

  const { favoriteState, removeFavoriteProduct, addProductToFavorite } =
    useFavoriteStore()
  const { modalCallbackStateChange, setFastOrderProduct } = useModalsStore()

  const { comparedItems, addToCompare, removeFromCompare } = useCompareStore()

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
    brandName,
    descr,
  } = cardData

  const sizesData = sizes || volumes

  const productData: ProductCardData = {
    productId,
    name,
    variant: variantValue,
    price: sizesData?.[variantValue] ?? defaultPrice,
    url,
    img,
    productType,
    categoryName,
  }

  useEffect(() => {
    let defaultSize: string | undefined = undefined
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]
      setVariantValue(defaultSize || '')
    }
    const storeId = `${productId}-${defaultSize}`

    setCartIsAdded(cartState.some((item) => item.storeId === storeId))
    setFavoriteIsAdded(favoriteState.some((item) => item.storeId === storeId))
    setCompareIsAdded(
      comparedItems[categoryName as keyof typeof comparedItems]?.some(
        (item) =>
          item.productId === productId && item.variant === (defaultSize || ''),
      ) || false,
    )
  }, [])

  useEffect(() => {
    const storeId = `${productId}-${variantValue}`

    setCartIsAdded(cartState.some((item) => item.storeId === storeId))
    setFavoriteIsAdded(favoriteState.some((item) => item.storeId === storeId))
    setCompareIsAdded(
      comparedItems[categoryName as keyof typeof comparedItems]?.some(
        (item) => item.productId === productId && item.variant === variantValue,
      ) || false,
    )
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

  const handleAddToCompare = () => {
    console.log(categoryName, productData)

    addToCompare(categoryName, productData)
    setCompareIsAdded(true)

    console.log(comparedItems)
  }

  const handleRemoveFromCompare = () => {
    removeFromCompare(categoryName, productId, variantValue)
    setCompareIsAdded(false)
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

  const schemaMarkup = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: name,
    image: `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${img}.webp`,
    description: descr || 'Описание отсутствует',
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    sku: productId,
    mpn: productId,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${url}`,
      priceCurrency: 'RUB',
      price: sizesData?.[variantValue] ?? defaultPrice,
      availability: stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    review: rating
      ? {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: rating,
            bestRating: '5',
          },
          name: 'Product Review',
          author: { '@type': 'Person', name: 'Покупатель' },
        }
      : undefined,
  }

  return (
    <div className="h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div
        className={`product-card relative flex h-full ${mod !== 'row' && 'flex-col'} ${mod === 'row' && 'justify-between gap-5'} rounded-custom bg-white p-4 shadow-custom`}
      >
        {((regalia && regalia.length) || discount) && (
          <RegaliaList regalia={regalia} discount={discount} />
        )}

        <div
          className={`group ${mod === 'row' && 'flex flex-1 items-center gap-2.5'}`}
        >
          <Link
            href={url || '/'}
            className={`relative ${mod !== 'row' ? 'mb-2.5' : 'items-center'} flex justify-center`}
          >
            {brandName && img && (
              <Image
                className={`absolute left-0 inline-block h-7 w-12 object-contain ${(regalia.length || discount) && '-bottom-1'} ${mod === 'row' && 'bottom-0'}`}
                src={`/img/brands/${brandName.toLowerCase()}.webp`}
                width={48}
                height={28}
                alt={brandName}
              />
            )}
            <Image
              className="inline-block h-[120px] object-contain"
              src={
                (img && `/img/catalog/${img}.webp`) ||
                `/img/brands/${brandName.toLowerCase()}.webp`
              }
              width={120}
              height={120}
              alt={name}
            />
          </Link>

          <div className={`${mod === 'row' && 'flex flex-auto flex-col'}`}>
            <Link href={url || '/'} className="relative mb-2.5 text-center">
              <div
                className={`link-hover mb-2.5 flex items-center gap-2 font-bold uppercase leading-none text-[#272b2c] group-hover:text-hoverBlue ${mod === 'grid' ? 'text-left text-sm' : 'text-center'}`}
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
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-2.5">
          {mod !== 'grid' ? (
            <PriceBlock
              price={sizesData?.[variantValue] ?? defaultPrice}
              discount={discount}
            />
          ) : (
            ''
          )}

          <div className="mb-1 flex items-center justify-between gap-2.5">
            <RatingDisplay rating={rating} />
            <button
              onClick={() => fastOrderHandle()}
              type="button"
              className={`ml-auto font-medium text-[#dd3824] underline ${mod === 'grid' && 'text-[14px]'}`}
            >
              Быстрый заказ
            </button>
          </div>
          {volumes && (
            <div className="mb-1">
              <div className="flex flex-wrap justify-end gap-2.5">
                {Object.keys(volumes).map((volume) => (
                  <button
                    key={volume}
                    className={`relative flex cursor-pointer items-center justify-center rounded-custom bg-accentBlue ${mod === 'grid' ? 'px-2 py-1 text-sm' : 'px-4 py-1'} text-center transition-colors ${volume === variantValue && 'bg-successColor'}`}
                    onClick={() => setVariantValue(volume)}
                  >
                    <span className="font-medium text-white">{volume}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div
            className={`flex ${mod === 'grid' ? 'w-auto flex-col' : 'items-center justify-between gap-2.5'}`}
          >
            {mod === 'grid' && (
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
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className={`product-card__favorite absolute right-2 top-3`}
                      onClick={() => setShareModal(productId, true)}
                    >
                      <svg className="icon h-6 w-6 fill-accentBlue transition-colors">
                        <use xlinkHref="/img/sprite.svg#shared" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Поделиться</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={
                        compareIsAdded
                          ? handleRemoveFromCompare
                          : handleAddToCompare
                      }
                      className={`product-card__favorite ${mod === 'grid' ? 'absolute right-2 top-20' : 'relative'} ${compareIsAdded && 'added'}`}
                    >
                      <svg className="icon h-7 w-7 fill-accentBlue transition-colors">
                        <use xlinkHref="/img/sprite.svg#scales" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>В сравнение</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={
                        favoriteIsAdded
                          ? handleRemoveFromFavorites
                          : handleAddToFavorites
                      }
                      className={`product-card__favorite ${mod === 'grid' ? 'absolute right-2.5 top-12' : 'relative'} ${favoriteIsAdded && 'added'}`}
                    >
                      <svg className="icon h-6 w-6 fill-accentBlue transition-colors">
                        <use xlinkHref="/img/sprite.svg#heart" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>В избранное</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <button
              type="button"
              onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
              disabled={cartIsLoad}
              className={`button product-card__button group relative items-center gap-2 px-5 py-2.5 font-bold ${mod === 'grid' && 'grid-view w-auto'} ${cartIsLoad && mod !== 'grid' && 'load'} ${cartIsLoad && mod === 'grid' && 'load load--mini'} ${cartIsAdded && 'added bg-transparent'}`}
            >
              <span className="ttall invisible absolute inline-flex h-full w-full items-center justify-center rounded-custom bg-successColor opacity-0 transition-colors">
                <img
                  className="h-7 w-7"
                  src="/img/icons/availability-w.svg"
                  alt="Availability"
                />
              </span>

              <div className="relative flex items-center gap-1">
                <svg
                  className={`h-5 w-5 fill-white transition-transform ${mod === 'grid' && 'grid-view group-hover:translate-x-[-16px]'}`}
                >
                  <use xlinkHref="/img/sprite.svg#cart" />
                </svg>
                <ArrowLeft
                  className={`invisible absolute right-0 top-1 h-4 w-4 opacity-0 transition-all ${mod === 'grid' && 'group-hover:visible group-hover:opacity-100'}`}
                />
              </div>
              <b
                className={`${mod === 'grid' ? 'text-sm leading-none' : 'mt-[2px] text-base'}`}
              >
                В корзину
              </b>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
