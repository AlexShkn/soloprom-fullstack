'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getProductsCounts } from '../api/products'
import { SubcategoryCount } from './CategoriesSliders/CategoriesSliders'
import initialCategoriesData from '../data/products/categoriesData.json'
import { getItemCountString } from '@/utils/getItemCountString'

interface CategoryItem {
  id: string
  href: string
  img: string
  title: string
  type: string
}
interface CategoryData {
  icon: string
  title: string
  items: CategoryItem[]
}
interface CategoriesData {
  [key: string]: CategoryData
}

interface Props {
  className?: string
}

const categoriesData = initialCategoriesData as CategoriesData

export const CatalogMain: React.FC<Props> = ({ className }) => {
  const [productsCounts, setProductsCounts] = useState<SubcategoryCount>({})

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const result = await getProductsCounts()

        if (result && typeof result === 'object' && !Array.isArray(result)) {
          setProductsCounts(result as SubcategoryCount)
        } else {
          console.error(
            'Неверный формат данных, полученных из getProductsCounts:',
            result,
          )
        }
      } catch (error) {
        console.error('Не удалось получить количество продуктов:', error)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="catalog-main">
      <div className="catalog-main__container">
        <h1 className="section-title">Каталог товаров</h1>
        {Object.entries(categoriesData).map(([categoryKey, categoryData]) => (
          <div className="[&:not(:last-child)]:mb-12" key={categoryKey}>
            <div className="relative mb-7 inline-flex items-center gap-2.5 text-[22px] font-medium before:absolute before:-bottom-2.5 before:left-0 before:h-0.5 before:w-[60%] before:bg-accentBlue">
              <svg className="icon h-7 w-7 fill-accentBlue">
                <use xlinkHref={`/img/sprite.svg#${categoryData.icon}`} />
              </svg>
              {categoryData.title}
            </div>
            <div className="flex flex-wrap justify-center xs:gap-2.5 mds:gap-3">
              {categoryData.items.map((item) => {
                const countString = getItemCountString(productsCounts[item.id])

                return (
                  <Link
                    href={item.href}
                    className="flex min-w-[180px] max-w-[250px] flex-auto flex-col items-center rounded-custom p-2.5 text-center shadow-custom any-hover:hover:bg-accentBlue any-hover:hover:text-white"
                    key={item.href}
                  >
                    <Image
                      className="block aspect-square max-h-20 max-w-20 object-contain"
                      src={item.img}
                      width={80}
                      height={80}
                      alt={item.title}
                    />
                    <div className="mb-4 font-medium leading-5 transition-colors">
                      {item.title}
                    </div>
                    <div className="mt-auto text-grayText any-hover:text-white">
                      {productsCounts[item.id]
                        ? `${productsCounts[item.id]} ${countString}`
                        : '0 товаров'}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
