'use client'
import { findNotFoundId } from '@/api/products'
import { CardDataProps } from '@/types/products.types'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Loading } from './ui'
import { ProductListSlider } from './ProductListSlider/ProductListSlider'

interface Props {
  className?: string
}

export const SimilarProducts: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<CardDataProps[]>({
    queryKey: ['similarProducts', productId],
    queryFn: async () => {
      if (!productId) return []
      try {
        const result = await findNotFoundId(productId)
        return result
      } catch (error) {
        console.error('Ошибка при получении похожих товаров:', error)
        throw error
      }
    },
    enabled: !!productId,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="py-8">
        <Loading spinClasses="w-10 h-10" />
      </div>
    )
  }

  if (isError) {
    return <p>Ошибка при загрузке похожих товаров.</p>
  }

  return (
    <>
      {products?.length ? (
        <section className="section-offset">
          <div className="list__container">
            <h2 className="section-title">Возможно Вам подойдет</h2>
            <ProductListSlider listData={products} />
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}
