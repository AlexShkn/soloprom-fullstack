'use client'
import React, { useMemo } from 'react'
import { useFavoriteStore } from '@/store/useFavoriteStore'

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { FavoriteCard } from './FavoriteCard'

import { CartHeader } from '../Cart/CartHeader'

export const Favorite: React.FC = () => {
  const { favoriteState } = useFavoriteStore()
  const MemoizedFavoriteCard = useMemo(() => React.memo(FavoriteCard), [])

  return (
    <div className="cart inner-container">
      <BreadCrumbs />
      <CartHeader title="Избранное" />
      <div className="border-t-1-grayColor border-b-1-grayColor mb-12 flex flex-col gap-5">
        {favoriteState.length ? (
          favoriteState.map((product) => (
            <MemoizedFavoriteCard
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
  )
}
