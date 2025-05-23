'use client'
import React, { useState } from 'react'
import { FavoriteList } from '@/types/products.types'
import { productTypes, ProductsCategory } from '@/supports/adaptiveDto'
import { ProductListSlider } from '../ProductListSlider/ProductListSlider'
import { Button } from '../ui'

interface FavoriteTabsProps {
  initialData: FavoriteList
}

export const FavoriteTabs: React.FC<FavoriteTabsProps> = ({ initialData }) => {
  const [currantTab, setCurrantTab] = useState<ProductsCategory>(
    ProductsCategory.TIRES,
  )

  return (
    <section className="favorite-tabs section-offset">
      <div className="favorite-tabs__container">
        <h2 className="section-title">Популярные товары</h2>
        <div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mds:gap-4">
            {productTypes.map((caption) => (
              <Button
                type="button"
                variant={caption.type === currantTab ? 'default' : 'outline'}
                aria-label="выбор категории"
                onClick={() => setCurrantTab(caption.type as ProductsCategory)}
                key={caption.type}
                className={`w-auto gap-2 border border-[#d1d1d1] px-5 py-5 leading-none`}
              >
                <svg
                  className={`h-5 w-5 ${caption.type === currantTab ? 'fill-white' : 'fill-darkBlue'}`}
                >
                  <use
                    xlinkHref={`/img/sprite.svg#catalog-${caption.type}`}
                  ></use>
                </svg>
                {caption.name}
              </Button>
            ))}
          </div>
          <div>
            {Object.keys(initialData).map((categoryKey) => {
              const category = categoryKey as ProductsCategory
              const isActive = category === currantTab

              return (
                <div
                  key={category}
                  style={{ display: isActive ? 'block' : 'none' }}
                >
                  <ProductListSlider
                    listData={initialData[category]}
                    id={category}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
