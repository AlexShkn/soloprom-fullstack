'use client'

import React, { useEffect, useLayoutEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useFilterStore from '@/store/useFilterStore'

interface Props {}

const CategoryPageParams: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const urlFilters = searchParams.get('filters')
  const urlSort = searchParams.get('sort')
  const urlPage = searchParams.get('page')

  const {
    setFilters,
    setSort,
    setDynamicCurrentPage,
    setHasFilters,
    setDataIsLoading,
    setInitialLoad,
    initialLoad,
  } = useFilterStore()

  useEffect(() => {
    if (initialLoad) {
      if (urlFilters || urlSort || urlPage) {
        if (urlFilters) {
          try {
            const parsedFilters = JSON.parse(urlFilters)
            setFilters(parsedFilters)
            setHasFilters(true)
          } catch (err) {
            console.error(
              'Не удалось проанализировать фильтры по URL-адресу:',
              err,
            )
          }
        }

        if (urlSort) {
          setSort(urlSort)
        }

        if (urlPage) {
          const parsedPage = parseInt(urlPage, 10)
          if (!isNaN(parsedPage)) {
            setDynamicCurrentPage(parsedPage)
          }
        }

        setHasFilters(true)
      } else {
        setDataIsLoading(false)
      }

      setInitialLoad(false)
    }
  }, [])

  return <div style={{ display: 'none' }}></div>
}

export default CategoryPageParams
