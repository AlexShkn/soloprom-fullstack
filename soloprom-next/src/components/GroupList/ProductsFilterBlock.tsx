'use client'
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CardDataProps, FilterData } from '@/types/products.types'
import { ResultFilteredList } from '@/components/GroupList/ResultFilteredList'
import CatalogFilters from './Filter/CatalogFilters'
import useFilterStore from '@/store/filterStore'
import { useDebounce } from '@/hooks/useDebounce'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

import { api } from '@/utils/fetch/instance.api'

interface Props {
  categoryName: string
  productsType: string
  currentPage: number
  initialProducts: CardDataProps[] | null
  categoryData: FilterData
  pageName: string
}

export const ProductsFilterBlock: React.FC<Props> = ({
  categoryName,
  productsType,
  currentPage,
  initialProducts,
  categoryData,
  pageName,
}) => {
  const router = useRouter()
  const groupListRef = useRef<HTMLElement | null>(null)
  const fetchControllerRef = useRef<AbortController | null>(null)
  const [products, setProducts] = useState(initialProducts || [])
  const [filterOpen, setFilterOpen] = useState(false)
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>(
    {},
  )
  const {
    filteredPage,
    setFilteredPage,
    filters,
    sort,
    setSort,
    setTotalProductsCount,
    totalProductsCount,
    hasFilters,
    dynamicCurrentPage,
    setDataIsLoading,
    setPriceRange,
    resetFilters,
    initialLoad,
  } = useFilterStore()

  console.count('render ProductsFilterBlock')

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

    console.log('CAAAAAALLLLLLLL fetchData')

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
        products: CardDataProps[]
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
      setTimeout(() => {
        setDataIsLoading(false)
      }, 500)
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
    console.log('CAAAAAALLLLLLLL updateUrl')

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

    console.log(newUrl)
    router.push(newUrl, { scroll: false })

    // if (newUrl.length > 1) {
    //   router.push(newUrl, { scroll: false })
    // }
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, router])

  useEffect(() => {
    if (
      !initialLoad &&
      groupListRef.current &&
      filteredPage &&
      categoryName === filteredPage
    ) {
      console.log('scrolllllllllllll')

      groupListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [dynamicCurrentPage, initialLoad])

  useEffect(() => {
    if (filteredPage && categoryName !== filteredPage) {
      console.log('resetFilters')

      resetFilters()
    }
  }, [categoryName, filteredPage])

  useEffect(() => {
    if (!initialLoad && hasFilters) {
      console.log('CAAAAAALLLLLLLL')

      updateUrl()
      setProducts([])
      fetchData()
    }
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, updateUrl])

  const handleResetFilters = () => {
    setPriceRange({
      min: categoryData.prices?.min,
      max: categoryData.prices?.max,
    })
    setCheckedValues({})
    router.push(window.location.pathname, { scroll: false })
    resetFilters()
  }

  const handlerFilterPopup = (status: boolean) => {
    setFilterOpen(status)
    scrollStatusChange(status)
  }

  const handlePageChange = (newPage: number) => {
    const newPath = `/catalog/${pageName}`

    if (newPage > 1) {
      router.push(`${newPath}/${newPage}`)
    } else {
      router.push(newPath)
    }
  }

  return (
    <section className="group-list section-offset" ref={groupListRef}>
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] lg:grid-cols-[240px,1fr]">
          <CatalogFilters
            products={products}
            productsType={productsType}
            categoryName={categoryName}
            categoryInitialList={categoryData}
            currentPage={currentPage}
            filterOpen={filterOpen}
            setFilterOpen={handlerFilterPopup}
            setCheckedValues={setCheckedValues}
            checkedValues={checkedValues}
            handleResetFilters={handleResetFilters}
          />
          <ResultFilteredList
            data={products}
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
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
