'use client'
import React, { useState, useCallback, useTransition } from 'react'

import './ProductsFilterList.scss'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'

interface Props {
  categoryName: string
  setProducts: React.Dispatch<React.SetStateAction<cardDataProps[]>>
  data: cardDataProps[]
}

export const ProductsFilterList: React.FC<Props> = ({
  categoryName,
  setProducts,
  data,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

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
          <FilteredList data={data} />
        </div>
      </div>
    </section>
  )
}
