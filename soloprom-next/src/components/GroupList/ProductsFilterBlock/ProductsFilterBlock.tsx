'use client'
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps, FilterData } from '@/types/products.types'
import axios from 'axios'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import { BASE_URL } from '@/utils/api/products'
import CatalogFilters from '../Filter/CatalogFilters'
import useFilterStore from '@/zustand/filterStore'
import { useDebounce } from '@/hooks/useDebounce'
import './ProductsFilterBlock.scss'

// Props interface
interface Props {
  categoryName: string
  productsType: string
  currentPage: number
  onChangePage: (newPage: number) => void
  initialProducts: cardDataProps[] | null
  categoryData: FilterData
  totalCount: number
}

export const ProductsFilterBlock: React.FC<Props> = ({
  categoryName,
  productsType,
  currentPage,
  onChangePage,
  initialProducts,
  categoryData,
  totalCount,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupListRef = useRef<HTMLElement | null>(null)
  const fetchControllerRef = useRef<AbortController | null>(null)

  // Zustand store
  const filters = useFilterStore((state) => state.filters)
  const setFilters = useFilterStore((state) => state.setFilters)
  const sort = useFilterStore((state) => state.sort)
  const setSort = useFilterStore((state) => state.setSort)
  const setProducts = useFilterStore((state) => state.setProducts)
  const setTotalProductsCount = useFilterStore(
    (state) => state.setTotalProductsCount,
  )
  const products = useFilterStore((state) => state.products)
  const totalProductsCount = useFilterStore((state) => state.totalProductsCount)
  const hasFilters = useFilterStore((state) => state.hasFilters)
  const setHasFilters = useFilterStore((state) => state.setHasFilters)
  const dynamicCurrentPage = useFilterStore((state) => state.dynamicCurrentPage)
  const setDynamicCurrentPage = useFilterStore(
    (state) => state.setDynamicCurrentPage,
  )
  const dataIsLoading = useFilterStore((state) => state.dataIsLoading)
  const setDataIsLoading = useFilterStore((state) => state.setDataIsLoading)

  const debouncedFilters = useDebounce(filters, 500)
  const debouncedSort = useDebounce(sort, 500)

  const [initialLoad, setInitialLoad] = useState(true)

  // Fetch products data based on filters and sort
  const fetchData = useCallback(async () => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort()
    }

    const controller = new AbortController()
    fetchControllerRef.current = controller
    setDataIsLoading(true)

    try {
      const params = {
        categoryName,
        page: dynamicCurrentPage,
        limit: 12,
        filters:
          Object.keys(debouncedFilters).length > 0
            ? JSON.stringify(debouncedFilters)
            : null,
        sort: debouncedSort,
      }

      const response = await axios.get<any>(`${BASE_URL}/get-products`, {
        params,
        signal: controller.signal,
      })

      setProducts(response.data.products)
      setTotalProductsCount(response.data.totalCount)
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Error fetching products:', err)
      }
    } finally {
      setDataIsLoading(false)
      fetchControllerRef.current = null
    }
  }, [
    categoryName,
    dynamicCurrentPage,
    debouncedFilters,
    debouncedSort,
    setProducts,
    setTotalProductsCount,
    setDataIsLoading,
  ])

  // Handle URL filters and sort updates
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams()

    if (Object.keys(debouncedFilters).length > 0) {
      params.set('filters', JSON.stringify(debouncedFilters))
    }

    if (debouncedSort) {
      params.set('sort', debouncedSort)
    }

    if (dynamicCurrentPage > 1) {
      params.set('page', String(dynamicCurrentPage))
    }

    const newUrl = `?${params.toString()}`
    router.push(newUrl, { scroll: false })
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, router])

  // Load initial data from server or SSG
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
            console.error('Failed to parse filters from URL:', err)
          }
        }

        if (urlSort) {
          setSort(urlSort)
        }

        if (urlPage) {
          const parsedPage = parseInt(urlPage, 10)
          if (!isNaN(parsedPage)) {
            setDynamicCurrentPage(parsedPage)
          }
        }

        fetchData()
      } else {
        // Initial SSG products
        setProducts(initialProducts || [])
        setTotalProductsCount(totalCount)
      }

      setInitialLoad(false)
    }
  }, [
    searchParams,
    setFilters,
    setSort,
    fetchData,
    initialProducts,
    totalCount,
    setProducts,
    setTotalProductsCount,
    setDynamicCurrentPage,
    setHasFilters,
    initialLoad,
  ])

  // Fetch data when filters or sort change
  useEffect(() => {
    if (!initialLoad && hasFilters) {
      fetchData()
    }
  }, [
    debouncedFilters,
    debouncedSort,
    dynamicCurrentPage,
    fetchData,
    initialLoad,
    hasFilters,
  ])

  // Update URL when filters or pagination change
  useEffect(() => {
    if (!initialLoad) {
      updateUrl()
    }
  }, [
    debouncedFilters,
    debouncedSort,
    dynamicCurrentPage,
    updateUrl,
    initialLoad,
  ])

  return (
    <section className="group-list section-offset" ref={groupListRef}>
      <div className="group-list__container">
        <div className={`group-list__body`}>
          <CatalogFilters
            productsType={productsType}
            categoryName={categoryName}
            onFiltersChange={setFilters}
            initialFilters={filters}
            categoryInitialList={categoryData}
            currentPage={currentPage}
          />
          <FilteredList
            data={products}
            currentPage={currentPage}
            dynamicCurrentPage={dynamicCurrentPage}
            setDynamicCurrentPage={setDynamicCurrentPage}
            totalPages={Math.ceil(totalProductsCount / 12)}
            onChangePage={onChangePage}
            dataIsLoading={dataIsLoading}
            onSortChange={setSort}
            hasFilters={hasFilters}
          />
        </div>
      </div>
    </section>
  )
}
