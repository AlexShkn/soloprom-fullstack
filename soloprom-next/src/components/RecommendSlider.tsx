'use client'
import React from 'react'

import { CardDataProps } from '@/types/products.types'

import { ProductListSlider } from './ProductListSlider/ProductListSlider'

interface Props {
  data: CardDataProps[]
}

export const RecommendSlider: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data?.length ? (
        <section className="section-offset">
          <div className="list__container">
            <h2 className="section-title">Похожие товары</h2>
            <ProductListSlider listData={data} mod={'grid'} />
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}
