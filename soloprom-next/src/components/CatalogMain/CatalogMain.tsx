'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { categoriesData } from '../CategoryProductsSlider/CategoryProductsSlider'

import './CatalogMain.scss'

interface Props {
  className?: string
}

export const CatalogMain: React.FC<Props> = ({ className }) => {
  return (
    <div className="catalog-main">
      <div className="catalog-main__container">
        <h1 className="section-title">Каталог товаров</h1>
        {Object.entries(categoriesData).map(([categoryKey, categoryData]) => (
          <div className="catalog-main__category" key={categoryKey}>
            <div className="relative mb-7 inline-flex items-center gap-2.5 text-[22px] font-medium before:absolute before:-bottom-2.5 before:left-0 before:h-[2px] before:w-[60%] before:bg-accentBlue">
              <svg className="icon h-7 w-7 fill-accentBlue">
                <use xlinkHref={`/img/sprite.svg#${categoryData.icon}`} />
              </svg>
              {categoryData.title}
            </div>
            <div className="catalog-main__category-list grid grid-cols-4 gap-5">
              {categoryData.items.map((item) => (
                <Link
                  href={item.href}
                  className="catalog-main__category-link flex flex-col items-center rounded p-5 text-center shadow-custom"
                  key={item.href}
                >
                  <Image
                    className="catalog-main__category-link-image mb-4 block aspect-square max-h-[200px] max-w-[200px] object-contain"
                    src={item.img}
                    width={200}
                    height={200}
                    alt={item.title}
                  />
                  <div className="mb-4 font-medium leading-5 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[#b7b7b7]">{item.count} товаров</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
