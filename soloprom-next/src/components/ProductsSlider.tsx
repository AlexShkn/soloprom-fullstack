'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPopularProducts } from '@/api/products'
import { CardDataProps } from '@/types/products.types'
import { ProductListSlider } from './ProductListSlider/ProductListSlider'

interface Props {
  categoryName: string
  title: string
}

export const ProductsSlider: React.FC<Props> = ({ title, categoryName }) => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['popularProducts'],
    queryFn: getPopularProducts,
    staleTime: 60000,
  })

  const filteredProducts: CardDataProps[] = products
    ? products.filter(
        (product: CardDataProps) => product.categoryName === categoryName,
      )
    : []

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (error) {
    console.error('Error fetching products:', error)
    return <p>Error loading products.</p>
  }

  return filteredProducts.length ? (
    <section className="section-offset">
      <div className="list__container">
        <h2 className="section-title">{title}</h2>
        <ProductListSlider listData={filteredProducts} />
      </div>
    </section>
  ) : (
    ''
  )
}
