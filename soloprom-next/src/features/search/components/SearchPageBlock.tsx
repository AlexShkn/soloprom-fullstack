'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { searchPages, searchProducts } from '@/utils/api/products'
import { SearchFilterBlock } from './SearchFilterBlock'
import useSearchStore from '@/store/searchStore'
import { Loading } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

export const SearchPageBlock = () => {
  const searchParams = useSearchParams()
  const initialSearchValue = searchParams.get('search') ?? ''
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [isLoading, setIsLoading] = useState(true)

  const {
    initProducts,
    foundProducts,
    initPages,
    setFoundProducts,
    setDataIsLoading,
    setInitProducts,
    setInitPages,
  } = useSearchStore()

  const fetchData = useCallback(async (searchTerm: string) => {
    if (!searchTerm) {
      setFoundProducts([])
      return
    }

    setDataIsLoading(true)

    try {
      const data = await searchProducts(['name', 'descr'], searchTerm)
      const pages = await searchPages('value', searchTerm)
      setInitProducts(data)
      setFoundProducts(data)
      setInitPages(pages)
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
  }, [initialSearchValue])

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
          {initPages.length > 0 && (
            <div className="">
              <div className="mb-4 text-lg font-medium">Страницы товаров:</div>
              <ul className="mb-1 flex w-full flex-wrap items-center gap-2 rounded-sm">
                {initPages.map((link) => (
                  <li
                    key={link.url}
                    className="w-auto overflow-hidden rounded-custom border border-gray-500"
                  >
                    <Link
                      href={link.url}
                      className="flex items-center gap-2.5 whitespace-nowrap bg-white p-2.5 hover:text-accentBlue"
                    >
                      <Image
                        src={`${link.img}.webp`}
                        width={28}
                        height={28}
                        className="h-7 w-7"
                        alt=""
                      />
                      <div className="flex flex-col gap-1 leading-none">
                        <span className="text-ss text-gray-400">
                          {link.type}
                        </span>
                        <span className="font-medium">{link.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
