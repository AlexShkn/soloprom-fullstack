'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getProductsCounts } from '@/utils/api/products'
import { SubcategoryCount } from '../CategoryProductsSlider/CategoryProductsSlider'
import initialCategoriesData from '../../data/products/categoriesData.json'

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

        console.log(result)
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
            <div className="relative mb-7 inline-flex items-center gap-2.5 text-[22px] font-medium before:absolute before:-bottom-2.5 before:left-0 before:h-[2px] before:w-[60%] before:bg-accentBlue">
              <svg className="icon h-7 w-7 fill-accentBlue">
                <use xlinkHref={`/img/sprite.svg#${categoryData.icon}`} />
              </svg>
              {categoryData.title}
            </div>
            <div className="grid grid-cols-1 xs:gap-2.5 mds:grid-cols-2 mds:gap-5 md:grid-cols-3 lg:grid-cols-5">
              {categoryData.items.map((item) => (
                <Link
                  href={item.href}
                  className="flex flex-col items-center rounded-custom px-2.5 py-5 text-center shadow-custom hover:bg-accentBlue hover:text-white mds:p-5"
                  key={item.href}
                >
                  <Image
                    className="mb-4 block aspect-square max-h-32 max-w-32 object-contain"
                    src={item.img}
                    width={200}
                    height={200}
                    alt={item.title}
                  />
                  <div className="mb-4 font-medium leading-5 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[#b7b7b7]">
                    {productsCounts[item.id]} товар
                    {productsCounts[item.id] === 1
                      ? ''
                      : productsCounts[item.id] >= 2 &&
                          productsCounts[item.id] <= 4
                        ? 'а'
                        : 'ов'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
