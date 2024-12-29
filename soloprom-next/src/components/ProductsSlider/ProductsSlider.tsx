'use client'
import React, { useEffect, useState } from 'react'

import { getPopularProducts } from '@/app/api/products/products'
import { cardDataProps } from '../FavoriteTabs/FavoriteTabs'

import { ProductListSlider } from '../ProductListSlider/ProductListSlider'

interface Props {
  categoryName: string
  title: string
}

export const ProductsSlider: React.FC<Props> = ({ title, categoryName }) => {
  const [isReady, setIsReady] = useState(false)

  const [favoriteData, setFavoriteData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true)
        const response = await getPopularProducts()

        const formattedProducts = response.data.filter(
          (product: cardDataProps) => product.categoryName === categoryName,
        )
        console.log(formattedProducts)

        setFavoriteData(formattedProducts)
      } catch (err) {
        console.error('Не удалось получить данные')
      } finally {
        setLoading(false)
        console.log(favoriteData)
      }
    }

    fetchPopularProducts()
  }, [])

  return (
    <section className="section-offset">
      <div className="list__container">
        <h2 className="section-title">{title}</h2>
        {favoriteData && <ProductListSlider listData={favoriteData} />}
      </div>
    </section>
  )
}
