'use client'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { FilterCheckbox } from './FilterCheckbox'
import { FilterInterval } from './FilterInterval'
import { FilterItem } from './FilterItem'
import { FilterList } from './FilterList'
import { transformJson } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { cardDataProps } from '@/types/products.types'
import { Filter } from 'lucide-react'

const pagesDataRaw = require('@/data/products/pagesData.json')
const transformData = transformJson(pagesDataRaw)

interface Props {
  productsType: string
  categoryName: string
  currentPage: number
  initialFilters?: Record<string, string[] | number>
  onFiltersChange: (filters: Record<string, string[] | number>) => void
  categoryInitialList: cardDataProps[] | null
  initialSearch?: string
}

const CatalogFilters: React.FC<Props> = ({
  productsType,
  categoryName,
  initialFilters,
  initialSearch,
  onFiltersChange,
  currentPage,
  categoryInitialList,
}) => {
  const [filters, setFilters] = useState<Record<string, string[] | number>>(
    initialFilters || {},
  )
  const [internalFilters, setInternalFilters] = useState<
    Record<string, string[] | number>
  >(initialFilters || {})

  const buttonRef = useRef<HTMLButtonElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialFilters) {
      setInternalFilters(initialFilters)
    }
  }, [initialFilters])

  const filterData = useMemo(() => {
    if (!categoryInitialList || categoryInitialList.length === 0) {
      return {
        brands: [],
        prices: null,
        volumes: [],
        sizes: [],
        plates: [],
        voltage: [],
        container: [],
        models: [],
        countries: [],
        radiuses: [],
      }
    }

    let allBrands: string[] = []
    let minPrice = Infinity
    let maxPrice = -Infinity
    let allVolumes: string[] = []
    let allSizes: string[] = []
    let allPlates: (string | null)[] = []
    let allVoltage: (string | null)[] = []
    let allContainer: (string | null)[] = []
    let allModels: string[] = []
    let allCountries: (string | null)[] = []
    let allRadiuses: (string | null)[] = []
    categoryInitialList.forEach((item) => {
      // Brands
      if (item.brandName) {
        allBrands.push(item.brandName)
      }
      // Prices
      if (item.defaultPrice) {
        minPrice = Math.min(minPrice, item.defaultPrice)
        maxPrice = Math.max(maxPrice, item.defaultPrice)
      }

      // Volumes
      if (item.volumes) {
        allVolumes.push(...Object.keys(item.volumes))
      }

      // Sizes
      if (item.sizes) {
        allSizes.push(...Object.keys(item.sizes))
      }
      // Plates
      if (item.plates) {
        allPlates.push(item.plates)
      }

      // voltage
      if (item.voltage) {
        allVoltage.push(item.voltage)
      }

      // container
      if (item.container) {
        allContainer.push(item.container)
      }

      // models
      if (item.models && item.models.length > 0) {
        allModels.push(...item.models)
      }

      // Countries
      if (item.country) {
        allCountries.push(item.country)
      }

      // Radiuses
      if (item.size) {
        allRadiuses.push(item.size)
      }
    })

    const uniqueBrands = [...new Set(allBrands)]
    const uniqueVolumes = [...new Set(allVolumes)]
    const uniqueSizes = [...new Set(allSizes)]
    const uniquePlates = [...new Set(allPlates)].filter(Boolean) as string[]
    const uniqueModels = [...new Set(allModels)]
    const uniqueCountries = [...new Set(allCountries)].filter(
      Boolean,
    ) as string[]
    const uniqueRadiuses = [...new Set(allRadiuses)].filter(Boolean) as string[]

    const parsedVoltage = [...new Set(allVoltage)]
      .filter(Boolean)
      .map((v) => parseInt(v as string, 10))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b)

    const parsedContainer = [...new Set(allContainer)]
      .filter(Boolean)
      .map((c) => parseInt(c as string, 10))
      .filter((c) => !isNaN(c))
      .sort((a, b) => a - b)

    return {
      brands: uniqueBrands,
      prices:
        minPrice !== Infinity && maxPrice !== -Infinity
          ? { min: minPrice, max: maxPrice }
          : null,
      volumes: uniqueVolumes,
      sizes: uniqueSizes,
      plates: uniquePlates,
      voltage: parsedVoltage,
      container: parsedContainer,
      models: uniqueModels,
      countries: uniqueCountries,
      radiuses: uniqueRadiuses,
    }
  }, [categoryInitialList])

  const categoryData = transformData[productsType]
  const groups = categoryData.group

  const handleFilterChange = useCallback(
    (
      name: string,
      value: string | string[] | number,
      isChecked: boolean | number | number[],
    ) => {
      const newFilters = { ...internalFilters }

      if (Array.isArray(value)) {
        if (isChecked) {
          newFilters[name] = Array.isArray(newFilters[name])
            ? [...newFilters[name], ...value]
            : [...value]
        } else {
          newFilters[name] = Array.isArray(newFilters[name])
            ? newFilters[name].filter((item) => !value.includes(item))
            : []
        }
      } else if (typeof value === 'number') {
        newFilters[name] = value
      } else if (typeof value === 'string') {
        if (isChecked) {
          newFilters[name] = Array.isArray(newFilters[name])
            ? [...newFilters[name], value]
            : [value]
        } else {
          newFilters[name] = Array.isArray(newFilters[name])
            ? newFilters[name].filter((item) => item !== value)
            : []
        }
      }

      if (
        newFilters[name] &&
        Array.isArray(newFilters[name]) &&
        newFilters[name].length === 0
      ) {
        delete newFilters[name]
      }
      if (
        (newFilters[name] && typeof newFilters[name] === 'number') ||
        !newFilters[name]
      ) {
        if (newFilters[name] === undefined) {
          delete newFilters[name]
        }
      }

      if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
        setFilters(newFilters)
        onFiltersChange(newFilters)
      }
      setInternalFilters(newFilters)
    },
    [onFiltersChange, filters, internalFilters, setInternalFilters],
  )

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      console.log(min, max)
      handleFilterChange('minPrice', min, true)
      handleFilterChange('maxPrice', max, true)
    },
    [handleFilterChange],
  )

  return (
    <Accordion
      type="multiple"
      className="relative w-full"
      ref={accordionRef}
      defaultValue={['category', 'price', 'brands', 'volumes', 'sizes']}
    >
      {currentPage > 1 && groups && (
        <FilterList
          initial={true}
          maxHeight={'200'}
          title={categoryData.title}
          items={groups}
        />
      )}

      {filterData.prices && (
        <FilterItem title="Цена" value="price">
          <FilterInterval
            title=""
            min={filterData.prices.min}
            max={filterData.prices.max}
            onRangeChange={handlePriceChange}
          />
        </FilterItem>
      )}
      {/* {prices && (
<FilterItem title="Цена" value="price">
<FilterSlider title="" min={prices.min} max={prices.max} />
</FilterItem>
)} */}
      {filterData.brands && filterData.brands.length > 0 && (
        <FilterItem title="Бренды" value="brands">
          <FilterCheckbox
            title=""
            options={filterData.brands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
            showMoreCount={
              filterData.brands.length > 5 ? filterData.brands.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('brandName', value, isChecked)
            }
            initialChecked={filters['brandName'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.volumes && filterData.volumes.length > 0 && (
        <FilterItem title="Объем" value="volumes">
          <FilterCheckbox
            title=""
            options={filterData.volumes.map((volume) => ({
              label: volume,
              value: volume,
            }))}
            showMoreCount={
              filterData.volumes.length > 5 ? filterData.volumes.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('volumes', value, isChecked)
            }
            initialChecked={filters['volumes'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.sizes && filterData.sizes.length > 0 && (
        <FilterItem title="Размеры" value="sizes">
          <FilterCheckbox
            title=""
            options={filterData.sizes.map((size) => ({
              label: size,
              value: size,
            }))}
            showMoreCount={
              filterData.sizes.length > 5 ? filterData.sizes.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('sizes', value, isChecked)
            }
            initialChecked={filters['sizes'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.plates && filterData.plates.length > 0 && (
        <FilterItem title="Тип пластин" value="plates">
          <FilterCheckbox
            title=""
            options={filterData.plates.map((plate) => ({
              label: plate,
              value: plate,
            }))}
            showMoreCount={
              filterData.plates.length > 5 ? filterData.plates.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('plates', value, isChecked)
            }
            initialChecked={filters['plates'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.voltage && filterData.voltage.length > 0 && (
        <FilterItem title="Напряжение, В" value="voltage">
          <FilterCheckbox
            title=""
            options={filterData.voltage.map((volt) => ({
              label: String(volt),
              value: String(volt),
            }))}
            showMoreCount={
              filterData.voltage.length > 5 ? filterData.voltage.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('voltage', value, isChecked)
            }
            initialChecked={filters['voltage'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.container && filterData.container.length > 0 && (
        <FilterItem title="Емкость, Ач" value="container">
          <FilterCheckbox
            title=""
            options={filterData.container.map((cont) => ({
              label: String(cont),
              value: String(cont),
            }))}
            showMoreCount={
              filterData.container.length > 5
                ? filterData.container.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('container', value, isChecked)
            }
            initialChecked={filters['container'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.models && filterData.models.length > 0 && (
        <FilterItem title="Модели техники" value="models">
          <FilterCheckbox
            title=""
            options={filterData.models.map((model) => ({
              label: model,
              value: model,
            }))}
            showMoreCount={
              filterData.models.length > 5 ? filterData.models.length - 5 : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('models', value, isChecked)
            }
            initialChecked={filters['models'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.countries && filterData.countries.length > 0 && (
        <FilterItem title="Страны производства" value="countries">
          <FilterCheckbox
            title=""
            options={filterData.countries.map((country) => ({
              label: country,
              value: country,
            }))}
            showMoreCount={
              filterData.countries.length > 5
                ? filterData.countries.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('country', value, isChecked)
            }
            initialChecked={filters['country'] as string[]}
          />
        </FilterItem>
      )}
      {filterData.radiuses && filterData.radiuses.length > 0 && (
        <FilterItem title="Радиус" value="radiuses">
          <FilterCheckbox
            title=""
            options={filterData.radiuses.map((radius) => ({
              label: radius,
              value: radius,
            }))}
            showMoreCount={
              filterData.radiuses.length > 5
                ? filterData.radiuses.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('size', value, isChecked)
            }
            initialChecked={filters['size'] as string[]}
          />
        </FilterItem>
      )}
    </Accordion>
  )
}

export default CatalogFilters
