'use client'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { FilterCheckbox } from './FilterCheckbox'
import { FilterInterval } from './FilterInterval'
import { FilterItem } from './FilterItem'
import { FilterList } from './FilterList'
import { transformJson } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { FilterData } from '@/types/products.types'
import useFilterStore from '@/zustand/filterStore'
import pagesDataRaw from '@/data/products/pagesData.json'
import { useSearchParams } from 'next/navigation'

const transformData = transformJson(pagesDataRaw)

interface Props {
  productsType: string
  categoryName: string
  currentPage: number
  initialFilters?: Record<string, string[] | number>
  onFiltersChange: (filters: Record<string, string[] | number>) => void
  categoryInitialList: FilterData
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
  const searchParams = useSearchParams()
  const setFilters = useFilterStore((state) => state.setFilters)
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

      setInternalFilters(newFilters)
      setFilters(newFilters)
      onFiltersChange(newFilters)
    },
    [setFilters, internalFilters, onFiltersChange],
  )

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      const newFilters = { ...internalFilters }

      let hasChanged = false
      if (min !== newFilters['minPrice']) {
        newFilters['minPrice'] = min
        hasChanged = true
      }
      if (max !== newFilters['maxPrice']) {
        newFilters['maxPrice'] = max
        hasChanged = true
      }

      if (hasChanged) {
        setInternalFilters(newFilters)
        setFilters(newFilters)
        onFiltersChange(newFilters)
      }
    },
    [handleFilterChange, internalFilters, setFilters, onFiltersChange],
  )

  const urlFilters = searchParams.get('filters')
  let parsedMinPrice: number | undefined
  let parsedMaxPrice: number | undefined

  if (urlFilters) {
    try {
      const parsedFilters = JSON.parse(urlFilters) as Record<
        string,
        string[] | number
      >
      parsedMinPrice = parsedFilters.minPrice as number
      parsedMaxPrice = parsedFilters.maxPrice as number
    } catch (error) {
      console.error('Error parsing filters from URL:', error)
    }
  }

  return (
    <Accordion
      type="multiple"
      className="relative w-full"
      ref={accordionRef}
      defaultValue={[
        'category',
        'price',
        'brands',
        'types',
        'volumes',
        'sizes',
      ]}
    >
      {currentPage > 1 && groups && (
        <FilterList
          initial={true}
          maxHeight={'200'}
          title={categoryData.title}
          items={groups}
        />
      )}

      {categoryInitialList.prices && (
        <FilterItem title="Цена" value="price">
          <FilterInterval
            title=""
            min={categoryInitialList.prices.min}
            max={categoryInitialList.prices.max}
            onRangeChange={handlePriceChange}
            initialMin={parsedMinPrice}
            initialMax={parsedMaxPrice}
          />
        </FilterItem>
      )}
      {/* {prices && (
<FilterItem title="Цена" value="price">
<FilterSlider title="" min={prices.min} max={prices.max} />
</FilterItem>
)} */}
      {categoryInitialList.brands && categoryInitialList.brands.length > 0 && (
        <FilterItem title="Бренды" value="brands">
          <FilterCheckbox
            title=""
            options={categoryInitialList.brands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
            showMoreCount={
              categoryInitialList.brands.length > 5
                ? categoryInitialList.brands.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('brandName', value, isChecked)
            }
            initialChecked={internalFilters['brandName'] as string[]}
          />
        </FilterItem>
      )}
      {categoryInitialList.types && categoryInitialList.types.length > 0 && (
        <FilterItem title="Тип" value="types">
          <FilterCheckbox
            title=""
            options={categoryInitialList.types.map((type) => ({
              label: type,
              value: type,
            }))}
            showMoreCount={
              categoryInitialList.types.length > 5
                ? categoryInitialList.types.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('productType', value, isChecked)
            }
            initialChecked={internalFilters['productType'] as string[]}
          />
        </FilterItem>
      )}
      {categoryInitialList.volumes &&
        categoryInitialList.volumes.length > 0 && (
          <FilterItem title="Объем" value="volumes">
            <FilterCheckbox
              title=""
              options={categoryInitialList.volumes.map((volume) => ({
                label: volume,
                value: volume,
              }))}
              showMoreCount={
                categoryInitialList.volumes.length > 5
                  ? categoryInitialList.volumes.length - 5
                  : 0
              }
              onCheckboxChange={(value, isChecked) =>
                handleFilterChange('volumes', value, isChecked)
              }
              initialChecked={internalFilters['volumes'] as string[]}
            />
          </FilterItem>
        )}
      {categoryInitialList.sizes && categoryInitialList.sizes.length > 0 && (
        <FilterItem title="Размеры" value="sizes">
          <FilterCheckbox
            title=""
            options={categoryInitialList.sizes.map((size) => ({
              label: size,
              value: size,
            }))}
            showMoreCount={
              categoryInitialList.sizes.length > 5
                ? categoryInitialList.sizes.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('sizes', value, isChecked)
            }
            initialChecked={internalFilters['sizes'] as string[]}
          />
        </FilterItem>
      )}
      {categoryInitialList.plates && categoryInitialList.plates.length > 0 && (
        <FilterItem title="Тип пластин" value="plates">
          <FilterCheckbox
            title=""
            options={categoryInitialList.plates.map((plate) => ({
              label: plate,
              value: plate,
            }))}
            showMoreCount={
              categoryInitialList.plates.length > 5
                ? categoryInitialList.plates.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('plates', value, isChecked)
            }
            initialChecked={internalFilters['plates'] as string[]}
          />
        </FilterItem>
      )}
      {categoryInitialList.voltage &&
        categoryInitialList.voltage.length > 0 && (
          <FilterItem title="Напряжение, В" value="voltage">
            <FilterCheckbox
              title=""
              options={categoryInitialList.voltage.map((volt) => ({
                label: String(volt),
                value: String(volt),
              }))}
              showMoreCount={
                categoryInitialList.voltage.length > 5
                  ? categoryInitialList.voltage.length - 5
                  : 0
              }
              onCheckboxChange={(value, isChecked) =>
                handleFilterChange('voltage', value, isChecked)
              }
              initialChecked={internalFilters['voltage'] as string[]}
            />
          </FilterItem>
        )}
      {categoryInitialList.container &&
        categoryInitialList.container.length > 0 && (
          <FilterItem title="Емкость, Ач" value="container">
            <FilterCheckbox
              title=""
              options={categoryInitialList.container.map((cont) => ({
                label: String(cont),
                value: String(cont),
              }))}
              showMoreCount={
                categoryInitialList.container.length > 5
                  ? categoryInitialList.container.length - 5
                  : 0
              }
              onCheckboxChange={(value, isChecked) =>
                handleFilterChange('container', value, isChecked)
              }
              initialChecked={internalFilters['container'] as string[]}
            />
          </FilterItem>
        )}
      {categoryInitialList.models && categoryInitialList.models.length > 0 && (
        <FilterItem title="Модели техники" value="models">
          <FilterCheckbox
            title=""
            options={categoryInitialList.models.map((model) => ({
              label: model,
              value: model,
            }))}
            showMoreCount={
              categoryInitialList.models.length > 5
                ? categoryInitialList.models.length - 5
                : 0
            }
            onCheckboxChange={(value, isChecked) =>
              handleFilterChange('models', value, isChecked)
            }
            initialChecked={internalFilters['models'] as string[]}
          />
        </FilterItem>
      )}
      {categoryInitialList.countries &&
        categoryInitialList.countries.length > 0 && (
          <FilterItem title="Страны производства" value="countries">
            <FilterCheckbox
              title=""
              options={categoryInitialList.countries.map((country) => ({
                label: country,
                value: country,
              }))}
              showMoreCount={
                categoryInitialList.countries.length > 5
                  ? categoryInitialList.countries.length - 5
                  : 0
              }
              onCheckboxChange={(value, isChecked) =>
                handleFilterChange('country', value, isChecked)
              }
              initialChecked={internalFilters['country'] as string[]}
            />
          </FilterItem>
        )}
      {categoryInitialList.radiuses &&
        categoryInitialList.radiuses.length > 0 && (
          <FilterItem title="Радиус" value="radiuses">
            <FilterCheckbox
              title=""
              options={categoryInitialList.radiuses.map((radius) => ({
                label: radius,
                value: radius,
              }))}
              showMoreCount={
                categoryInitialList.radiuses.length > 5
                  ? categoryInitialList.radiuses.length - 5
                  : 0
              }
              onCheckboxChange={(value, isChecked) =>
                handleFilterChange('size', value, isChecked)
              }
              initialChecked={internalFilters['size'] as string[]}
            />
          </FilterItem>
        )}
    </Accordion>
  )
}

export default CatalogFilters
