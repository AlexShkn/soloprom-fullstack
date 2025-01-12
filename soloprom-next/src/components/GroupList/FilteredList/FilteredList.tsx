'use client'
import React from 'react'

import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import { cardDataProps } from '@/types/products.types'

interface Props {
  data: cardDataProps[]
}

export const FilteredList: React.FC<Props> = ({ data }) => {
  return (
    <div className="filter__catalog">
      <ul className="group-list__catalog-list">
        {data.map((item) => (
          <ProductsCard key={item.productId} cardData={item} mod="mini" />
        ))}
      </ul>
    </div>
  )
}
