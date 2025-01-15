'use client'
import React, { useState } from 'react'

import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import { cardDataProps } from '@/types/products.types'
import { Pagination } from '../Pagination'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Sort } from '../Sort'
import { ViewSetting } from '../ViewSetting'

interface Props {
  data: cardDataProps[]
  currentPage: number
  totalPages: number
  onChangePage: (newPage: number) => void
  onSortChange: (sort: string) => void

  dataIsLoading: boolean
}

export const FilteredList: React.FC<Props> = ({
  data,
  currentPage,
  totalPages,
  onChangePage,
  dataIsLoading,
  onSortChange,
}) => {
  return (
    <div className="filter__catalog">
      <div className="mx-5 mb-5 flex items-center justify-between gap-5">
        {dataIsLoading ? (
          <div className="grid w-full grid-cols-[60%_55px] items-center justify-between">
            <Skeleton width={'100%'} height={'40px'} />
            <Skeleton width={'52px'} height={'40px'} />
          </div>
        ) : (
          <>
            <Sort onSortChange={onSortChange} />
            <ViewSetting />
          </>
        )}
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
      {totalPages > 1 && !dataIsLoading && (
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
