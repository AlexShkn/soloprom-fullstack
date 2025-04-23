'use client'
import React, { useEffect, useState } from 'react'

import { CardDataProps } from '@/types/products.types'

import { ProductListSlider } from '../ProductListSlider/ProductListSlider'

interface Props {
  data: CardDataProps[]
}

export const ViewedSlider: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data?.length ? (
        <section className="section-offset">
          <div className="list__container">
            <h2 className="section-title">Просмотренные товары</h2>
            <ProductListSlider listData={data} mod={'grid'} />
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}
