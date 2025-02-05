'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useFavoriteStore } from '@/store/favoriteStore'

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { FavoriteCard } from './FavoriteCard'

import '../Cart/Cart.scss'

export const Favorite: React.FC = () => {
  const { favoriteState } = useFavoriteStore()

  return (
    <>
      <div className="cart inner-container">
        <BreadCrumbs />
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-[clamp(1.375rem,0.7816rem+1.978vw,2.5rem)] font-bold">
            Избранное
          </h1>
          <Link
            href="/"
            className="mds:text-base mds:gap-2.5 group inline-flex items-center gap-1 text-sm transition-colors hover:text-hoverBlue"
          >
            <svg className="mds:h-5 mds:w-5 h-4 w-4 fill-darkBlue transition-colors group-hover:fill-hoverBlue">
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
            <div className="page-container flex justify-center py-10 text-2xl font-medium">
              Список пуст
            </div>
          )}
        </div>
      </div>
    </>
  )
}
