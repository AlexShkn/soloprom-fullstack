'use client'
import React from 'react'

interface Props {
  currentPage: number
  totalPages: number
  totalProductsCount: number
  pageProductCount: number
  setDynamicCurrentPage: (newPage: number) => void
}

export const DynamicPagination: React.FC<Props> = React.memo(
  ({
    currentPage,
    totalProductsCount,
    totalPages,
    setDynamicCurrentPage,
    pageProductCount,
  }) => {
    const prevProductsCount = pageProductCount * currentPage

    const generatePageNumbers = () => {
      const pages = []
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 2) {
          for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pages.push(i)
          }
          if (totalPages > 3) {
            pages.push('...')
            pages.push(totalPages)
          }
        } else if (currentPage >= totalPages - 1) {
          pages.push(1)
          pages.push('...')
          for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          pages.push(currentPage - 1)
          pages.push(currentPage)
          pages.push(currentPage + 1)
          pages.push('...')
          pages.push(totalPages)
        }
      }
      return pages
    }

    const pageNumbers = generatePageNumbers()
    return (
      <div className="relative my-5 flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center lg:mb-0">
          {currentPage > 1 && (
            <button
              className="flex h-10 w-10 items-center justify-center rounded text-lg font-bold"
              onClick={() => setDynamicCurrentPage(currentPage - 1)}
            >
              <svg className="icon h-5 w-5 rotate-[90deg] fill-darkBlue transition-colors hover:fill-accentBlue">
                <use xlinkHref="/img/sprite.svg#arrow-drop" />
              </svg>
            </button>
          )}

          <div className="flex items-center">
            {pageNumbers.map((page, index) =>
              page === '...' ? (
                <div
                  key={index}
                  className="flex items-center justify-center rounded text-lg font-bold"
                >
                  <p>...</p>
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex h-11 w-11 items-center justify-center rounded-custom text-lg font-bold ${
                    currentPage === page
                      ? 'bg-accentBlue text-white'
                      : 'link-hover'
                  }`}
                >
                  <button
                    className="block h-full w-full"
                    onClick={() => setDynamicCurrentPage(page as number)}
                  >
                    {page}
                  </button>
                </div>
              ),
            )}
          </div>
          {currentPage < totalPages && (
            <button
              className="flex h-10 w-10 items-center justify-center rounded text-lg font-bold"
              onClick={() => setDynamicCurrentPage(currentPage + 1)}
            >
              <svg className="icon h-5 w-5 rotate-[-90deg] fill-darkBlue transition-colors hover:fill-accentBlue">
                <use xlinkHref="/img/sprite.svg#arrow-drop" />
              </svg>
            </button>
          )}
        </div>
        <div className="text-center font-medium lg:absolute lg:bottom-2 lg:right-0">
          Показано{' '}
          {prevProductsCount > totalProductsCount
            ? totalProductsCount
            : prevProductsCount}{' '}
          из {totalProductsCount}
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.currentPage === nextProps.currentPage &&
      prevProps.totalPages === nextProps.totalPages
    )
  },
)
