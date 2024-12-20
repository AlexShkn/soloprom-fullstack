'use client'
import React from 'react'

import './DescriptionTemplate.scss'

import { ProductsCardProps } from '../ProductList/ProductList'

export const DescriptionTemplate: React.FC<ProductsCardProps> = ({
  cardData,
}) => {
  const { name, descr, type, brand, country, sizes, volumes } = cardData
  return (
    <div className="product-card__descr-list">
      <div className="product-card__descr-item">
        <div className="product-card__descr-item-name">Бренд</div>
        <div className="product-card__descr-item-value">{brand || 'N/A'}</div>
      </div>
      <div className="product-card__descr-item">
        <div className="product-card__descr-item-name">Производитель</div>
        <div className="product-card__descr-item-value">{country || 'N/A'}</div>
      </div>
      <div className="product-card__descr-item">
        <div className="product-card__descr-item-name">Размерность</div>
        <div data-sizes className="product-card__descr-item-value">
          {/* {sizes || 'N/A'} */}
        </div>
      </div>
      <div className="product-card__descr-item">
        <div className="product-card__descr-item-name">Тип шины</div>
        <div className="product-card__descr-item-value">{type || 'N/A'}</div>
      </div>
    </div>
  )
}
