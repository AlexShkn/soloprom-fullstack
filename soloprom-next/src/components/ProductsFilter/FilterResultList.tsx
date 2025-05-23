'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ProductsCard } from '@/components/ProductsCard/ProductsCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from '@/components/ui'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

interface Props {
  activeCategoryTab: 'tires' | 'battery'
  handleResetFilters: () => void
}

const ITEMS_PER_PAGE = 10

export const FilterResultList: React.FC<Props> = ({
  handleResetFilters,
  activeCategoryTab,
}) => {
  const {
    filtersProducts,
    isLoading,
    setIsLoadingMore,
    isLoadingMore,
    filters,
    fetchProductsOptions,
    currentPage,
    totalPages,
    productCount,
  } = useProductsFilterStore()

  const [visibleProducts, setVisibleProducts] = useState<any[]>([])
  const containerRef = useRef<HTMLUListElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const viewMode = 'grid'

  const remains =
    productCount - visibleProducts.length < 10
      ? productCount - visibleProducts.length
      : ITEMS_PER_PAGE

  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || currentPage > totalPages) return

    setIsLoadingMore(true)
    await fetchProductsOptions(
      filters,
      activeCategoryTab,
      handleResetFilters,
      'products',
      ITEMS_PER_PAGE,
      currentPage,
    )

    setIsLoadingMore(false)
  }, [
    filters,
    activeCategoryTab,
    handleResetFilters,
    isLoadingMore,
    currentPage,
    totalPages,
    fetchProductsOptions,
  ])

  useEffect(() => {
    setVisibleProducts(filtersProducts)
  }, [filtersProducts])

  useEffect(() => {
    const currentContainer = containerRef.current

    if (!currentContainer) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadingMore) {
            loadMoreProducts()
          }
        })
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.5,
      },
    )

    if (currentContainer) {
      observerRef.current.observe(currentContainer)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreProducts, isLoadingMore])

  const handleResetList = () => {
    handleResetFilters()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-container py-5">
      <ul
        className={
          'grid grid-cols-1 gap-3 pb-4 pt-2.5 mds:grid-cols-2 mds:p-2.5 xl:grid-cols-3 2xl:grid-cols-5'
        }
      >
        {isLoading && visibleProducts.length === 0
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                width={'100%'}
                style={{ borderRadius: '2.25rem' }}
                height={viewMode === 'grid' ? '320px' : '177px'}
              />
            ))
          : visibleProducts.map((item) => (
              <ProductsCard
                key={item.productId}
                cardData={item}
                mod={viewMode}
              />
            ))}
        {isLoadingMore &&
          Array.from({ length: remains }).map((_, index) => (
            <Skeleton
              key={`loading-${index}`}
              width={'100%'}
              style={{ borderRadius: '2.25rem' }}
              height={viewMode === 'grid' ? '320px' : '177px'}
            />
          ))}
      </ul>
      <ul ref={containerRef} className="trigger"></ul>

      {productCount === visibleProducts.length && (
        <div className="py-10 text-center text-2xl font-bold">
          <Button
            variant={'outline'}
            onClick={handleResetList}
            className="border-1 mx-auto mt-5 hidden rounded border border-accentBlue px-4 py-2.5 font-medium text-accentBlue md:flex"
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  )
}
