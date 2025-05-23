'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, SquareChartGantt } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'

interface Brand {
  name: string
  img: string
  slug: string
  count: number
}

interface Category {
  name: string
  slug: string
  brands: Brand[]
}

interface Props {
  category: string
  subcategory: string
}

interface DataTypes {
  list: Category[]
  title: string
}

const data: { [key: string]: DataTypes } = {
  tires: {
    title: 'Шины по брендам',
    list: [
      {
        name: 'Экскаваторы-погрузчики',
        slug: 'shini-dlya-ekskavator-pogruzchikov',
        brands: [
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-ekskavator-pogruzchikov?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 24,
          },
          {
            img: 'mrl',
            name: 'MRL',
            slug: 'shini-dlya-ekskavator-pogruzchikov?filters=%7B"brandName"%3A%5B"MRL"%5D%7D',
            count: 14,
          },
          {
            img: 'apollo',
            name: 'APOLLO',
            slug: 'shini-dlya-ekskavator-pogruzchikov?filters=%7B"brandName"%3A%5B"APOLLO"%5D%7D',
            count: 13,
          },
          {
            img: 'emrald',
            name: 'Emrald',
            slug: 'shini-dlya-ekskavator-pogruzchikov?filters=%7B"brandName"%3A%5B"Emrald"%5D%7D',
            count: 1,
          },
          {
            img: 'worcraft',
            name: 'WORCRAFT',
            slug: 'shini-dlya-ekskavator-pogruzchikov?filters=%7B"brandName"%3A%5B"WORCRAFT"%5D%7D',
            count: 1,
          },
        ],
      },
      {
        name: 'Мини-погрузчики',
        slug: 'shini-dlya-minipogruzchikov',
        brands: [
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 25,
          },
          {
            img: 'mrl',
            name: 'MRL',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"MRL"%5D%7D',
            count: 8,
          },
          {
            img: 'apollo',
            name: 'APOLLO',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"APOLLO"%5D%7D',
            count: 6,
          },
          {
            img: 'emrald',
            name: 'Emrald',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"Emrald"%5D%7D',
            count: 5,
          },
          {
            img: 'carlisle',
            name: 'Carlisle',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"Carlisle"%5D%7D',
            count: 4,
          },
        ],
      },
      {
        name: 'Вилочные',
        slug: 'forklifts',
        brands: [
          {
            img: 'armour',
            name: 'Armour',
            slug: 'shini-dlya-vilochnih-pogruzchikov?filters=%7B"brandName"%3A%5B"Armour"%5D%7D',
            count: 1,
          },
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-vilochnih-pogruzchikov?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 4,
          },
          {
            img: 'mrl',
            name: 'MRL',
            slug: 'shini-dlya-vilochnih-pogruzchikov?filters=%7B"brandName"%3A%5B"MRL"%5D%7D',
            count: 12,
          },
          {
            img: 'apollo',
            name: 'APOLLO',
            slug: 'shini-dlya-vilochnih-pogruzchikov?filters=%7B"brandName"%3A%5B"APOLLO"%5D%7D',
            count: 1,
          },
          {
            img: 'emrald',
            name: 'Emrald',
            slug: 'shini-dlya-vilochnih-pogruzchikov?filters=%7B"brandName"%3A%5B"Emrald"%5D%7D',
            count: 203,
          },
          {
            img: 'advance',
            name: 'ADVANCE',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"ADVANCE"%5D%7D',
            count: 4,
          },
          {
            img: 'dunlop',
            name: 'DUNLOP',
            slug: 'shini-dlya-minipogruzchikov?filters=%7B"brandName"%3A%5B"DUNLOP"%5D%7D',
            count: 5,
          },
        ],
      },
      {
        name: 'Фронтальные',
        slug: 'shini-dlya-frontalnih-pogruzchikov',
        brands: [
          {
            img: 'apollo',
            name: 'APOLLO',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"APOLLO"%5D%7D',
            count: 5,
          },
          {
            img: 'naaats',
            name: 'NAAATS',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"NAAATS"%5D%7D',
            count: 24,
          },
          {
            img: 'worcraft',
            name: 'WORCRAFT',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"Worcraft"%5D%7D',
            count: 2,
          },
          {
            img: 'lnp',
            name: 'LNP',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"LNP"%5D%7D',
            count: 5,
          },
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 14,
          },
          {
            img: 'aotai',
            name: 'AOTAI',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"AOTAI"%5D%7D',
            count: 1,
          },

          {
            img: 'et-stone',
            name: 'ET-STONE',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"ET-STONE"%5D%7D',
            count: 1,
          },
          {
            img: 'mrl',
            name: 'MRL',
            slug: 'shini-dlya-frontalnih-pogruzchikov?filters=%7B"brandName"%3A%5B"MRL"%5D%7D',
            count: 3,
          },
        ],
      },
      {
        name: 'Грейдеры',
        slug: 'shini-dlya-greiderov',
        brands: [
          {
            img: 'apollo',
            name: 'APOLLO',
            slug: 'shini-dlya-greiderov?filters=%7B"brandName"%3A%5B"APOLLO"%5D%7D',
            count: 3,
          },
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-greiderov?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 5,
          },
          {
            img: 'naaats',
            name: 'NAAATS',
            slug: 'shini-dlya-greiderov?filters=%7B"brandName"%3A%5B"NAAATS"%5D%7D',
            count: 1,
          },
        ],
      },
      {
        name: 'Сельхоз',
        slug: 'shini-dlya-selhoztehniki',
        brands: [
          {
            img: 'mrl',
            name: 'MRL',
            slug: 'shini-dlya-selhoztehniki?filters=%7B"brandName"%3A%5B"MRL"%5D%7D',
            count: 88,
          },
          {
            img: 'galaxy',
            name: 'Galaxy',
            slug: 'shini-dlya-selhoztehniki?filters=%7B"brandName"%3A%5B"Galaxy"%5D%7D',
            count: 2,
          },
        ],
      },
    ],
  },
  battery: {
    title: 'Аккумуляторы по брендам',
    list: [
      {
        name: 'Для погрузчиков',
        slug: 'accumulyatori-dlya-pogruzchikov',
        brands: [
          {
            img: 'elhim',
            name: 'Elhim Iskra',
            slug: 'accumulyatori-dlya-pogruzchikov?filters=%7B"brandName"%3A%5B"Elhim"%5D%7D',
            count: 24,
          },
          {
            img: 'union',
            name: 'Union',
            slug: 'accumulyatori-dlya-pogruzchikov?filters=%7B"brandName"%3A%5B"Union"%5D%7D',
            count: 10,
          },
          {
            img: 'enpower',
            name: 'EnPower',
            slug: 'accumulyatori-dlya-pogruzchikov?filters=%7B"brandName"%3A%5B"EnPower"%5D%7D',
            count: 9,
          },
          {
            img: 'nexsys',
            name: 'Nexsys',
            slug: 'accumulyatori-dlya-pogruzchikov?filters=%7B"brandName"%3A%5B"Nexsys"%5D%7D',
            count: 1,
          },
          {
            img: 'tianneng',
            name: 'Tianneng',
            slug: 'accumulyatori-dlya-pogruzchikov?filters=%7B"brandName"%3A%5B"Tianneng"%5D%7D',
            count: 3,
          },
        ],
      },
      {
        name: 'Для ричтраков',
        slug: 'accumulyatori-dlya-richtrakov',
        brands: [
          {
            img: 'elhim',
            name: 'Elhim Iskra',
            slug: 'accumulyatori-dlya-richtrakov?filters=%7B"brandName"%3A%5B"Elhim"%5D%7D',
            count: 3,
          },
          {
            img: 'union',
            name: 'Union',
            slug: 'accumulyatori-dlya-richtrakov?filters=%7B"brandName"%3A%5B"Union"%5D%7D',
            count: 9,
          },
          {
            img: 'enpower',
            name: 'EnPower',
            slug: 'accumulyatori-dlya-richtrakov?filters=%7B"brandName"%3A%5B"EnPower"%5D%7D',
            count: 2,
          },
        ],
      },
      {
        name: 'Для штабелеров',
        slug: 'accumulyatori-dlya-shtabelerov',
        brands: [
          {
            img: 'elhim',
            name: 'Elhim Iskra',
            slug: 'accumulyatori-dlya-shtabelerov?filters=%7B"brandName"%3A%5B"Elhim"%5D%7D',
            count: 9,
          },
          {
            img: 'union',
            name: 'Union',
            slug: 'accumulyatori-dlya-shtabelerov?filters=%7B"brandName"%3A%5B"Union"%5D%7D',
            count: 11,
          },
          {
            img: 'enpower',
            name: 'EnPower',
            slug: 'accumulyatori-dlya-shtabelerov?filters=%7B"brandName"%3A%5B"EnPower"%5D%7D',
            count: 1,
          },
          {
            img: 'noblelift',
            name: 'Noblelift',
            slug: 'accumulyatori-dlya-shtabelerov?filters=%7B"brandName"%3A%5B"Noblelift"%5D%7D',
            count: 1,
          },
        ],
      },
    ],
  },
}

export const BrandsTabs: React.FC<Props> = ({ category, subcategory }) => {
  const categoryData = data[category]?.list || []

  const [activeCategory, setActiveCategory] = useState<Category>(
    categoryData.filter((item) => item.slug !== subcategory)[0],
  )

  return (
    <div className="section-offset">
      <div className="page-container flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {data[category]?.title || 'По брендам'}
          </h2>
          {/* <Link
            href="/manufacturer"
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
          >
            <span>Все бренды</span>
            <ArrowRight className="h-4 w-4" />
          </Link> */}
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryData.map((category) => {
            if (category.slug !== subcategory) {
              return (
                <button
                  key={category.slug}
                  className={clsx(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    activeCategory?.slug === category.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.name}
                </button>
              )
            }
          })}
        </div>

        <div className="flex flex-wrap gap-4">
          {activeCategory?.brands.map((brand) => (
            <a
              target="_blank"
              key={brand.slug}
              href={`/catalog/${brand.slug}`}
              className="group flex items-center rounded-md border border-gray-200 px-4 py-2 transition-colors hover:border-primary hover:text-accentBlue"
            >
              <Image
                src={`/img/brands/${brand.img.toLowerCase()}.webp`}
                alt={brand.name}
                width={96}
                height={48}
                className="h-12 w-24 object-contain"
              />
              <div className="p-4">
                <div className="font-semibold">{brand.name}</div>
                <div className="leading-0 flex items-center gap-1 text-sm text-gray-500 underline group-hover:text-accentBlue">
                  {brand.count}
                  <SquareChartGantt className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
