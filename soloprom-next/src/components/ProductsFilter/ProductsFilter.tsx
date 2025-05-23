'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  FilteredBlockDataList,
  FilterMethodsTypes,
  FilterTabsCategory,
} from '@/types/products.types'
import { ProductsFilterBody } from './ProductsFilterBody'
import { generateFilterData } from '@/app/catalog/[categoryUrl]/server'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

interface Props {
  className?: string
  initialFilteredList: FilteredBlockDataList
  filterMethods: FilterMethodsTypes
  initActiveCategory: 'tires' | 'battery'
  tabsCategories: FilterTabsCategory[]
  mode: 'link' | 'list'
}

export const ProductsFilter: React.FC<Props> = React.memo(
  ({
    className,
    initialFilteredList,
    filterMethods,
    initActiveCategory,
    tabsCategories,
    mode,
  }) => {
    const {
      setFiltersOptions,
      setProductCount,
      setDynamicFilteredList,
      filtersOptions,
      setFilters,
      setListShow,
      setFiltersProducts,
      setSearchQuery,
    } = useProductsFilterStore()

    const [activeCategoryTab, setActiveCategoryTab] = useState<
      'tires' | 'battery'
    >(initActiveCategory)
    const [dynamicFilters, setDynamicFilters] =
      useState<FilteredBlockDataList>(initialFilteredList)

    const generateDynamicFilters = useCallback(async () => {
      if (filtersOptions.length) {
        const generatedFilters = generateFilterData(filtersOptions)

        const updatedFilters = {
          tires: {
            brands: [],
            countries: [],
            sizes: [],
            types: [],
            radiuses: [],
          },
          battery: {
            brands: [],
            container: [],
            plates: [],
            countries: [],
            models: [],
            sizes: [],
            types: [],
            voltage: [],
          },
        } as FilteredBlockDataList

        if (activeCategoryTab === 'tires') {
          updatedFilters.tires = {
            brands: generatedFilters.brands || [],
            countries: generatedFilters.countries || [],
            sizes: generatedFilters.sizes || [],
            types: generatedFilters.types || [],
            radiuses: generatedFilters.radiuses || [],
          }
        } else if (activeCategoryTab === 'battery') {
          updatedFilters.battery = {
            brands: generatedFilters.brands || [],
            container: generatedFilters.container || [],
            plates: generatedFilters.plates || [],
            countries: generatedFilters.countries || [],
            models: generatedFilters.models || [],
            sizes: generatedFilters.sizes || [],
            types: generatedFilters.types || [],
            voltage: generatedFilters.voltage || [],
          }
        }

        setDynamicFilters(updatedFilters)
      }
    }, [filtersOptions, activeCategoryTab, initialFilteredList])

    useEffect(() => {
      generateDynamicFilters()
    }, [generateDynamicFilters])

    const handleResetFilters = () => {
      setFilters({})
      setListShow(false)
      setFiltersProducts([])
      setFiltersOptions([])
      setProductCount(0)
      setDynamicFilters(initialFilteredList)
      setDynamicFilteredList(initialFilteredList)
      setSearchQuery('')
    }

    return (
      <ProductsFilterBody
        filteredList={dynamicFilters}
        handleResetFilters={handleResetFilters}
        activeCategoryTab={activeCategoryTab}
        setActiveCategoryTab={setActiveCategoryTab}
        filterMethods={filterMethods}
        initActiveCategory={initActiveCategory}
        tabsCategories={tabsCategories}
        mode={mode}
      />
    )
  },
)
