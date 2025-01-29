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
      <div className="cart inner-container">
        <BreadCrumbs />
        <div className="mb-10 flex items-center justify-between">
          <h1 className="cart__title font-bold">Избранное</h1>
          <Link
            href="/"
            className="cart__back-link inline-flex items-center gap-2.5 transition-colors"
          >
            <svg className="h-5 w-5 fill-darkBlue transition-colors">
              <use xlinkHref="/img/sprite.svg#back-arrow"></use>
            </svg>
            Вернуться к покупкам
          </Link>
        </div>
        <div className="border-t-1-grayColor border-b-1-grayColor mb-12 flex flex-col gap-5">
          {favoriteState.length ? (
            favoriteState.map((product) => (
              <FavoriteCard
                key={product.productId + product.variant}
                product={product}
              />
            ))
          ) : (
            <div className="cart__item cart__item--empty page-container flex justify-center py-10 text-2xl font-medium">
              Список пуст
            </div>
          )}
        </div>
      </div>
    </>
  )
}
