'use client'
import React, { useEffect, useState } from 'react'

import './FavoriteTabs.scss'
import { getPopularProducts } from '@/app/api/products/products'
import { ProductListSlider } from '../ProductListSlider/ProductListSlider'

export interface cardDataProps {
  productId: string
  url: string
  categoryName: string
  name: string
  descr: string
  img: string
  groups: string[]
  delivery: string
  sizes?: { [size: string]: number | undefined }
  defaultPrice: number
  volumes?: { [size: string]: number | undefined }
  models?: string[]
  productType: string
  brand: string
  country: string
  size?: string
  load_index?: string
  weight?: string
  voltage?: string
  viscosity?: string
  container?: string
  plates?: string
  discount?: number
  regalia?: string[]
  isPopular?: boolean
}

interface FavoriteList {
  tires: cardDataProps[]
  battery: cardDataProps[]
  oils: cardDataProps[]
}

export interface ProductsCardProps {
  cardData: cardDataProps
}

const productTypes = [
  { name: 'Шины', type: 'tires' },
  { name: 'Аккумуляторы', type: 'battery' },
  { name: 'Масла', type: 'oils' },
]

export const FavoriteTabs: React.FC = () => {
  const [currantTab, setCurrantTab] = useState<'tires' | 'battery' | 'oils'>(
    'tires',
  )
  const [favoriteData, setFavoriteData] = useState<FavoriteList>({
    tires: [],
    battery: [],
    oils: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true)
        const response = await getPopularProducts()

        const formattedProducts: FavoriteList = {
          tires: response.data.filter(
            (product: cardDataProps) => product.categoryName === 'tires',
          ),
          battery: response.data.filter(
            (product: cardDataProps) => product.categoryName === 'battery',
          ),
          oils: response.data.filter(
            (product: cardDataProps) => product.categoryName === 'oils',
          ),
        }

        setFavoriteData(formattedProducts)
      } catch (err) {
        console.error('Не удалось получить данные')
      } finally {
        setLoading(false)
      }
    }

    fetchPopularProducts()
  }, [])

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
                className={`favorite-tabs__caption border-1 cursor-pointer rounded border border-[#d1d1d1] px-5 py-4 text-center font-medium ${caption.type === currantTab && 'active'}`}
              >
                {caption.name}
              </div>
            ))}
          </div>
          <div>
            {productTypes.map((category) => (
              <div
                key={category.type}
                className={` ${category.type === currantTab ? 'block' : 'hidden'}`}
              >
                <ProductListSlider listData={favoriteData[currantTab]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
