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

export const BatteryByCharacteristicsFilter: React.FC<Props> = ({
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
        {/* Brands Filter */}
        {filteredList?.battery?.brands?.length ? (
          <ProductFilterDropdown
            label="Бренды"
            options={filteredList.battery.brands}
            selectedOptions={(filters.brandName as string[]) || []}
            onChange={(values) => handleFilterChange('brandName', values)}
            filterKey="brandName"
          />
        ) : (
          ''
        )}

        {/* Sizes Filter */}
        {filteredList?.battery?.sizes?.length ? (
          <ProductFilterDropdown
            label="Размеры"
            options={filteredList.battery.sizes}
            selectedOptions={(filters.defaultSize as string[]) || []}
            onChange={(values) => handleFilterChange('defaultSize', values)}
            filterKey="defaultSize"
          />
        ) : (
          ''
        )}

        {/* container Filter */}
        {filteredList?.battery?.container?.length ? (
          <ProductFilterDropdown
            label="Емкость Ah"
            options={filteredList.battery.container}
            selectedOptions={(filters.container as string[]) || []}
            onChange={(values) => handleFilterChange('container', values)}
            filterKey="container"
          />
        ) : (
          ''
        )}
        {filteredList?.battery?.plates?.length ? (
          <ProductFilterDropdown
            label="Тип пластин"
            options={filteredList.battery.plates}
            selectedOptions={(filters.plates as string[]) || []}
            onChange={(values) => handleFilterChange('plates', values)}
            filterKey="plates"
          />
        ) : (
          ''
        )}
        {/* voltage Filter */}
        {filteredList?.battery?.voltage?.length ? (
          <ProductFilterDropdown
            label="Напряжение В"
            options={filteredList.battery.voltage}
            selectedOptions={(filters.voltage as string[]) || []}
            onChange={(values) => handleFilterChange('voltage', values)}
            filterKey="voltage"
          />
        ) : (
          ''
        )}

        {/* Тип */}
        {filteredList?.battery?.types ? (
          <ProductFilterDropdown
            label="Тип"
            options={filteredList.battery.types}
            selectedOptions={(filters.productType as string[]) || []}
            onChange={(values) => handleFilterChange('productType', values)}
            filterKey="productType"
          />
        ) : (
          ''
        )}

        {/* Страны */}
        {filteredList?.battery?.countries?.length ? (
          <ProductFilterDropdown
            label="Страны"
            options={filteredList.battery.countries}
            selectedOptions={(filters.country as string[]) || []}
            onChange={(values) => handleFilterChange('country', values)}
            filterKey="country"
          />
        ) : (
          ''
        )}

        {/* Модели */}
        {filteredList?.battery?.models?.length ? (
          <ProductFilterDropdown
            label="Модели техники"
            options={filteredList.battery.models}
            selectedOptions={(filters.models as string[]) || []}
            onChange={(values) => handleFilterChange('models', values)}
            filterKey="models"
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
