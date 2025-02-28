'use client'
import React from 'react'
import Link from 'next/link'

interface Props {
  title: string
}

export const CartHeader: React.FC<Props> = ({ title }) => (
  <div className="mb-10 flex items-center justify-between">
    <h1 className="text-[clamp(1.375rem,0.7816rem+1.978vw,2.5rem)] font-bold">
      {title}
    </h1>
    <Link
      href="/"
      className="group inline-flex items-center gap-1 text-sm transition-colors hover:text-hoverBlue mds:gap-2.5 mds:text-base"
    >
      <svg className="h-4 w-4 fill-darkBlue transition-colors group-hover:fill-hoverBlue mds:h-5 mds:w-5">
        <use xlinkHref="/img/sprite.svg#back-arrow"></use>
      </svg>
      Вернуться к покупкам
    </Link>
  </div>
)
