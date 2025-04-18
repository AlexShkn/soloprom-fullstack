import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { searchPages, searchProducts } from '@/utils/api/products'
import { Search, XIcon } from 'lucide-react'

import { CardDataProps } from '@/types/products.types'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'
import { useRouter } from 'next/navigation'
import useSearchStore from '@/store/searchStore'
import clsx from 'clsx'

interface PageItem {
  url: string
  img: string
  title: string
  type: string
  description: string
}

const HeaderSearch = () => {
  const { catalogMenuStateChange, catalogIsOpen } = useCatalogMenuStore()
  const { setFoundProducts, setInitProducts } = useSearchStore()
  const [searchValue, setSearchValue] = useState<string>('')
  const [products, setProducts] = useState<CardDataProps[]>([])
  const [pages, setPages] = useState<PageItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dropStatus, setDropStatus] = useState<boolean>(false)

  const dropRef = useRef(null)
  const router = useRouter()

  useClickOutside(dropRef, () => {
    if (searchValue) {
      resetSearch()
    }
  })

  const searchProductsForValue = useCallback(
    async (name: string): Promise<void> => {
      if (name.trim() === '' && setProducts.length) {
        setProducts([])
        return
      }

      try {
        setIsLoading(true)
        const productsResponse = await searchProducts('name', name)
        const pagesResponse = await searchPages('value', name)
        const productsData: CardDataProps[] = await productsResponse

        setProducts(productsData)
        setPages(pagesResponse)
      } catch (error) {
        console.error('Во время поиска произошла ошибка:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    },
    [setProducts, setIsLoading],
  )

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProductsForValue(searchValue)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, searchProductsForValue])

  const resetSearch = () => {
    setSearchValue('')
    setProducts([])
    setIsLoading(true)
    setDropStatus(false)
  }

  const inputFieldValue = (value: string) => {
    if (!dropStatus) {
      setDropStatus(true)
    }

    setSearchValue(value)
  }

  const goToSearch = (value: string) => {
    setInitProducts(products)
    setFoundProducts(products)
    setDropStatus(false)
    router.push(`/search?search=${encodeURIComponent(value)}`)

    setSearchValue('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue) {
      event.preventDefault()
      goToSearch(searchValue)
      setSearchValue('')
    }
  }

  return (
    <div
      ref={dropRef}
      className={`header-bottom__catalog-field flex transition-all ${searchValue && dropStatus ? 'fixed left-0 top-0 z-50 w-full md:relative md:max-w-[650px]' : 'relative rounded-custom bg-[#f4f5fa] md:max-w-[450px]'} flex-auto items-center`}
    >
      <button
        onClick={() => resetSearch()}
        className={clsx(
          'fixed left-0 top-0 h-screen w-full cursor-pointer transition-all',
          {
            'bg-white md:bg-[rgba(31,31,32,0.22)]': searchValue && dropStatus,
            'invisible opacity-0': !searchValue && !dropStatus,
          },
        )}
      ></button>
      <div
        className={`relative z-10 flex w-full items-center rounded-custom ${searchValue && dropStatus && 'rounded-none bg-white py-2 md:rounded-custom md:py-0'}`}
      >
        {/* <span className="absolute bottom-[calc(100%+2px)] right-0 text-sm font-medium text-darkBlue">
          Расширенный поиск
        </span> */}
        <div className="relative h-full w-full pl-3">
          <Search className="absolute left-4 top-[50%] h-4 w-4 translate-y-[-50%] stroke-[#c2c5da]" />
          <input
            type="text"
            name="search-product"
            id="search-product-input"
            value={searchValue}
            onChange={(e) => inputFieldValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => catalogIsOpen && catalogMenuStateChange(false)}
            placeholder="Поиск по наименованию"
            className={clsx(
              'h-full w-full rounded-bl-custom rounded-tl-custom px-5 py-[13px] placeholder:text-sm placeholder:text-[#c2c5da] lg:px-8 lg:py-4',
              {
                'bg-white': searchValue && dropStatus,
                'bg-[#f4f5fa]': searchValue || !dropStatus,
              },
            )}
          />
        </div>
        <button
          type="button"
          onClick={resetSearch}
          className={`mr-1 flex h-full items-center justify-center p-2 text-sm transition-all lg:h-auto ${!searchValue && 'invisible opacity-0'}`}
        >
          <XIcon className={'h-5 w-5 stroke-darkBlue'} />
        </button>
        <button
          type="button"
          onClick={() => goToSearch(searchValue)}
          className="button mr-1 h-full rounded-custom p-[12px] text-sm mdl:px-5 mdl:py-[14px] md:mr-0 lg:h-auto lg:px-4 lg:py-4 lg:text-base"
        >
          <span className="hidden text-sm font-medium mdl:inline-block">
            Найти
          </span>

          <svg className="icon h-5 w-5 fill-white mdl:hidden">
            <use xlinkHref="/img/sprite.svg#search"></use>
          </svg>
        </button>
      </div>

      {searchValue && dropStatus && (
        <div className="absolute left-0 top-[100%] mt-1 w-full overflow-hidden">
          {pages.length > 0 && (
            <ul className="scroll-bar mb-1 flex max-h-28 w-full flex-wrap items-center gap-1 overflow-y-auto rounded-sm bg-white p-2">
              {pages.map((link) => (
                <li
                  key={link.url}
                  className="w-auto overflow-hidden rounded-custom border border-gray-500"
                >
                  <Link
                    href={link.url}
                    className="flex items-center gap-2.5 whitespace-nowrap bg-white px-2.5 py-1 text-ss hover:text-accentBlue"
                  >
                    <Image
                      src={`${link.img}.webp`}
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      alt=""
                    />
                    <div className="flex flex-col gap-1 leading-none">
                      <span className="text-gray-400">{link.type}</span>
                      <span className="font-medium">{link.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <ul
            className={`scroll-bar flex max-h-[calc(100vh-70px)] w-full flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded bg-white pb-2.5 shadow-custom md:max-h-[50vh] md:min-h-[50vh] ${isLoading && 'load'}`}
          >
            {searchValue && products.length
              ? products.map((item) => (
                  <li
                    key={item.productId}
                    className="header-bottom__catalog-search-item link-hover w-full transition-all even:bg-gray-100"
                  >
                    <Link
                      href={item.url}
                      className="inline-flex w-full items-center gap-2.5 px-4 py-2 hover:bg-hoverBlue hover:text-white"
                    >
                      <Image
                        className="inline-block h-7 object-contain"
                        src={
                          (item.img && `/img/catalog/${item.img}.webp`) ||
                          `/img/brands/${item.brandName.toLowerCase()}.webp`
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
