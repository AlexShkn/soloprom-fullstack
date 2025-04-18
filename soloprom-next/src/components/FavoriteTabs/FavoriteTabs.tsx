'use client'
import React, { useState } from 'react'
import { ProductListSlider } from '../ProductListSlider/ProductListSlider'
import { FavoriteList } from '@/types/products.types'

interface FavoriteTabsProps {
  initialData: FavoriteList
}

export const productTypes = [
  { name: 'Шины', type: 'tires' },
  { name: 'АКБ', type: 'battery' },
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
                className={`border-1 flex cursor-pointer items-center gap-2 rounded-custom border border-[#d1d1d1] px-5 py-4 text-center font-medium ${
                  caption.type === currantTab ? 'bg-hoverBlue text-white' : ''
                }`}
              >
                <svg
                  className={`h-5 w-5 ${caption.type === currantTab ? 'fill-white' : 'fill-darkBlue'}`}
                >
                  <use
                    xlinkHref={`/img/sprite.svg#catalog-${caption.type}`}
                  ></use>
                </svg>
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
