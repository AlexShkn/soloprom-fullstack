'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import useSearchStore from '@/store/useSearchStore'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Sort } from '@/components/GroupList/Sort'
import { ViewSetting } from '@/components/GroupList/ViewSetting'
import { Button } from '@/components/ui'
import clsx from 'clsx'

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

        <Button
          onClick={() => setFilterOpen(true)}
          type="button"
          className="flex w-auto gap-1 rounded p-1 px-2.5 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 12"
            id="filters"
            className="icon h-4 w-4 rotate-[90deg] fill-white md:h-5 md:w-5"
          >
            <g>
              <path d="M12.505 1.793a.555.555 0 0 0-.496-.461l-.016-.001a.906.906 0 0 0-.141-.011h-.02a31.13 31.13 0 0 1-.646.005l-.504-.001a84.007 84.007 0 0 0-.504-.002h-.158C9.731.454 8.991.035 8.36.005a1.886 1.886 0 0 0-1.195.323c-.357.245-.603.58-.735.998H1.119l-.03-.001a.553.553 0 0 0-.593.463.536.536 0 0 0 .349.59l.004.002a.9.9 0 0 0 .289.036 1173.07 1173.07 0 0 0 5.298 0A1.88 1.88 0 0 0 8.228 3.75a1.898 1.898 0 0 0 1.788-1.329l1.847-.001a.934.934 0 0 0 .289-.035l.004-.001a.54.54 0 0 0 .349-.591Zm-4.279.858H8.22a.79.79 0 0 1-.779-.783.79.79 0 0 1 .791-.781.796.796 0 0 1 .779.785.79.79 0 0 1-.785.779ZM12.505 10.041a.56.56 0 0 0-.496-.463H11.99a.77.77 0 0 0-.138-.012h-.02c-.192.004-.396.006-.646.006l-.504-.002-.504-.002h-.158c-.29-.867-1.03-1.285-1.661-1.314a1.886 1.886 0 0 0-1.195.322c-.357.244-.603.58-.735.996H1.089a.556.556 0 0 0-.594.463.539.539 0 0 0 .349.592l.004.002a.988.988 0 0 0 .289.033 1173.073 1173.073 0 0 0 5.298 0 1.883 1.883 0 0 0 1.792 1.336 1.894 1.894 0 0 0 1.788-1.328c.597-.002 1.696-.002 1.847-.002a.934.934 0 0 0 .289-.035h.004a.54.54 0 0 0 .35-.592Zm-4.28.857H8.22a.79.79 0 0 1-.78-.783.79.79 0 0 1 .792-.781.796.796 0 0 1 .779.785.789.789 0 0 1-.785.779ZM11.862 6.545h-.579l.567.002c.027 0 .056-.002.082-.004-.023.002-.046.002-.07.002Z"></path>
              <path d="M12.505 5.917a.556.556 0 0 0-.595-.462H6.543c-.257-.788-.93-1.302-1.747-1.326a1.79 1.79 0 0 0-1.061.3 1.885 1.885 0 0 0-.778 1.03h-1.88c-.055 0-.124 0-.192.018l-.003.002a.543.543 0 0 0 .153 1.064H2.96c.246.773.936 1.313 1.722 1.326h.033c.882 0 1.515-.455 1.835-1.322v-.004h2.458c.633 0 1.432 0 2.264.002h.592c.023 0 .047 0 .07-.002h.004a.764.764 0 0 0 .215-.033l.004-.002a.54.54 0 0 0 .348-.591Zm-7.196.632a.78.78 0 0 1-.553.226h-.003a.784.784 0 0 1-.785-.781.783.783 0 0 1 .782-.776.782.782 0 0 1 .559 1.331Z"></path>
              <path d="M9.007 6.543H6.55l-.001.004c1.035-.002 3.564-.002 4.72-.002-.832-.002-1.63-.002-2.263-.002Z"></path>
            </g>
          </svg>
          Фильтр
        </Button>
        <ViewSetting viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <ul className="mx-5 mb-4 flex flex-wrap items-center gap-2.5">
        {activeFilters.map(([filterName, filterValues]) =>
          filterValues.map((filterValue, index) => (
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
        className={clsx(
          'grid grid-cols-1 gap-2.5 overflow-hidden px-1 mdl:px-5 mdl:py-2.5 lg:gap-5',
          {
            'grid-cols-1 pb-4 pt-2.5 mds:grid-cols-2 mds:p-2.5 xl:grid-cols-3 2xl:grid-cols-4':
              viewMode === 'grid',
          },
        )}
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
