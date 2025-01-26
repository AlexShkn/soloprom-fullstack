'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useFavoriteStore } from '@/zustand/favoriteStore'

import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { FavoriteCard } from './FavoriteCard'

import '../Cart/Cart.scss'

export const Favorite: React.FC = () => {
  const favoriteState = useFavoriteStore((state) => state.favoriteState)

  return (
    <>
      <div className="cart__inner-container">
        <BreadCrumbs />
        <div className="cart__head">
          <h1 className="cart__title">Избранное</h1>
          <Link href="/" className="cart__back-link">
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#back-arrow"></use>
            </svg>
            Вернуться к покупкам
          </Link>
        </div>
        <div className="cart__list">
          {favoriteState.length ? (
            favoriteState.map((product) => (
              <FavoriteCard
                key={product.productId + product.variant}
                product={product}
              />
            ))
          ) : (
            <div className="cart__item cart__item--empty">Список пуст</div>
          )}
        </div>
      </div>
    </>
  )
}
