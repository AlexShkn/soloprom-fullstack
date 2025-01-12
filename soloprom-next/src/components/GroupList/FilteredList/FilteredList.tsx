// FilteredList.tsx
'use client'
import React from 'react'

import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import { cardDataProps } from '@/types/products.types'

interface Props {
  data: cardDataProps[]
  currentPage: number
  totalPages: number
  onChangePage: (newPage: number) => void
}

export const FilteredList: React.FC<Props> = ({
  data,
  currentPage,
  totalPages,
  onChangePage,
}) => {
  return (
    <div className="filter__catalog">
      <ul className="group-list__catalog-list">
        {data.map((item) => (
          <ProductsCard key={item.productId} cardData={item} mod="mini" />
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination flex justify-center gap-5 py-5">
          <button
            disabled={currentPage === 1}
            onClick={() => onChangePage(currentPage - 1)}
          >
            Назад
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onChangePage(currentPage + 1)}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  )
}
