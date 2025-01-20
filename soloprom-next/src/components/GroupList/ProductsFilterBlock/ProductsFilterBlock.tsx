'use client'
import React, {
  useState,
  useCallback,
  useTransition,
  useEffect,
  useRef,
} from 'react'
import './ProductsFilterBlock.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import axios from 'axios'
import { BASE_URL } from '@/utils/api/products'
import CatalogFilters from '../Filter/CatalogFilters'
import { useDebounce } from '@/hooks/useDebounce'
import useFilterStore from '@/zustand/filterStore'

interface FilterData {
  types: string[]
  brands: string[]
  prices: { min: number; max: number } | null
  volumes: string[]
  sizes: string[]
  plates: string[]
  voltage: number[]
  container: number[]
  models: string[]
  countries: string[]
  radiuses: string[]
}

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
  currentPage,
  onChangePage,
  productsType,
  initialProducts,
  categoryData,
  totalCount,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const groupListRef = useRef<HTMLElement>(null)
  const fetchControllerRef = useRef<AbortController | null>(null)

  // Zustand store
  const filters = useFilterStore((state) => state.filters)
  const sort = useFilterStore((state) => state.sort)
  const dynamicCurrentPage = useFilterStore((state) => state.dynamicCurrentPage)
  const filteredPage = useFilterStore((state) => state.filteredPage)
  const setFilteredPage = useFilterStore((state) => state.setFilteredPage)
  const products = useFilterStore((state) => state.products)
  const totalProductsCount = useFilterStore((state) => state.totalProductsCount)
  const dataIsLoading = useFilterStore((state) => state.dataIsLoading)
  const hasFilters = useFilterStore((state) => state.hasFilters)
  const setFilters = useFilterStore((state) => state.setFilters)
  const setSort = useFilterStore((state) => state.setSort)
  const setDynamicCurrentPage = useFilterStore(
    (state) => state.setDynamicCurrentPage,
  )
  const setProducts = useFilterStore((state) => state.setProducts)
  const setTotalProductsCount = useFilterStore(
    (state) => state.setTotalProductsCount,
  )
  const setDataIsLoading = useFilterStore((state) => state.setDataIsLoading)
  const setHasFilters = useFilterStore((state) => state.setHasFilters)
  const resetFilters = useFilterStore((state) => state.resetFilters)

  const debouncedFilters = useDebounce(filters, 500)
  const debouncedSort = useDebounce(sort, 500)

  const [firstRender, setFirstRender] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  console.log('render ProductsFilterBlock')

  const fetchData = async () => {
    console.log('fetch data')

    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort()
    }

    const controller = new AbortController()
    fetchControllerRef.current = controller

    setDataIsLoading(true)

    try {
      const params = {
        categoryName: categoryName,
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
      setDataIsLoading(false)
      if (firstRender) setFirstRender(false)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
        return
      }
      console.error('Error fetching products:', error)
      setDataIsLoading(false)
    } finally {
      setFilteredPage(categoryName)
      fetchControllerRef.current = null
    }
  }

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams()

    if (Object.keys(debouncedFilters).length > 0) {
      params.set('filters', JSON.stringify(debouncedFilters))
    } else {
      params.delete('filters')
    }

    if (debouncedSort) {
      params.set('sort', debouncedSort)
    } else {
      params.delete('sort')
    }

    if (dynamicCurrentPage !== 1) {
      params.set('page', String(dynamicCurrentPage))
    } else {
      params.delete('page')
    }

    const newUrl = `?${params.toString()}`
    if (newUrl.length > 1) {
      router.push(newUrl, { scroll: false })
    } else {
      router.push(newUrl, { scroll: false })
    }
  }, [router, debouncedFilters, debouncedSort, dynamicCurrentPage])

  useEffect(() => {
    console.log(categoryName)
    console.log(filteredPage)

    if (filteredPage && categoryName !== filteredPage) {
      console.log('reset')

      resetFilters()
    }
  }, [])

  useEffect(() => {
    const urlFilters = searchParams.get('filters')
    const urlSort = searchParams.get('sort')
    const urlPage = searchParams.get('page')

    if (initialLoad) {
      setProducts(initialProducts || [])
      setTotalProductsCount(totalCount)

      if (urlFilters || urlSort || urlPage) {
        if (urlFilters) {
          try {
            const parsedFilters = JSON.parse(urlFilters) as Record<
              string,
              string[] | number
            >
            setFilters(parsedFilters)
          } catch (error) {
            console.error('Error parsing filters from URL:', error)
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
        setInitialLoad(false)
      } else {
        setInitialLoad(false)
        return
      }
    }
  }, [
    searchParams,
    setFilters,
    setSort,
    setDynamicCurrentPage,
    setInitialLoad,
    initialLoad,
    initialProducts,
    totalCount,
    setProducts,
    setTotalProductsCount,
  ])

  useEffect(() => {
    if (!initialLoad && hasFilters) {
      fetchData()
    }
  }, [
    debouncedFilters,
    debouncedSort,
    dynamicCurrentPage,
    setProducts,
    setTotalProductsCount,
    setDataIsLoading,
    setFirstRender,
    initialLoad,
  ])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])

  useEffect(() => {
    if (groupListRef.current && hasFilters) {
      groupListRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [dynamicCurrentPage, router, hasFilters])

  const handleFiltersChange = (filters: Record<string, string[] | number>) => {
    setFilters(filters)
    setHasFilters(true)
  }

  const handleSortChange = (sort: string) => {
    setSort(sort)
    setHasFilters(true)
  }
  return (
    <section className="group-list section-offset" ref={groupListRef}>
      <div className="group-list__container">
        <div className={`group-list__body`}>
          <CatalogFilters
            productsType={productsType}
            categoryName={categoryName}
            onFiltersChange={handleFiltersChange}
            initialFilters={filteredPage !== categoryName ? {} : filters}
            currentPage={currentPage}
            categoryInitialList={categoryData}
          />

          <FilteredList
            data={products}
            currentPage={currentPage}
            dynamicCurrentPage={dynamicCurrentPage}
            setDynamicCurrentPage={setDynamicCurrentPage}
            totalPages={Math.ceil(totalProductsCount / 12)}
            onChangePage={onChangePage}
            dataIsLoading={dataIsLoading}
            onSortChange={handleSortChange}
            hasFilters={hasFilters}
          />
        </div>
      </div>
    </section>
  )
}
