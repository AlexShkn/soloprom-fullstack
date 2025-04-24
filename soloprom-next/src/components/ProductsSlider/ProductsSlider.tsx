'use client'
import React, { useEffect, useState } from 'react'

import { getPopularProducts } from '../../api/products'
import { CardDataProps } from '@/types/products.types'

import { ProductListSlider } from '../ProductListSlider/ProductListSlider'

interface Props {
  categoryName: string
  title: string
}

export const ProductsSlider: React.FC<Props> = ({ title, categoryName }) => {
  const [isReady, setIsReady] = useState(false)

  const [favoriteData, setFavoriteData] = useState<CardDataProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true)
        const response = await getPopularProducts()

        const formattedProducts = response.filter(
          (product: CardDataProps) => product.categoryName === categoryName,
        )

        setFavoriteData(formattedProducts)
      } catch (err) {
        console.error('Не удалось получить данные')
      } finally {
        setLoading(false)
      }
    }

    fetchPopularProducts()
  }, [])

  return favoriteData.length ? (
    <section className="section-offset">
      <div className="list__container">
        <h2 className="section-title">{title}</h2>
        <ProductListSlider listData={favoriteData} />
      </div>
    </section>
  ) : (
    ''
  )
}
