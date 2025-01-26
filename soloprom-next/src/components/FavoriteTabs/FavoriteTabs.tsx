'use client'
import React, { useState } from 'react'
import './FavoriteTabs.scss'
import { ProductListSlider } from '../ProductListSlider/ProductListSlider'
import { FavoriteList } from '@/types/products.types'

interface FavoriteTabsProps {
  initialData: FavoriteList
}

export const productTypes = [
  { name: 'Шины', type: 'tires' },
  { name: 'Аккумуляторы', type: 'battery' },
  { name: 'Масла', type: 'oils' },
]

export const FavoriteTabs: React.FC<FavoriteTabsProps> = ({ initialData }) => {
  const [currantTab, setCurrantTab] = useState<'tires' | 'battery' | 'oils'>(
    'tires',
  )

  return (
    <section className="favorite-tabs section-offset">
      <div className="favorite-tabs__container">
        <h2 className="section-title">Популярные товары</h2>
        <div>
          <div className="mb-2.5 flex items-center gap-4 overflow-x-auto">
            {productTypes.map((caption) => (
              <div
                onClick={() =>
                  setCurrantTab(caption.type as 'tires' | 'battery' | 'oils')
                }
                key={caption.type}
                className={`favorite-tabs__caption border-1 cursor-pointer rounded border border-[#d1d1d1] px-5 py-4 text-center font-medium ${
                  caption.type === currantTab ? 'active' : ''
                }`}
              >
                {caption.name}
              </div>
            ))}
          </div>
          <div>
            <ProductListSlider listData={initialData[currantTab]} />
          </div>
        </div>
      </div>
    </section>
  )
}
