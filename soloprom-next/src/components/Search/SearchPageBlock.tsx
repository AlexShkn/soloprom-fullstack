'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { searchProducts } from '@/utils/api/products'
import { SearchFilterBlock } from './SearchFilterBlock'
import useSearchStore from '@/store/searchStore'
import { CardDataProps } from '@/types/products.types'

export const SearchPageBlock = () => {
  const searchParams = useSearchParams()
  const initialSearchValue = searchParams.get('search') || ''
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [initProducts, setInitProducts] = useState<CardDataProps[]>([])

  const { foundProducts, setFoundProducts, setDataIsLoading } = useSearchStore()

  const fetchData = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm) {
        setFoundProducts([])
        return
      }

      try {
        const data = await searchProducts('name', searchTerm)
        console.log(data)
        setInitProducts(data)
        setFoundProducts(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        console.log('загружено')

        setDataIsLoading(false)
      }
    },
    [setFoundProducts],
  )

  useEffect(() => {
    if (initialSearchValue) {
      setSearchValue(initialSearchValue)
    }
  }, [initialSearchValue])

  useEffect(() => {
    fetchData(searchValue)
  }, [searchValue])

  return (
    <div className="page-container pt-10">
      <div className="mb-10">
        <h1 className="text-2xl">
          <span className="font-bold">Поиск по запросу:</span>{' '}
          <span className="text-accentBlue underline">{searchValue}</span>
        </h1>
        <div className=""> Найдено: {foundProducts.length}</div>
      </div>
      <SearchFilterBlock
        initialProducts={initProducts}
        searchValue={searchValue}
      />
    </div>
  )
}
