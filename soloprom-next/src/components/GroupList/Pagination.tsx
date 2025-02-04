'use client'
import { getCurrentWindowSize } from '@/supports'
import React, { useEffect, useLayoutEffect, useState } from 'react'

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
    if (totalPages <= 5) {
      // Reduced limit for mobile
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        // Adjusted logic for mobile
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Adjusted logic for mobile
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 2; i <= totalPages; i++) {
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
      <div className="flex items-center justify-center">
        {currentPage > 1 && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded text-lg font-bold md:h-12 md:w-12"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="icon h-4 w-4 rotate-[90deg] fill-darkBlue transition-colors hover:fill-accentBlue md:h-5 md:w-5">
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
                className={`flex h-11 w-11 items-center justify-center rounded text-lg font-bold md:h-12 md:w-12 ${
                  currentPage === page
                    ? 'bg-accentBlue text-white'
                    : 'link-hover'
                } md:text-lg`}
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
        {currentPage < totalPages && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded text-lg font-bold md:h-12 md:w-12"
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="icon h-4 w-4 rotate-[-90deg] fill-darkBlue transition-colors hover:fill-accentBlue md:h-5 md:w-5">
              <use xlinkHref="/img/sprite.svg#arrow-drop" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
