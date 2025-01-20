'use client'
import React from 'react'

import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import { cardDataProps } from '@/types/products.types'
import { Pagination } from '../Pagination'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Sort } from '../Sort'
import { ViewSetting } from '../ViewSetting'
import { DynamicPagination } from '../DynamicPagination'

interface Props {
  data: cardDataProps[]
  currentPage: number
  dynamicCurrentPage: number
  totalPages: number
  setDynamicCurrentPage: (newPage: number) => void
  onChangePage: (newPage: number) => void
  onSortChange: (sort: string) => void
  hasFilters: boolean
  dataIsLoading: boolean
}

export const FilteredList: React.FC<Props> = ({
  data,
  currentPage,
  totalPages,
  onChangePage,
  dataIsLoading,
  onSortChange,
  hasFilters,
  setDynamicCurrentPage,
  dynamicCurrentPage,
}) => {
  return (
    <div className="filter__catalog">
      <div className="mx-5 mb-5 flex items-center justify-between gap-5">
        <Sort onSortChange={onSortChange} />
        <ViewSetting />
      </div>
      <ul className="group-list__catalog-list">
        {dataIsLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} width={'100%'} height={'320px'} />
            ))
          : data.map((item) => (
              <ProductsCard key={item.productId} cardData={item} mod="mini" />
            ))}
      </ul>
      {totalPages > 1 && !dataIsLoading && !hasFilters && (
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalPages={totalPages}
        />
      )}
      {totalPages > 1 && !dataIsLoading && hasFilters && (
        <DynamicPagination
          currentPage={dynamicCurrentPage}
          setDynamicCurrentPage={setDynamicCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
