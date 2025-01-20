'use client'
import React, {
  useState,
  useCallback,
  useTransition,
  useEffect,
  useRef,
} from 'react'
import './ProductsFilterBlock.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { cardDataProps } from '@/types/products.types'
import { FilteredList } from '@/components/GroupList/FilteredList/FilteredList'
import axios from 'axios'
import { BASE_URL } from '@/utils/api/products'
import CatalogFilters from '../Filter/CatalogFilters'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDebounce } from '@/hooks/useDebounce'

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
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [products, setProductsData] = useState<cardDataProps[]>(
    initialProducts || [],
  )
  const [totalProductsCount, setTotalProductsCount] = useState(totalCount)
  const [dataIsLoading, setDataIsLoading] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<
    Record<string, string[] | number>
  >({})
  const [currentSort, setCurrentSort] = useState<string>('')
  const [dynamicCurrentPage, setDynamicCurrentPage] = useState(1)
  const [hasFilters, setHasFilters] = useState(false)
  const groupListRef = useRef<HTMLElement>(null)
  const debouncedFilters = useDebounce(currentFilters, 500)
  const debouncedSort = useDebounce(currentSort, 500)
  const [firstRender, setFirstRender] = useState(true)

  console.log('render ProductsFilterBlock')

  const fetchData = async () => {
    console.log('fetch data')

    setDataIsLoading(true)
    try {
      const params = {
        categoryName: categoryName,
        page: dynamicCurrentPage,
        limit: 12,
        filters:
          Object.keys(debouncedFilters).length > 0
            ? JSON.stringify(debouncedFilters)
            : null,
        sort: debouncedSort,
      }
      const response = await axios.get<any>(`${BASE_URL}/get-products`, {
        params,
      })
      setProductsData(response.data.products)
      setTotalProductsCount(response.data.totalCount)
      setDataIsLoading(false)
      if (firstRender) setFirstRender(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setDataIsLoading(false)
    }
  }

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams()

    if (Object.keys(debouncedFilters).length > 0) {
      params.set('filters', JSON.stringify(debouncedFilters))
    } else {
      params.delete('filters')
    }

    if (debouncedSort) {
      params.set('sort', debouncedSort)
    } else {
      params.delete('sort')
    }

    if (dynamicCurrentPage !== 1) {
      params.set('page', String(dynamicCurrentPage))
    } else {
      params.delete('page')
    }

    const newUrl = `?${params.toString()}`
    console.log(newUrl)

    console.log(newUrl.length)

    if (newUrl.length > 1) {
      console.log('push')

      router.push(newUrl, { scroll: false })
    }
  }, [router, debouncedFilters, debouncedSort, dynamicCurrentPage])

  useEffect(() => {
    const urlFilters = searchParams.get('filters')
    const urlSort = searchParams.get('sort')
    const urlPage = searchParams.get('page')

    if (urlFilters) {
      try {
        const parsedFilters = JSON.parse(urlFilters) as Record<
          string,
          string[] | number
        >
        setCurrentFilters(parsedFilters)
      } catch (error) {
        console.error('Error parsing filters from URL:', error)
      }
    }

    if (urlSort) {
      setCurrentSort(urlSort)
    }

    if (urlPage) {
      const parsedPage = parseInt(urlPage, 10)
      if (!isNaN(parsedPage)) {
        console.log('set-page:', parsedPage)

        setDynamicCurrentPage(parsedPage)
      }
    }
  }, [searchParams])

  useEffect(() => {
    fetchData()
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage])

  useEffect(() => {
    updateUrl()
  }, [debouncedFilters, debouncedSort, dynamicCurrentPage, updateUrl])

  useEffect(() => {
    if (groupListRef.current && hasFilters) {
      console.log('scroll')
      groupListRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [dynamicCurrentPage, router])

  const handleFiltersChange = (filters: Record<string, string[] | number>) => {
    console.log(filters)
    setDynamicCurrentPage(1)

    setCurrentFilters(filters)
    setHasFilters(true)
  }

  const handleSortChange = (sort: string) => {
    setHasFilters(true)
    setCurrentSort(sort)
  }

  return (
    <section className="group-list section-offset" ref={groupListRef}>
      <div className="group-list__container">
        <div className={`group-list__body`}>
          <CatalogFilters
            productsType={productsType}
            categoryName={categoryName}
            onFiltersChange={handleFiltersChange}
            initialFilters={currentFilters}
            currentPage={currentPage}
            categoryInitialList={categoryData}
          />

          <FilteredList
            data={products}
            currentPage={currentPage}
            dynamicCurrentPage={dynamicCurrentPage}
            setDynamicCurrentPage={setDynamicCurrentPage}
            totalPages={Math.ceil(totalProductsCount / 12)}
            onChangePage={onChangePage}
            dataIsLoading={dataIsLoading}
            onSortChange={handleSortChange}
            hasFilters={hasFilters}
          />
        </div>
      </div>
    </section>
  )
}
