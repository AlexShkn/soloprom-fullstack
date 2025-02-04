'use client'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps, FilterData } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import CatalogFilters from '../Filter/CatalogFilters'
import useFilterStore from '@/store/filterStore'
import { useDebounce } from '@/hooks/useDebounce'
import './ProductsFilterBlock.scss'
import { api } from '@/utils/fetch/instance.api'
import { getCurrentWindowSize } from '@/supports'
export const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`

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

  const [products, setProducts] = useState(initialProducts || [])
  const [initialLoad, setInitialLoad] = useState(true)
  const [dataIsLoading, setDataIsLoading] = useState(true)

  const [filterOpen, setFilterOpen] = useState(false)

  const {
    filteredPage,
    setFilteredPage,
    resetFilters,
    filters,
    setFilters,
    sort,
    setSort,
    setTotalProductsCount,
    totalProductsCount,
    hasFilters,
    setHasFilters,
    dynamicCurrentPage,
    setDynamicCurrentPage,
  } = useFilterStore()

  const debouncedFilters = useDebounce(filters, 500)
  const debouncedSort = useDebounce(sort, 500)

  const totalPages = useMemo(
    () => Math.ceil(totalProductsCount / 12),
    [totalProductsCount],
  )

  const fetchData = useCallback(async () => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort()
    }

    const controller = new AbortController()
    fetchControllerRef.current = controller

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

      const response = await api.get<{
        products: cardDataProps[]
        totalCount: number
      }>('products/get-products', {
        params: params as any,
        signal: controller.signal,
      })

      setProducts(response.products)
      setTotalProductsCount(response.totalCount)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Ошибка получения продуктов:', err)
      }
    } finally {
      setFilteredPage(categoryName)
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
    setFilteredPage,
  ])

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

    if (newUrl.length > 1) {
      router.push(newUrl, { scroll: false })
    }
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, router])

  useEffect(() => {
    if (
      !initialLoad &&
      groupListRef.current &&
      filteredPage &&
      categoryName === filteredPage
    ) {
      groupListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [dynamicCurrentPage, initialLoad])

  useEffect(() => {
    if (filteredPage && categoryName !== filteredPage) {
      resetFilters()
    }
  }, [categoryName, filteredPage])

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

        setHasFilters(true)
      } else {
        setDataIsLoading(false)
        setTotalProductsCount(totalCount)
      }

      setInitialLoad(false)
    }
  }, [
    searchParams,
    setFilters,
    setSort,
    initialProducts,
    totalCount,
    setProducts,
    setTotalProductsCount,
    setDynamicCurrentPage,
    setHasFilters,
  ])

  useEffect(() => {
    if (!initialLoad) {
      updateUrl()

      setDataIsLoading(true)
      setProducts([])
      fetchData()
    }
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, updateUrl])

  return (
    <section className="group-list section-offset" ref={groupListRef}>
      <div className="group-list__container">
        <div className="group-list__body">
          <CatalogFilters
            products={products}
            productsType={productsType}
            categoryName={categoryName}
            onFiltersChange={setFilters}
            categoryInitialList={categoryData}
            currentPage={currentPage}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
          />
          <FilteredList
            data={products}
            currentPage={currentPage}
            dynamicCurrentPage={dynamicCurrentPage}
            setDynamicCurrentPage={setDynamicCurrentPage}
            totalPages={totalPages}
            onChangePage={onChangePage}
            dataIsLoading={dataIsLoading}
            onSortChange={setSort}
            hasFilters={hasFilters}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
          />
        </div>
      </div>
    </section>
  )
}
