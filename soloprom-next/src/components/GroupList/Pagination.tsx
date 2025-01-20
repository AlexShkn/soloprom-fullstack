// components/GroupList/Pagination.tsx
'use client'
import React from 'react'

interface Props {
  currentPage: number
  totalPages: number
  onChangePage: (newPage: number) => void
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onChangePage,
  totalPages,
}) => {
  const generatePageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
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
    <div className="my-5 flex flex-col items-center">
      <div className="mb-5 flex items-center justify-center">
        {currentPage > 1 && (
          <button
            className="flex h-[48px] w-[48px] items-center justify-center rounded text-lg font-bold"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === totalPages}
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
                className="flex h-[48px] w-[48px] items-center justify-center rounded text-lg font-bold"
              >
                <p>...</p>
              </div>
            ) : (
              <div
                key={index}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded text-lg font-bold ${currentPage === page ? 'bg-accentBlue text-white' : 'link-hover'}`}
              >
                <button
                  className="block h-full w-full"
                  onClick={() => onChangePage(page as number)}
                >
                  {page}
                </button>
              </div>
            ),
          )}
        </div>
        <button
          className="flex h-[48px] w-[48px] items-center justify-center rounded text-lg font-bold"
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg className="icon h-5 w-5 rotate-[-90deg] fill-darkBlue transition-colors hover:fill-accentBlue">
            <use xlinkHref="/img/sprite.svg#arrow-drop" />
          </svg>
        </button>
      </div>
    </div>
  )
}
