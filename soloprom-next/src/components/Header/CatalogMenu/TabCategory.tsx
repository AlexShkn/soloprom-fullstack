import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head' // Import Head

import { CategoryProduct } from './CatalogMenu'
import { useCatalogMenuStore } from '@/store/useCatalogMenuStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { scrollStatusChange } from '@/utils/scrollStatusChange'

interface CategoryTab {
  categoryItems: CategoryProduct[]
  categoryId: string
  currentTab: string
}

interface BrandsList {
  [key: string]: {
    brands: string[]
    domain: string
  }
}

const brandsList: BrandsList = {
  tires: {
    brands: [
      'apollo',
      'advance',
      'aotai',
      'armour',
      'carlisle',
      'dunlop',
      'emrald',
      'et-stone',
      'lnp',
      'mrl',
      'naaats',
      'worcraft',
    ],
    domain: 'shini',
  },
  battery: {
    brands: [
      'enpower',
      'union',
      'elhim',
      'noblelift',
      'chilwee',
      'tianneng',
      'nexsys',
    ],
    domain: 'accumulyatori',
  },
  oils: {
    brands: [],
    domain: 'maslo',
  },
}

const TabCategory: React.FC<CategoryTab> = ({
  categoryItems,
  categoryId,
  currentTab,
}) => {
  const { catalogMenuStateChange } = useCatalogMenuStore()
  const isTablet = useMediaQuery('(max-width: 991.98px)')

  if (!categoryItems || categoryItems.length === 0) {
    return null
  }

  const numItems = categoryItems.length
  let firstPart: CategoryProduct[]
  let secondPart: CategoryProduct[]

  if (numItems > 12) {
    const midpoint = Math.floor(numItems / 2)
    firstPart = categoryItems.slice(0, midpoint)
    secondPart = categoryItems.slice(midpoint)
  } else if (numItems > 6) {
    firstPart = categoryItems.slice(0, 6)
    secondPart = categoryItems.slice(6)
  } else {
    firstPart = categoryItems
    secondPart = []
  }

  const currentBrands = brandsList[categoryId]?.brands || []

  const handelMenuClose = () => {
    catalogMenuStateChange(false, isTablet)
    scrollStatusChange(false)
  }

  const productSchema = categoryItems.map((item) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    url: item.href,
    category: categoryId,
    description: `Купить ${item.title} в интернет-магазине Солопром`,
  }))

  return (
    <div
      className={`catalog-menu__category-body scroll-bar overflow-y-auto overscroll-contain p-2.5 pr-2.5 transition-all md:max-h-[calc(100vh-70px)] lg:p-0 ${
        categoryId === currentTab ? 'fadeIn grid' : 'invisible hidden opacity-0'
      }`}
    >
      <Head>
        {productSchema.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="mb-2.5 grid grid-cols-1 border-b border-grayColor pb-2.5 lg:grid-cols-2 lg:gap-5">
        <ul className="flex h-auto flex-col items-start justify-start gap-x-5 gap-y-1 bg-white pl-4 sm:bg-none">
          {firstPart.map((item, index) => (
            <li
              key={index}
              className="relative text-sm leading-3 lg:text-base [&:not(:last-child)]:mb-1"
            >
              <Link
                href={item.href}
                onClick={handelMenuClose}
                className="link-hover inline-flex w-full items-center rounded bg-white py-2.5 pl-2.5 pr-1 font-medium leading-5 underline lg:pr-[5px]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {secondPart.length > 0 && (
          <ul className="flex h-auto flex-col items-start justify-start gap-x-5 gap-y-1 bg-white pl-4 sm:bg-none">
            {secondPart.map((item, index) => (
              <li
                key={index + firstPart.length}
                className="relative text-sm leading-3 lg:text-base [&:not(:last-child)]:mb-1"
              >
                <Link
                  href={item.href}
                  onClick={handelMenuClose}
                  className="link-hover inline-flex w-full items-center rounded bg-white py-2.5 pl-2.5 pr-1 font-medium leading-5 underline lg:pr-[5px]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {currentBrands.length > 0 && (
        <ul className="flex flex-wrap items-center gap-4 pl-4">
          {currentBrands.map((brand) => (
            <li key={brand}>
              <Link
                href={`/catalog/${brandsList[categoryId].domain}-${brand}`}
                onClick={handelMenuClose}
              >
                <Image
                  src={`/img/catalog/brands-logo/${brand}.webp`}
                  className="h-auto w-auto object-contain"
                  width={100}
                  height={40}
                  alt={brand}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TabCategory
