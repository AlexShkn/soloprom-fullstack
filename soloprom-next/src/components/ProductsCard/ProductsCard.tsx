'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addProductToCart, removeCartProduct } from '@/redux/slices/cartSlice'

import './ProductsCard.scss'
import { ProductsCardProps } from '../ProductList/ProductList'
import { DescriptionTemplate } from './DescriptionTemplate'
import { PriceBlock } from './PriceBlock'
import { RegaliaList } from './RegaliaList'
import {
  addProductToFavorite,
  removeFavoriteProduct,
} from '@/redux/slices/favoriteSlice'

export const ProductsCard: React.FC<ProductsCardProps> = ({ cardData }) => {
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
    id,
    url,
    name,
    img,
    regalia = [],
    sizes,
    defaultPrice,
    volumes,
    discount,
  } = cardData

  const sizesData = sizes || volumes

  useEffect(() => {
    let defaultSize
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]

      setVariantValue(defaultSize)
    }
    const cartId = `${id}-${defaultSize}`

    setCartIsAdded(cartState.some((item) => item.cartId === cartId))
    setFavoriteIsAdded(favoriteState.some((item) => item.favoriteId === cartId))
  }, [])

  const handleAddToCart = () => {
    setCartIsLoad(true)
    const product = {
      id,
      name,
      variant: variantValue,
      price: sizesData?.[variantValue] ?? defaultPrice,
      url,
    }
    dispatch(addProductToCart(product))
    setTimeout(() => {
      setCartIsAdded(true)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleRemoveFromCart = () => {
    setCartIsLoad(true)
    dispatch(removeCartProduct({ id, variant: variantValue }))
    setTimeout(() => {
      setCartIsAdded(false)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleAddToFavorites = () => {
    setFavoriteIsLoad(true)
    const product = {
      id,
      name,
      variant: variantValue,
      price: sizesData?.[variantValue] ?? defaultPrice,
      url,
    }
    dispatch(addProductToFavorite(product))
    setTimeout(() => {
      setFavoriteIsAdded(true)
      setFavoriteIsLoad(false)
    }, 1000)
  }

  const handleRemoveFromFavorites = () => {
    setFavoriteIsLoad(true)
    dispatch(removeFavoriteProduct({ id, variant: variantValue }))
    setTimeout(() => {
      setFavoriteIsAdded(false)
      setFavoriteIsLoad(false)
    }, 1000)
  }

  return (
    <div data-product-card className="product-list__card product-card">
      {regalia.length > 0 && (
        <RegaliaList regalia={regalia} discount={discount} />
      )}

      <a href={url || '/'} className="product-card__link">
        <img
          className="product-card__image"
          src={
            (img && `/img/catalog/${img}.webp`) || '/img/catalog/not-found.jpg'
          }
          alt={name}
        />
        <span className="product-card__more">Подробнее</span>
      </a>
      <div className="product-card__title">{name}</div>

      <DescriptionTemplate
        variantValue={variantValue}
        setVariantValue={setVariantValue}
        cardData={cardData}
      />
      <div className="product-card__bottom">
        <PriceBlock
          price={sizesData?.[variantValue] ?? defaultPrice}
          discount={discount}
        />
        <div className="product-card__added">
          <button type="button" className="product-card__click">
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
        <div data-add-buttons className="product-card__buttons">
          <button
            type="button"
            onClick={
              favoriteIsAdded ? handleRemoveFromFavorites : handleAddToFavorites
            }
            className={`product-card__favorite ${favoriteIsLoad && 'load load--mini'} ${favoriteIsAdded && 'added'}`}
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#heart" />
            </svg>
          </button>
          <button
            type="button"
            onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
            disabled={cartIsLoad}
            className={`button product-card__button ${cartIsLoad && 'load'} ${cartIsAdded && 'added'}`}
          >
            <span>
              <img src="/img/icons/availability.svg" alt="Availability" />
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
