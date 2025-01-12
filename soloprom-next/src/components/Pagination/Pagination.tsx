'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  currentPage: number
  totalPages: number
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const router = useRouter()

  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const handlePageChange = (pageNumber: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(pageNumber))
    router.push(url.toString())
  }

  return (
    <div className="pagination">
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination__button ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
