'use client'
import { FavoriteCard } from '@/components/Favorite/FavoriteCard'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import React from 'react'

interface Props {
  className?: string
}

export const ProfileFavorite: React.FC<Props> = ({ className }) => {
  const { favoriteState } = useFavoriteStore()

  return (
    <div className="flex flex-col gap-5">
      {favoriteState.length ? (
        favoriteState.map((product) => (
          <FavoriteCard key={product.storeId} product={product} />
        ))
      ) : (
        <div className="page-container flex justify-center py-10 text-2xl font-medium">
          Список пуст
        </div>
      )}
    </div>
  )
}
