'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ProductFilterDropdown } from '../ProductFilterDropdown'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'
import { BatteriesOptionsTypes, getBatteriesOptions } from '@/api/products'
import { FiltersState } from '@/types/products.types'
import { FilterBottomNav } from '../FilterBottomNav'

interface Props {
  handleResetFilters: () => void
  handleClickShowButton: () => void
  activeCategoryTab: 'tires' | 'battery'
  mode: 'list' | 'link'
}

export const BatteryByCarFilter: React.FC<Props> = ({
  handleResetFilters,
  handleClickShowButton,
  activeCategoryTab,
  mode,
}) => {
  const { setIsLoading, setProductCount, setFilters, listShow } =
    useProductsFilterStore()
  const [options, setOptions] = useState<BatteriesOptionsTypes | null>(null)
  const [initialOptions, setInitialOptions] =
    useState<BatteriesOptionsTypes | null>(null)
  const [internalFilters, setInternalFilters] = useState<FiltersState | null>(
    null,
  )

  useEffect(() => {
    setProductCount(0)

    const fetchOptions = async () => {
      setIsLoading(true)

      try {
        const data = await getBatteriesOptions()

        console.log(data.options)

        setOptions(data.options)
        setInitialOptions(data.options)
      } catch (err: any) {
        console.error('Failed to fetch options:', err)
        setOptions(null)
      } finally {
        setIsLoading(false)
      }
    }
    handleResetFilters()
    fetchOptions()
  }, [])

  const handleResetInnerFilters = () => {
    setInternalFilters({})
    setOptions(initialOptions)
    handleResetFilters()
  }

  const getOptionsList = async (newFilters: FiltersState) => {
    setIsLoading(true)

    try {
      const newOptions = await getBatteriesOptions(newFilters)

      if (Object.keys(newFilters).length) {
        setFilters({
          voltage: newOptions.options.voltage,
          container: newOptions.options.container,
          plates: newOptions.options.plates,
          defaultSize: newOptions.options.defaultSize,
        })
      }

      setOptions(newOptions.options)
      console.log(newOptions.totalCount)

      setProductCount(newOptions.totalCount)
    } catch (error) {
      console.log('Ошибка получения опций', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = useCallback(
    (label: string, values: string[] | string | undefined) => {
      const newFilters: FiltersState = { ...internalFilters }

      if (Array.isArray(values) && values.length > 0) {
        newFilters[label] = values
      } else if (typeof values === 'string' && values.length > 0) {
        newFilters[label] = values
      } else {
        delete newFilters[label]
      }

      newFilters.categoryName = 'battery'

      setInternalFilters(newFilters)
      getOptionsList(newFilters)
    },
    [internalFilters, setInternalFilters, getOptionsList],
  )

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
        {options === null && (
          <div className="text-darkBlue">Данные для фильтров пусты</div>
        )}
        {options?.vehicleType?.length ? (
          <ProductFilterDropdown
            label="Тип техники"
            options={options.vehicleType}
            selectedOptions={(internalFilters?.vehicleType as string[]) || []}
            onChange={(values) => handleFilterChange('vehicleType', values)}
            filterKey="vehicleTypes"
          />
        ) : (
          ''
        )}
        {options?.brand?.length ? (
          <ProductFilterDropdown
            label="Марка"
            options={options.brand}
            selectedOptions={(internalFilters?.brand as string[]) || []}
            onChange={(values) => handleFilterChange('brand', values)}
            filterKey="brands"
          />
        ) : (
          ''
        )}
        {options?.model?.length ? (
          <ProductFilterDropdown
            label="Модель"
            options={options.model}
            selectedOptions={(internalFilters?.model as string[]) || []}
            onChange={(values) => handleFilterChange('model', values)}
            filterKey="models"
          />
        ) : (
          ''
        )}
        {options?.voltage?.length ? (
          <ProductFilterDropdown
            label="Напряжение В"
            options={options.voltage}
            selectedOptions={(internalFilters?.voltage as string[]) || []}
            onChange={(values) => handleFilterChange('voltage', values)}
            filterKey="voltage"
          />
        ) : (
          ''
        )}
        {options?.defaultSize?.length ? (
          <ProductFilterDropdown
            label="Размер ДхШхВ мм."
            options={options.defaultSize}
            selectedOptions={(internalFilters?.defaultSize as string[]) || []}
            onChange={(values) => handleFilterChange('defaultSize', values)}
            filterKey="defaultSize"
          />
        ) : (
          ''
        )}
        {options?.plates?.length ? (
          <ProductFilterDropdown
            label="Тип пластин"
            options={options.plates}
            selectedOptions={(internalFilters?.plates as string[]) || []}
            onChange={(values) => handleFilterChange('plates', values)}
            filterKey="plates"
          />
        ) : (
          ''
        )}
        {options?.container?.length ? (
          <ProductFilterDropdown
            label="Емкость Ah"
            options={options.container}
            selectedOptions={(internalFilters?.container as string[]) || []}
            onChange={(values) => handleFilterChange('container', values)}
            filterKey="container"
          />
        ) : (
          ''
        )}
      </div>
      <FilterBottomNav
        handleClickShowButton={handleClickShowButton}
        handleResetFilters={handleResetInnerFilters}
        activeCategoryTab={activeCategoryTab}
        mode={mode}
      />
    </div>
  )
}
