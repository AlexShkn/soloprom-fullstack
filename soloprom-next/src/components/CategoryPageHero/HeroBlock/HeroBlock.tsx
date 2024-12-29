'use client'
import React from 'react'

import './HeroBlock.scss'

export const HeroBlock = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="category-block">
      <div className="category-block__container">
        <div className="category-block__body relative flex gap-7">
          {/* @@include('./html/catalog/battery/_side-panel.htm',{})
			@@include('./html/catalog/battery/_category-hero.htm',{}) */}

          {children}
        </div>
      </div>
    </div>
  )
}
