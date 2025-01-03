'use client'
import React from 'react'

import './ProductPageBenefits.scss'

interface Props {
  className?: string
}

export const ProductPageBenefits: React.FC<Props> = ({ className }) => {
  return (
    <div className="product-page-benefits">
      <div className="product-page-benefits__container">
        <ul className="product-page-benefits__list">
          <li className="product-page-benefits__item">
            <img src="/img/icons/delivery-best.svg" alt="" />
            Удобная доставка
          </li>
          <li className="product-page-benefits__item">
            <img src="/img/icons/kachestvo.svg" alt="" />
            Гарантия качества
          </li>
          <li className="product-page-benefits__item">
            <img src="/img/icons/best-prices.svg" alt="" />
            Доступные цены
          </li>
        </ul>
      </div>
    </div>
  )
}
