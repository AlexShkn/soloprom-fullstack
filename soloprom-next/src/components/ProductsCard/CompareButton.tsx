'use client'
import { useCompareStore } from '@/store/useCompareStore'
import { CardDataProps, ProductCardData } from '@/types/products.types'
import React, { useEffect, useState } from 'react'

// import './CompareButton.scss'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  cardData: CardDataProps
  mod?: string
  children?: React.ReactNode
  svgSize?: string
}

export const CompareButton: React.FC<Props> = ({
  className,
  cardData,
  mod,
  children,
  svgSize,

  ...props
}) => {
  const [compareIsAdded, setCompareIsAdded] = useState(false)

  const { comparedItems, addToCompare, removeFromCompare } = useCompareStore()

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

  const productData: ProductCardData = {
    productId,
    name,
    price: defaultPrice,
    size: defaultSize,
    url,
    img,
    productType,
    categoryName,
  }

  const handleAddToCompare = () => {
    addToCompare(categoryName, productData)
    setCompareIsAdded(true)
  }

  const handleRemoveFromCompare = () => {
    removeFromCompare(categoryName, productId)
    setCompareIsAdded(false)
  }

  useEffect(() => {
    setCompareIsAdded(
      comparedItems[categoryName as keyof typeof comparedItems]?.some(
        (item) => item.productId === productId,
      ) || false,
    )
  }, [comparedItems])
  return (
    <button
      type="button"
      aria-label="добавить товар в сравнение"
      onClick={compareIsAdded ? handleRemoveFromCompare : handleAddToCompare}
      className={`action-button ${className} ${compareIsAdded && 'added'}`}
      {...props}
    >
      <span className="icon-wrapper">
        <svg className={`icon ${svgSize} fill-accentBlue transition-colors`}>
          <use xlinkHref="/img/sprite.svg#scales" />
        </svg>
      </span>
      {children ? <span>{children}</span> : ''}
    </button>
  )
}
