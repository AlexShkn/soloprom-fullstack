import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { searchProducts } from '@/utils/api/products'
import { DebouncedFunction } from '@/supports/debounce'
import { debounce } from '@/supports/debounce'

import { cardDataProps } from '@/types/products.types'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'

const HeaderSearch = () => {
  const { catalogMenuStateChange, catalogIsOpen } = useCatalogMenuStore()
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
      const data: cardDataProps[] = await response
      setProducts(data)
    } catch (error) {
      console.error('Во время поиска произошла ошибка:', error)
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
      className="header-bottom__catalog-field relative flex max-w-[600px] flex-auto items-center rounded-custom bg-[#f4f5fa]"
    >
      <div className="relative h-full w-full">
        <input
          type="text"
          name="search-product"
          id="search-product-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => catalogIsOpen && catalogMenuStateChange(false)}
          placeholder="Поиск по наименованию и размеру"
          className="h-full w-full rounded-bl-custom rounded-tl-custom bg-[#f4f5fa] px-5 py-[13px] placeholder:text-sm placeholder:text-[#c2c5da] lg:px-8 lg:py-4"
        />
      </div>
      <button
        type="button"
        id="search-product-btn"
        onClick={resetSearch}
        className="button h-full rounded-custom p-[12px] text-sm mdl:px-5 mdl:py-[14px] lg:h-auto lg:px-8 lg:py-[13px] lg:text-base"
      >
        <span className="hidden mdl:inline-block">
          {' '}
          {searchValue ? 'Сбросить' : 'Найти'}{' '}
        </span>
        <svg className="icon h-5 w-5 fill-white mdl:hidden">
          <use xlinkHref="/img/sprite.svg#search"></use>
        </svg>
      </button>

      {searchValue && (
        <div className="absolute left-0 top-[100%] mt-1 w-full overflow-hidden">
          <ul
            className={`header-bottom__catalog-search-list scroll-bar flex h-full max-h-[50vh] min-h-[50vh] w-full flex-col overflow-y-auto overflow-x-hidden rounded bg-white shadow-custom ${isLoading && 'load'}`}
          >
            {searchValue && products.length
              ? products.map((item) => (
                  <li
                    key={item.productId}
                    className="header-bottom__catalog-search-item link-hover w-full transition-all even:bg-[#e0e0e0]"
                  >
                    <Link
                      href={item.url}
                      className="inline-flex w-full items-center gap-2.5 px-4 py-2 hover:bg-hoverBlue hover:text-white"
                    >
                      <Image
                        className="inline-block h-7 object-contain"
                        src={
                          (item.img && `/img/catalog/${item.img}.webp`) ||
                          `/img/brands/${item.brandName}.webp`
                        }
                        width={28}
                        height={28}
                        alt={item.name}
                      />
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
