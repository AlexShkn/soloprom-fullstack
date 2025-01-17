'use client'
import React, { useState, useCallback, useTransition, useEffect } from 'react'
import './ProductsFilterBlock.scss'
import { useRouter } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import axios from 'axios'
import { BASE_URL } from '@/utils/api/products'
import CatalogFilters from '../Filter/CatalogFilters'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  categoryName: string
  productsType: string
  currentPage: number
  onChangePage: (newPage: number) => void
  initialProducts: cardDataProps[] | null
  categoryData: cardDataProps[] | null
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
  const [isPending, startTransition] = useTransition()
  const [products, setProductsData] = useState<cardDataProps[]>(
    initialProducts || [],
  )
  const [totalProductsCount, setTotalProductsCount] = useState(totalCount)
  const [dataIsLoading, setDataIsLoading] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<
    Record<string, string[]>
  >({})
  const [currentSearch, setCurrentSearch] = useState<string>('')
  const [currentSort, setCurrentSort] = useState<string>('')

  const fetchData = async () => {
    setDataIsLoading(true)
    try {
      const params = {
        categoryName: categoryName,
        page: currentPage,
        limit: 12,
        filters:
          Object.keys(currentFilters).length > 0
            ? JSON.stringify(currentFilters)
            : null,
        search: currentSearch,
        sort: currentSort,
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

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setCurrentFilters(filters)
  }

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort)
  }

  const handleSearchChange = (search: string) => {
    setCurrentSearch(search)
  }

  const handleApplyFilters = () => {
    startTransition(fetchData)
  }

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
              onApplyFilters={handleApplyFilters}
              currentPage={currentPage}
              categoryInitialList={categoryData}
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
