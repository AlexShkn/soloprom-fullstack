'use client'
import React from 'react'

import './HeroBlock.scss'

export const HeroBlock = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <div className="page-container">
        <div className="category-block-body relative flex gap-7">
          {children}
        </div>
      </div>
    </div>
  )
}
