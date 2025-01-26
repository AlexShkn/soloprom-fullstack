'use client'
import React from 'react'
import { ProductListSlider } from '../ProductListSlider/ProductListSlider'
import { productTypes } from './FavoriteTabs'
import { FavoriteList } from '@/types/products.types'

interface FavoriteTabsContentProps {
  currantTab: 'tires' | 'battery' | 'oils'
  favoriteData: FavoriteList
}

export const FavoriteTabsContent: React.FC<FavoriteTabsContentProps> = ({
  currantTab,
  favoriteData,
}) => {
  return (
    <div>
      {productTypes.map((category) => (
        <div
          key={category.type}
          className={`${category.type === currantTab ? 'block' : 'hidden'}`}
        >
          <ProductListSlider listData={favoriteData[currantTab]} />
        </div>
      ))}
    </div>
  )
}
