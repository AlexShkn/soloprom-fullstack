'use client'
import React, { useState, useCallback, useTransition, useEffect } from 'react'
import './ProductsFilterList.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import axios from 'axios'
import { BASE_URL } from '@/utils/api/products'
import CatalogFilters from '../Filter/CatalogFilters'
import Skeleton from 'react-loading-skeleton'

interface Props {
  categoryName: string
  productsType: string
  currentPage: number
  onChangePage: (newPage: number) => void
  initialProducts: cardDataProps[] | null
  totalCount: number
}

export const ProductsFilterList: React.FC<Props> = ({
  categoryName,
  currentPage,
  onChangePage,
  productsType,
  initialProducts,
  totalCount,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [products, setProductsData] = useState<cardDataProps[]>(
    initialProducts || [],
  )
  const [totalProductsCount, setTotalProductsCount] = useState(totalCount)
  const [dataIsLoading, setDataIsLoading] = useState(false)

  useEffect(() => {
    // Загрузка данных только если есть изменения в фильтрах, сортировке, странице
    if (searchParams.size > 0 || currentPage > 1) {
      setDataIsLoading(true)
      const fetchData = async () => {
        try {
          const params = {
            categoryName: categoryName,
            page: currentPage,
            limit: 12,
            filters: searchParams.get('filters')
              ? JSON.parse(searchParams.get('filters')!)
              : null,
            search: searchParams.get('search'),
            sort: searchParams.get('sort'),
          }

          const response = await axios.get<any>(`${BASE_URL}/get-products`, {
            params,
          })
          setProductsData(response.data.products)
          setTotalProductsCount(response.data.totalCount)
          setDataIsLoading(false)
        } catch (error) {
          console.error('Error fetching products:', error)
          setDataIsLoading(false)
        }
      }

      fetchData()
    }
  }, [categoryName, currentPage, searchParams, initialProducts])

  const handleFiltersChange = useCallback(
    (filters: Record<string, string[]>) => {
      startTransition(() => {
        const params = new URLSearchParams(window.location.search)
        params.set('filters', JSON.stringify(filters))
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, categoryName, startTransition],
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      startTransition(() => {
        const params = new URLSearchParams(window.location.search)
        params.set('sort', sort)
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, categoryName, startTransition],
  )

  const handleSearchChange = useCallback(
    (search: string) => {
      startTransition(() => {
        const params = new URLSearchParams(window.location.search)
        params.set('search', search)
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, categoryName, startTransition],
  )

  return (
    <section className="group-list section-offset">
      <div className="group-list__container">
        <div className={`group-list__body`}>
          {dataIsLoading ? (
            <div className="mr-2.5 w-full">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <Skeleton width={'100%'} height={'40px'} className="mb-5" />
                  <Skeleton width={'100%'} height={'250px'} className="mb-5" />
                </div>
              ))}
            </div>
          ) : (
            <CatalogFilters
              productsType={productsType}
              categoryName={categoryName}
              onFiltersChange={handleFiltersChange}
              onSearchChange={handleSearchChange}
              currentPage={currentPage}
              initialProducts={products}
            />
          )}

          <FilteredList
            data={products}
            currentPage={currentPage}
            totalPages={Math.ceil(totalProductsCount / 12)}
            onChangePage={onChangePage}
            dataIsLoading={dataIsLoading}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </section>
  )
}
