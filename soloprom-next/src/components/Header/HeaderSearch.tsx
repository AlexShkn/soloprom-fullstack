import React, { useEffect, useState, useRef } from 'react'
import { searchProducts } from '@/utils/api/products'
import CloseButton from '@/components/shared/CloseButton'
import { DebouncedFunction } from '@/supports/debounce'
import { debounce } from '@/supports/debounce'

import { cardDataProps } from '@/types/products.types'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [products, setProducts] = useState<cardDataProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dropRef = useRef(null)

  useClickOutside(dropRef, () => {
    if (searchValue) {
      resetSearch()
    }
  })

  const searchProductsForValue = async (name: string): Promise<void> => {
    if (name.trim() === '') {
      setProducts([])
      return
    }

    try {
      setIsLoading(true)
      const response = await searchProducts('name', name)
      const data: cardDataProps[] = await response.data
      setProducts(data)
    } catch (error) {
      console.error('An error occurred while searching:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch: DebouncedFunction<(value: string) => Promise<void>> =
    debounce((value) => searchProductsForValue(value), 300)

  useEffect(() => {
    debouncedSearch(searchValue)
    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel()
    }
  }, [searchValue])

  const resetSearch = () => {
    setSearchValue('')
    setProducts([])
    setIsLoading(true)
  }

  return (
    <div
      ref={dropRef}
      className="header-bottom__catalog-field relative flex max-w-[600px] flex-auto items-center"
    >
      <div className="relative h-full w-full">
        <input
          type="text"
          name="search-product"
          id="search-product-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск по наименованию и размеру"
          className="rounded-tl-4 rounded-bl-4 h-full w-full bg-[#f4f5fa] px-8 py-4 placeholder:text-sm placeholder:text-[#c2c5da]"
        />
        <ul className="absolute right-2.5 top-[50%] flex translate-y-[-50%] gap-1">
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            АКБ
          </li>
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            Шины
          </li>
          <li className="hidden rounded bg-white p-2.5 text-sm font-bold">
            Опоры
          </li>
        </ul>
      </div>
      <button
        type="button"
        id="search-product-btn"
        onClick={resetSearch} // Добавляем обработчик клика для очистки
        className="button rounded-tr-4 rounded-br-4 px-8 py-4"
      >
        <span> {searchValue ? 'Сбросить' : 'Найти'} </span>
        <svg className="icon hidden h-5 w-5 fill-white">
          <use xlinkHref="/img/sprite.svg#search"></use>
        </svg>
      </button>

      {searchValue && (
        <div className="absolute left-0 top-[100%] mt-1 w-full overflow-hidden">
          <ul
            className={`header-bottom__catalog-search-list scroll-bar flex h-full max-h-[50vh] w-full flex-col overflow-y-auto overflow-x-hidden rounded bg-white shadow-custom ${isLoading && 'load'}`}
          >
            {searchValue && products.length
              ? products.map((item) => (
                  <li
                    key={item.productId}
                    className="header-bottom__catalog-search-item link-hover w-full transition-all even:bg-[#e0e0e0]"
                  >
                    <Link
                      href={item.url}
                      className="inline-flex w-full items-center justify-between gap-2.5 px-4 py-2 hover:bg-hoverBlue hover:text-white"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))
              : !isLoading && (
                  <li className="block h-full w-full p-5 text-center">
                    Ничего не найдено
                  </li>
                )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default HeaderSearch
