'use client'
import React, { useEffect, useState } from 'react'

import { CardDataProps } from '@/types/products.types'
import { useFavoriteStore } from '@/store/useFavoriteStore'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  cardData: CardDataProps
  children?: React.ReactNode
  svgSize?: string
}

export const FavoriteButton: React.FC<Props> = ({
  className,
  cardData,
  children,
  svgSize,

  ...props
}) => {
  const [favoriteIsAdded, setFavoriteIsAdded] = useState(false)
  const { favoriteState, removeFavoriteProduct, addProductToFavorite } =
    useFavoriteStore()
  const {
    productId,
    url,
    name,
    img,
    categoryName,
    defaultPrice,
    defaultSize,
    productType,
  } = cardData

  useEffect(() => {
    setFavoriteIsAdded(favoriteState.some((item) => item.storeId === productId))
  }, [favoriteState])

  const handleAddToFavorites = () => {
    const product = {
      productId,
      name,
      price: defaultPrice,
      size: defaultSize,
      url,
      img,
      productType,
      categoryName,
    }
    addProductToFavorite(product)
    setFavoriteIsAdded(true)
  }

  const handleRemoveFromFavorites = () => {
    removeFavoriteProduct(productId)
    setFavoriteIsAdded(false)
  }
  return (
    <button
      type="button"
      aria-label="добавить товар в избранное"
      onClick={
        favoriteIsAdded ? handleRemoveFromFavorites : handleAddToFavorites
      }
      className={`action-button ${className} ${favoriteIsAdded && 'added'}`}
      {...props}
    >
      <span className="icon-wrapper">
        <svg className={`icon ${svgSize} fill-accentBlue transition-colors`}>
          <use xlinkHref="/img/sprite.svg#heart" />
        </svg>
      </span>

      {children ? <span>{children}</span> : ''}
    </button>
  )
}
