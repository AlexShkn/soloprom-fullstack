'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Sort } from '../GroupList/Sort'
import { ViewSetting } from '../GroupList/ViewSetting'

import useSearchStore from '@/store/searchStore'
import { Button } from '../ui'

interface Props {
  handleResetFilters: () => void
  onSortChange: (sort: string) => void
  hasFilters: boolean
  filterOpen: boolean
  setFilterOpen: (status: boolean) => void
  setCheckedValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >
  checkedValues: Record<string, string[]>
}

const ITEMS_PER_PAGE = 12

export const SearchFilteredList: React.FC<Props> = ({
  onSortChange,
  hasFilters,
  setFilterOpen,
  setCheckedValues,
  checkedValues,
  handleResetFilters,
}) => {
  const {
    foundProducts,
    filters,
    setFilters,
    dataIsLoading,
    sort,
    setSort,
    setDataIsLoading,
    viewMode,
    setViewMode,
  } = useSearchStore()

  const [visibleProducts, setVisibleProducts] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const containerRef = useRef<HTMLUListElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const filterKeysToIgnore = ['minPrice', 'maxPrice']

  const uniqueFilterValues = new Set<string>()

  const activeFilters = Object.entries(filters)
    .filter(
      ([key, value]) =>
        !filterKeysToIgnore.includes(key) &&
        Array.isArray(value) &&
        value.length > 0,
    )
    .map(([key, value]) => [
      key,
      (value as string[]).filter((filterValue) => {
        const uniqueKey = `${key}-${filterValue}`
        if (uniqueFilterValues.has(uniqueKey)) {
          return false
        }
        uniqueFilterValues.add(uniqueKey)
        return true
      }),
    ])
    .filter(([, value]) => (value as string[]).length > 0) as [
    string,
    string[],
  ][]

  const handleRemoveFilter = (filterName: string, filterValue: string) => {
    const currentFilterValues = (filters[filterName] as string[]) || []
    const updatedFilterValues = currentFilterValues.filter(
      (value) => value !== filterValue,
    )

    if (updatedFilterValues.length === 0) {
      const { [filterName]: removed, ...remainingFilters } = filters
      setFilters(remainingFilters)

      const { [filterName]: removedChecked, ...remainingChecked } =
        checkedValues
      setCheckedValues(remainingChecked)
    } else {
      setFilters({ ...filters, [filterName]: updatedFilterValues })
      if (checkedValues[filterName]) {
        setCheckedValues({
          ...checkedValues,
          [filterName]: updatedFilterValues,
        })
      }
    }
  }

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || visibleProducts.length >= foundProducts.length) return

    setIsLoadingMore(true)
    setTimeout(() => {
      const nextProducts = foundProducts.slice(
        visibleProducts.length,
        visibleProducts.length + ITEMS_PER_PAGE,
      )
      setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts])
      setIsLoadingMore(false)
    }, 300)
  }, [visibleProducts, foundProducts, isLoadingMore])

  useEffect(() => {
    setVisibleProducts(foundProducts.slice(0, ITEMS_PER_PAGE))
  }, [foundProducts])

  useEffect(() => {
    const currentContainer = containerRef.current

    if (!currentContainer) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadingMore) {
            loadMoreProducts()
          }
        })
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.5,
      },
    )

    if (currentContainer) {
      observerRef.current.observe(currentContainer)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreProducts, foundProducts, isLoadingMore])

  return (
    <div className="filter-catalog">
      <div className="mb-5 mt-5 flex items-center justify-between gap-5 md:mx-5 md:mt-0">
        <Sort
          onSortChange={onSortChange}
          sort={sort}
          setSort={setSort}
          setDataIsLoading={setDataIsLoading}
        />

        <button
          onClick={() => setFilterOpen(true)}
          type="button"
          className="flex items-center gap-1 rounded bg-accentBlue p-2.5 px-2.5 font-medium text-white md:hidden"
        >
          <svg className="icon h-4 w-4 rotate-[90deg] fill-white md:h-5 md:w-5">
            <use xlinkHref="/img/sprite.svg#filters" />
          </svg>
          Фильтр
        </button>
        <ViewSetting viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <ul className="mx-5 mb-4 flex flex-wrap items-center gap-2.5">
        {activeFilters.map(([filterName, filterValues]) =>
          (filterValues as string[]).map((filterValue, index) => (
            <li
              key={`${filterName}-${index}`}
              className="rounded bg-accentBlue"
            >
              <button
                onClick={() => handleRemoveFilter(filterName, filterValue)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-white transition-colors"
              >
                {filterValue}

                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </li>
          )),
        )}
      </ul>

      <ul
        className={`catalog-list catalog-list--${viewMode} grid grid-cols-4 gap-5 overflow-hidden px-5 py-2.5`}
      >
        {dataIsLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                width={'100%'}
                style={{ borderRadius: '2.25rem' }}
                height={viewMode === 'grid' ? '320px' : '177px'}
              />
            ))
          : visibleProducts.map((item) => (
              <ProductsCard
                key={item.productId}
                cardData={item}
                mod={viewMode}
              />
            ))}
        {isLoadingMore &&
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <Skeleton
              key={`loading-${index}`}
              width={'100%'}
              style={{ borderRadius: '2.25rem' }}
              height={viewMode === 'grid' ? '320px' : '177px'}
            />
          ))}
      </ul>
      <ul ref={containerRef} className="trigger"></ul>

      {!dataIsLoading && !foundProducts.length && (
        <div className="py-10 text-center text-2xl font-bold">
          Нет подходящих товаров
          <Button
            disabled={!hasFilters}
            variant={'outline'}
            onClick={handleResetFilters}
            className="border-1 mx-auto mt-5 hidden rounded border border-accentBlue px-4 py-2.5 font-medium text-accentBlue md:flex"
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  )
}
