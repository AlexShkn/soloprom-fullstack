'use client'

import React from 'react'
import { ProductFilterDropdown } from '../ProductFilterDropdown'
import { FilteredBlockDataList } from '@/types/products.types'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'
import { FilterBottomNav } from '../FilterBottomNav'

interface Props {
  filteredList: FilteredBlockDataList
  handleFilterChange: (label: string, values: string[]) => void
  handleResetFilters: () => void
  handleClickShowButton: () => void
  activeCategoryTab: 'tires' | 'battery'
  mode: 'list' | 'link'
}

export const TiresByCharacteristicsFilter: React.FC<Props> = ({
  filteredList,
  handleFilterChange,
  handleResetFilters,
  handleClickShowButton,
  activeCategoryTab,
  mode,
}) => {
  const { filters } = useProductsFilterStore()

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
        {/* Тип */}
        {filteredList?.tires?.types?.length ? (
          <ProductFilterDropdown
            label="Тип шины"
            options={filteredList.tires.types}
            selectedOptions={(filters.productType as string[]) || []}
            onChange={(values) => handleFilterChange('productType', values)}
            filterKey="productType"
          />
        ) : (
          ''
        )}

        {/* Sizes Filter */}
        {filteredList?.tires?.sizes?.length ? (
          <ProductFilterDropdown
            label="Размерность"
            options={filteredList.tires.sizes}
            selectedOptions={(filters.defaultSize as string[]) || []}
            onChange={(values) => handleFilterChange('defaultSize', values)}
            filterKey="defaultSize"
          />
        ) : (
          ''
        )}
        {/* Радиус */}
        {filteredList?.tires?.radiuses?.length ? (
          <ProductFilterDropdown
            label="Радиус"
            options={filteredList.tires.radiuses}
            selectedOptions={(filters.size as string[]) || []}
            onChange={(values) => handleFilterChange('size', values)}
            filterKey="size"
          />
        ) : (
          ''
        )}
        {/* Brands Filter */}
        {filteredList?.tires?.brands?.length ? (
          <ProductFilterDropdown
            label="По бренду шин"
            options={filteredList.tires.brands}
            selectedOptions={(filters.brandName as string[]) || []}
            onChange={(values) => handleFilterChange('brandName', values)}
            filterKey="brandName"
          />
        ) : (
          ''
        )}
        {/* Страны */}
        {filteredList?.tires?.countries?.length ? (
          <ProductFilterDropdown
            label="Страна производитель"
            options={filteredList.tires.countries}
            selectedOptions={(filters.country as string[]) || []}
            onChange={(values) => handleFilterChange('country', values)}
            filterKey="country"
          />
        ) : (
          ''
        )}
      </div>
      <FilterBottomNav
        handleClickShowButton={handleClickShowButton}
        handleResetFilters={handleResetFilters}
        activeCategoryTab={activeCategoryTab}
        mode={mode}
      />
    </div>
  )
}
