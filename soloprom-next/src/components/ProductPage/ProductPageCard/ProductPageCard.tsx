'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addProductToCart, removeCartProduct } from '@/redux/slices/cartSlice'

import { ProductsCardProps } from '@/components/FavoriteTabs/FavoriteTabs'
import './ProductPageCard.scss'
import { ProductPageCardDescription } from '../ProductPageCardDescription'
import { ProductPagePriceBlock } from '../ProductPagePriceBlock'
import { RegaliaList } from '@/components/ProductsCard/RegaliaList/RegaliaList'

export const ProductPageCard: React.FC<ProductsCardProps> = ({ cardData }) => {
  const [variantValue, setVariantValue] = useState('')
  const [cartIsAdded, setCartIsAdded] = useState(false)
  const [cartIsLoad, setCartIsLoad] = useState(false)
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart.cartState)

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
  let defaultSize = ''

  useEffect(() => {
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]

      setVariantValue(defaultSize)
    }
    const cartId = `${productId}-${defaultSize}`

    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
  }, [])

  useEffect(() => {
    const cartId = `${productId}-${variantValue}`

    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
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

  return (
    <div className="product-page__card product-page-card">
      <div className="product-page-card__title">{name}</div>
      <div className="product-page-card__wrapper">
        <div className="product-page-card__body">
          <div className="product-page-card__image-wrapper">
            <img
              className="product-page-card__image"
              src={`/img/catalog/${img}.webp`}
              alt=""
            />
            {regalia.length > 0 && (
              <RegaliaList regalia={regalia} discount={discount} />
            )}
          </div>

          <ProductPageCardDescription
            variantValue={variantValue}
            setVariantValue={setVariantValue}
            cardData={cardData}
          />
        </div>
        <div className="product-page-card__side">
          <ProductPagePriceBlock
            price={sizesData?.[variantValue] ?? defaultPrice}
            discount={discount}
          />

          <button
            onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
            disabled={cartIsLoad}
            className={`button product-page-card__button-cart ${cartIsLoad && 'load'} ${cartIsAdded && 'added'}`}
          >
            <span>
              <img src="/img/icons/availability.svg" alt="" />
              Добавлен
            </span>
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#cart"></use>
            </svg>
            В корзину
          </button>
          <button className="button product-page-card__fast-order">
            Быстрый заказ
            <svg className="icon">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </button>
          <div className="product-page-card__side-descr">
            Актуальные цены уточняйте у менеджера в мессенджерах или по телефону
          </div>
        </div>
      </div>

      <div
        itemScope
        itemType="http://schema.org/Product"
        aria-hidden="true"
        className="hidden"
      >
        <meta itemProp="name" content={name} />
        <meta itemProp="description" content={name} />
        <meta itemProp="productID" content={productId} />
        <meta itemProp="sku" content={defaultSize} />

        <link
          itemProp="image"
          href={`https://soloprom.ru/img/catalog/${img}.jpg`}
        />

        <div itemProp="offers" itemScope itemType="http://schema.org/Offer" />
        <meta itemProp="price" content={defaultPrice.toString()} />
        <link itemProp="url" href={`https://soloprom.ru/${url}`} />
        <meta itemProp="priceCurrency" content="RUR" />
        <link itemProp="availability" href="https://schema.org/InStock" />
      </div>
    </div>
  )
}
