// ProductsFilterList.tsx
'use client'
import React, { useState, useCallback, useTransition, useEffect } from 'react'

import './ProductsFilterList.scss'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import axios from 'axios'
import { BASE_URL } from '@/app/api/routes/products/route'

interface Props {
  categoryName: string
  // setProducts: React.Dispatch<React.SetStateAction<cardDataProps[]>>
  data: cardDataProps[]
  currentPage: number
  // totalPages: number
  onChangePage: (newPage: number) => void
}

export const ProductsFilterList: React.FC<Props> = ({
  categoryName,
  data,
  currentPage,
  onChangePage,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [products, setProductsData] = useState<cardDataProps[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          categoryName: categoryName,
          page: currentPage,
          limit: 10,
        }

        const response = await axios.get<any>(`${BASE_URL}/get-products`, {
          params,
        })
        setProductsData(response.data.products)
        setTotalCount(response.data.totalCount)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [categoryName, currentPage])

  const handleFiltersChange = useCallback(
    (filters: Record<string, string[]>) => {
      const params = new URLSearchParams(searchParams)
      params.set('filters', JSON.stringify(filters))
      startTransition(() => {
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, searchParams, categoryName, startTransition],
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('sort', sort)
      startTransition(() => {
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, searchParams, categoryName, startTransition],
  )

  const handleSearchChange = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('search', search)
      startTransition(() => {
        router.push(`/catalog/${categoryName}?${params.toString()}`)
      })
    },
    [router, searchParams, categoryName, startTransition],
  )

  return (
    <section className="group-list section-offset">
      <div className="group-list__container">
        <div className="group-list__body">
          <FilterPanel
            categoryName={categoryName}
            onFiltersChange={handleFiltersChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
          />
          <FilteredList
            data={products}
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / 10)}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </section>
  )
}
