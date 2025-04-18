import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CategoryProduct } from './CatalogMenu'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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

  return (
    <div
      className={`catalog-menu__category-body scroll-bar max-h-[calc(100vh-70px)] overflow-y-auto border-b border-grayColor p-2.5 pr-2.5 transition-all lg:p-0 ${
        categoryId === currentTab ? 'fadeIn grid' : 'invisible hidden opacity-0'
      }`}
    >
      <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <ul className="flex h-auto flex-col items-start justify-start gap-x-5 gap-y-1 bg-white pl-4 sm:bg-none">
          {firstPart.map((item, index) => (
            <li
              key={index}
              className="relative text-sm leading-3 lg:text-base [&:not(:last-child)]:mb-1"
            >
              <Link
                href={item.href}
                onClick={() => catalogMenuStateChange(false, isTablet)}
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
                  onClick={() => catalogMenuStateChange(false, isTablet)}
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
                onClick={() => catalogMenuStateChange(false, isTablet)}
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
