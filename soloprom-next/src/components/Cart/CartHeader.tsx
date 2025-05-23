'use client'
import React from 'react'
import Link from 'next/link'

interface Props {
  title: string
}

export const CartHeader: React.FC<Props> = ({ title }) => (
  <div className="mb-10 flex items-center justify-between">
    <h1 className="text-[clamp(1.375rem,0.7816rem+1.978vw,2.5rem)] font-medium">
      {title}
    </h1>
    <Link
      href="/"
      className="group inline-flex items-center gap-1 text-sm transition-colors hover:text-hoverBlue mds:gap-2.5 mds:text-base"
    >
      <svg
        className="h-4 w-4 fill-darkBlue transition-colors group-hover:fill-hoverBlue mds:h-5 mds:w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="M14.776 8.827a6 6 0 0 1-5.775 5.996l-.225.004h-3a1 1 0 0 1-.116-1.993l.116-.007h3a4 4 0 0 0 0-8H5.513l1.02 1.175a1 1 0 0 1-.017 1.329l-.084.081a1 1 0 0 1-1.33-.016l-.08-.084L2 3.828 5.021.345a1 1 0 0 1 1.583 1.218l-.072.092-1.016 1.172h3.26a6 6 0 0 1 6 6Z" />
      </svg>
      Вернуться к покупкам
    </Link>
  </div>
)
