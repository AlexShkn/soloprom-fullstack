'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { searchProducts } from '@/utils/api/products'
import { SearchFilterBlock } from './SearchFilterBlock'
import useSearchStore from '@/store/searchStore'
import { Loading } from '../ui'

export const SearchPageBlock = () => {
  const searchParams = useSearchParams()
  const initialSearchValue = searchParams.get('search') ?? ''
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [isLoading, setIsLoading] = useState(true)

  const {
    initProducts,
    foundProducts,
    setFoundProducts,
    setDataIsLoading,
    setInitProducts,
  } = useSearchStore()

  const fetchData = useCallback(async (searchTerm: string) => {
    if (!searchTerm) {
      setFoundProducts([])
      return
    }

    setDataIsLoading(true)

    try {
      const data = await searchProducts('name', searchTerm)
      console.log('DATA LOAD', data)
      setInitProducts(data)
      setFoundProducts(data)
    } catch (error) {
      console.error('Ошибка получения данных:', error)
    } finally {
      setDataIsLoading(false)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialSearchValue) {
      setSearchValue(initialSearchValue)
      fetchData(initialSearchValue)
    }
  }, [initialSearchValue, fetchData])

  let content

  if (isLoading) {
    content = <Loading />
  } else if (foundProducts.length > 0) {
    content = (
      <SearchFilterBlock
        initialProducts={initProducts}
        searchValue={searchValue}
      />
    )
  } else {
    content = (
      <div className="py-10 text-center text-2xl text-gray-500">
        К сожалению, по запросу "{searchValue}" ничего не найдено.
      </div>
    )
  }

  return (
    <div className="page-container pt-10">
      {initialSearchValue ? (
        <>
          <div className="mb-10">
            <h1 className="text-2xl">
              <span className="font-bold">Поиск по запросу:</span>{' '}
              <span className="text-accentBlue underline">{searchValue}</span>
            </h1>
            <div className=""> Найдено: {foundProducts.length}</div>
          </div>

          {content}
        </>
      ) : (
        <div className="py-10 text-center text-2xl text-gray-500">
          Введите поисковый запрос.
        </div>
      )}
    </div>
  )
}
