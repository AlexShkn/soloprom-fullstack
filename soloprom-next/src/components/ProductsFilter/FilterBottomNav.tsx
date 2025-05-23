'use client'
import React from 'react'
import { ShowProductsButton } from './ShowProductsButton'
import { FilterResetButton } from './FilterResetButton'
import { SideSheet } from '../SideSheet'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

interface Props {
  mode: 'link' | 'list'
  activeCategoryTab: 'tires' | 'battery'
  handleClickShowButton: () => void
  handleResetFilters: () => void
}

export const FilterBottomNav: React.FC<Props> = ({
  handleClickShowButton,
  handleResetFilters,
  activeCategoryTab,
  mode,
}) => {
  const { isLoading, productCount, listShow } = useProductsFilterStore()
  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-2.5 md:flex-row">
      <div className="flex items-center gap-2">
        {!listShow && (
          <ShowProductsButton
            clickButton={handleClickShowButton}
            activeCategoryTab={activeCategoryTab}
            totalCount={productCount}
            isLoading={isLoading}
            mode={mode}
          />
        )}

        <FilterResetButton onReset={handleResetFilters} />
      </div>

      <SideSheet />
    </div>
  )
}
