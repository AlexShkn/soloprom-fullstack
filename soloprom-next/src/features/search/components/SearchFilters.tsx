'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Accordion } from '@/components/ui/accordion'
import useSearchStore from '@/store/useSearchStore'
import pagesDataRawRaw from '@/data/products/pagesData.json'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Button } from '@/components/ui'
import { FilterData } from '@/types/products.types'
import {
  FilterList,
  GroupItemType,
} from '@/components/GroupList/Filter/FilterList'
import { FilterItem } from '@/components/GroupList/Filter/FilterItem'
import { FilterCheckbox } from '@/components/GroupList/Filter/FilterCheckbox'
import { FilterInterval } from '@/components/GroupList/Filter/FilterInterval'
import { declension } from '@/supports/declension'

interface Props {
  categoryInitialList: FilterData
  filterOpen: boolean
  setFilterOpen: (status: boolean) => void
  checkedValues: Record<string, string[]>
  setCheckedValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >
  handleResetFilters: () => void
}

interface PagesDataRaw {
  [key: string]: {
    crumb: string
    url: string
  }
}

const pagesDataRaw: PagesDataRaw = pagesDataRawRaw as PagesDataRaw

const SearchFilters: React.FC<Props> = ({
  categoryInitialList,
  filterOpen,
  setFilterOpen,
  setCheckedValues,
  checkedValues,
  handleResetFilters,
}) => {
  const {
    foundProducts,
    filters,
    setFilters,
    hasFilters,
    totalProductsCount,
    setDataIsLoading,
    priceRange,
    setPriceRange,
    filterComplete,
    setFilterComplete,
  } = useSearchStore()
  const [initialLoad, setInitialLoad] = useState(true)
  const [categoryList, setCategoryList] = useState<GroupItemType[]>([])

  const productWord = declension(foundProducts.length, [
    'товар',
    'товара',
    'товаров',
  ])

  const [internalFilters, setInternalFilters] = useState<
    Record<string, string[] | number>
  >(filters || {})
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialLoad) {
      setPriceRange({
        min: categoryInitialList.prices?.min,
        max: categoryInitialList.prices?.max,
      })

      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    setDataIsLoading(true)
    setInternalFilters(filters)
    setFilterComplete(true)
  }, [filters])

  useEffect(() => {
    if (categoryInitialList?.categoryes) {
      const categoryData = categoryInitialList.categoryes.map((category) => {
        if (pagesDataRaw[category]) {
          return {
            title: pagesDataRaw[category].crumb,
            url: pagesDataRaw[category].url,
          }
        }
      })

      setCategoryList([...(categoryData as GroupItemType[])])
    }
  }, [categoryInitialList])

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
            ? [...new Set([...(newFilters[name] as string[]), ...value])]
            : [...new Set(value)]
        } else {
          newFilters[name] = Array.isArray(newFilters[name])
            ? (newFilters[name] as string[]).filter(
                (item) => !value.includes(item),
              )
            : []
        }
      } else if (typeof value === 'number') {
        newFilters[name] = value
      } else if (typeof value === 'string') {
        if (isChecked) {
          newFilters[name] = Array.isArray(newFilters[name])
            ? [...new Set([...(newFilters[name] as string[]), value])]
            : [value]
        } else {
          newFilters[name] = Array.isArray(newFilters[name])
            ? (newFilters[name] as string[]).filter((item) => item !== value)
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
    },
    [setFilters, internalFilters],
  )

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      const newFilters = { ...internalFilters }
      setPriceRange({ min, max })

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
      }
    },
    [handleFilterChange, internalFilters, setFilters],
  )

  return (
    <div
      className={`filter-wrapper fixed left-0 top-0 h-full w-full bg-white pl-2.5 pt-20 md:relative md:block md:p-0 ${
        filterOpen ? 'z-50 block' : 'hidden'
      }`}
    >
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between gap-2.5 bg-white p-2.5 shadow-custom md:hidden">
        <div className="text-lg font-medium md:hidden">
          Подбор по параметрам
        </div>
        <button onClick={() => setFilterOpen(false)} className="p-1">
          <svg className="icon h-7 w-7 fill-darkBlue">
            <use xlinkHref="/img/sprite-default.svg#close"></use>
          </svg>
        </button>
      </div>

      {filterComplete ? (
        <div className="scroll-bar scroll-bar--mini h-full overflow-y-auto px-2.5 pb-16">
          <Accordion
            type="multiple"
            className="relative w-full pr-2.5 md:pr-0"
            ref={accordionRef}
            defaultValue={[
              'category',
              'price',
              'brands',
              'viscosity',
              'types',
              'volumes',
              'sizes',
            ]}
          >
            <FilterList
              initial={true}
              maxHeight={'200'}
              title={'Каталог'}
              items={categoryList || []}
            />
            {categoryInitialList.prices &&
              categoryInitialList.prices.min !==
                categoryInitialList.prices.max && (
                <FilterItem title="Цена" value="price">
                  <FilterInterval
                    title=""
                    min={categoryInitialList.prices.min}
                    max={categoryInitialList.prices.max}
                    onRangeChange={handlePriceChange}
                    initialMin={priceRange.min}
                    initialMax={priceRange.max}
                    reset={false}
                  />
                </FilterItem>
              )}

            {categoryInitialList.categoryes && (
              <FilterItem title="Категория товара" value="category">
                <FilterCheckbox
                  setCheckedValues={setCheckedValues}
                  checkedValues={checkedValues}
                  title=""
                  options={categoryInitialList.categoryes.map((category) => ({
                    label: pagesDataRaw[category].crumb,
                    value: category,
                  }))}
                  showMoreCount={
                    categoryInitialList.categoryes.length > 5
                      ? categoryInitialList.categoryes.length - 5
                      : 0
                  }
                  onCheckboxChange={(value, isChecked) =>
                    handleFilterChange('categoryName', value, isChecked)
                  }
                  filterName="categoryName"
                  initialChecked={
                    (internalFilters['categoryName'] as string[]) || []
                  }
                />
              </FilterItem>
            )}
            {categoryInitialList.brands &&
              categoryInitialList.brands.length > 1 && (
                <FilterItem title="Бренды" value="brands">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="brandName"
                    initialChecked={
                      (internalFilters['brandName'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}

            {categoryInitialList.viscosity &&
              categoryInitialList.viscosity.length > 1 && (
                <FilterItem title="Вязкость" value="viscosity">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
                    title=""
                    options={categoryInitialList.viscosity.map((viscosity) => ({
                      label: viscosity,
                      value: viscosity,
                    }))}
                    showMoreCount={
                      categoryInitialList.viscosity.length > 5
                        ? categoryInitialList.viscosity.length - 5
                        : 0
                    }
                    onCheckboxChange={(value, isChecked) =>
                      handleFilterChange('viscosity', value, isChecked)
                    }
                    filterName="viscosity"
                    initialChecked={
                      (internalFilters['viscosity'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.types &&
              categoryInitialList.types.length > 1 && (
                <FilterItem title="Тип" value="types">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="productType"
                    initialChecked={
                      (internalFilters['productType'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.sizes &&
              categoryInitialList.sizes.length > 1 && (
                <FilterItem title="Размеры" value="sizes">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="defaultSize"
                    initialChecked={
                      (internalFilters['defaultSize'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.plates &&
              categoryInitialList.plates.length > 1 && (
                <FilterItem title="Тип пластин" value="plates">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="plates"
                    initialChecked={
                      (internalFilters['plates'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.voltage &&
              categoryInitialList.voltage.length > 1 && (
                <FilterItem title="Напряжение, В" value="voltage">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="voltage"
                    initialChecked={
                      (internalFilters['voltage'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.container &&
              categoryInitialList.container.length > 1 && (
                <FilterItem title="Емкость, Ач" value="container">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="container"
                    initialChecked={
                      (internalFilters['container'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.models &&
              categoryInitialList.models.length > 1 && (
                <FilterItem title="Модели техники" value="models">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="models"
                    initialChecked={
                      (internalFilters['models'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.countries &&
              categoryInitialList.countries.length > 1 && (
                <FilterItem title="Страны производства" value="countries">
                  <FilterCheckbox
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
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
                    filterName="country"
                    initialChecked={
                      (internalFilters['country'] as string[]) || []
                    }
                  />
                </FilterItem>
              )}
            {categoryInitialList.radiuses &&
              categoryInitialList.radiuses.length > 1 && (
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
                    filterName="size"
                    initialChecked={(internalFilters['size'] as string[]) || []}
                    setCheckedValues={setCheckedValues}
                    checkedValues={checkedValues}
                  />
                </FilterItem>
              )}
            <Button
              disabled={!hasFilters}
              variant={'outline'}
              onClick={handleResetFilters}
              className="border-1 mt-5 hidden w-full rounded border border-accentBlue px-4 py-2.5 font-medium text-accentBlue md:flex"
            >
              Сбросить
            </Button>
          </Accordion>
          <div className="fixed bottom-0 left-0 flex w-full items-center gap-2 bg-white px-2.5 py-2 md:hidden">
            <Button
              disabled={!hasFilters}
              variant={'outline'}
              onClick={handleResetFilters}
              className="border-1 rounded border border-accentBlue px-4 py-2.5 font-medium text-accentBlue"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => setFilterOpen(false)}
              className="button flex-auto gap-1.5 py-2.5"
            >
              Показать
              {totalProductsCount > 0 && (
                <span>
                  {totalProductsCount} {productWord}
                </span>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <Skeleton
          width={'100%'}
          style={{ borderRadius: '2.25rem' }}
          height={'40%'}
        />
      )}
    </div>
  )
}

export default SearchFilters
