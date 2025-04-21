'use client'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CardDataProps, FilterData } from '@/types/products.types'
import { SearchFilteredList } from './SearchFilteredList'
import SearchFilters from './SearchFilters'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/utils/fetch/instance.api'
import useSearchStore from '@/store/searchStore'
import { generateFilterData } from '@/app/catalog/[pageUrl]/server'

import { scrollStatusChange } from '@/utils/scrollStatusChange'

interface Props {
  initialProducts: CardDataProps[] | null
  searchValue: string
}

export const SearchFilterBlock: React.FC<Props> = ({
  initialProducts,
  searchValue,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fetchControllerRef = useRef<AbortController | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>(
    {},
  )
  const [filtersData, setFiltersData] = useState<any>({})
  const {
    filters,
    setFilters,
    sort,
    setSort,
    setTotalProductsCount,
    hasFilters,
    setHasFilters,
    setDataIsLoading,
    setPriceRange,
    resetFilters,
    setFoundProducts,
    foundProducts,
  } = useSearchStore()

  const debouncedFilters = useDebounce(filters, 500)
  const debouncedSort = useDebounce(sort, 500)

  useEffect(() => {
    const filterData: FilterData = generateFilterData(initialProducts)

    setFiltersData(filterData)
  }, [initialProducts])

  const fetchData = useCallback(async () => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort()
    }

    const controller = new AbortController()
    fetchControllerRef.current = controller

    try {
      const params = {
        limit: 1000,
        filters:
          Object.keys(debouncedFilters).length > 0
            ? JSON.stringify(debouncedFilters)
            : null,
        sort: debouncedSort,
        search: searchValue,
      }

      const response = await api.get<{
        products: CardDataProps[]
        totalCount: number
      }>('products/get-products', {
        params: params as any,
        signal: controller.signal,
      })

      setFoundProducts(response.products)
      setTotalProductsCount(response.totalCount)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Ошибка получения продуктов:', err)
      }
    } finally {
      setTimeout(() => {
        setDataIsLoading(false)
      }, 500)
      fetchControllerRef.current = null
    }
  }, [debouncedFilters, debouncedSort])

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams()
    if (Object.keys(debouncedFilters).length > 0) {
      params.set('filters', JSON.stringify(debouncedFilters))
    }

    if (debouncedSort) {
      params.set('sort', debouncedSort)
    }
    if (searchValue) {
      params.set('search', searchValue)
    }

    const newUrl = `?${params.toString()}`

    if (newUrl.length > 1) {
      router.push(newUrl, { scroll: false })
    }
  }, [debouncedFilters, debouncedSort, router])

  useEffect(() => {
    if (initialLoad) {
      const urlFilters = searchParams.get('filters')
      const urlSort = searchParams.get('sort')
      const urlPage = searchParams.get('page')

      if (urlFilters || urlSort || urlPage) {
        if (urlFilters) {
          try {
            const parsedFilters = JSON.parse(urlFilters)

            setFilters(parsedFilters)
            setHasFilters(true)
          } catch (err) {
            console.error(
              'Не удалось проанализировать фильтры по URL-адресу:',
              err,
            )
          }
        }

        if (urlSort) {
          setSort(urlSort)
        }

        setHasFilters(true)
      } else {
        setTimeout(() => {
          setDataIsLoading(false)
        }, 500)
        setTotalProductsCount(foundProducts.length)
      }

      setInitialLoad(false)
    }
  }, [
    searchParams,
    setFilters,
    setSort,
    foundProducts,
    setFoundProducts,
    setTotalProductsCount,
    setHasFilters,
  ])

  useEffect(() => {
    if (!initialLoad) {
      updateUrl()
      // setFoundProducts([])
      fetchData()
    }
  }, [debouncedFilters, debouncedSort, updateUrl])

  const handleResetFilters = () => {
    setPriceRange({
      min: filtersData.prices?.min,
      max: filtersData.prices?.max,
    })
    setCheckedValues({})
    router.push(`${window.location.pathname}?searchValue=${searchValue}`, {
      scroll: false,
    })
    resetFilters()
  }

  const handlerFilterPopup = (status: boolean) => {
    setFilterOpen(status)
    scrollStatusChange(status)
  }

  return (
    <section className="group-list section-offset">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] lg:grid-cols-[240px,1fr]">
          <SearchFilters
            categoryInitialList={filtersData}
            filterOpen={filterOpen}
            setFilterOpen={handlerFilterPopup}
            setCheckedValues={setCheckedValues}
            checkedValues={checkedValues}
            handleResetFilters={handleResetFilters}
          />
          <SearchFilteredList
            onSortChange={setSort}
            hasFilters={hasFilters}
            filterOpen={filterOpen}
            setFilterOpen={handlerFilterPopup}
            setCheckedValues={setCheckedValues}
            checkedValues={checkedValues}
            handleResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </section>
  )
}
