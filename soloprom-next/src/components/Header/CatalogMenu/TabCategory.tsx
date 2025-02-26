import React from 'react'
import Link from 'next/link'

import { CategoryProduct } from './CatalogMenu'
import { useCatalogMenuStore } from '@/store/catalogMenuStore'

interface CategoryTab {
  categoryItems: CategoryProduct[]
  categoryId: string
  currentTab: string
}

const TabCategory: React.FC<CategoryTab> = ({
  categoryItems,
  categoryId,
  currentTab,
}) => {
  const { catalogMenuStateChange } = useCatalogMenuStore()

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

  return (
    <div
      className={`catalog-menu__category-body scroll-bar max-h-[calc(100vh-70px)] grid-cols-1 overflow-y-auto border-b border-grayColor p-2.5 pr-2.5 transition-all lg:grid-cols-2 lg:gap-5 lg:p-0 ${
        categoryId === currentTab ? 'fadeIn grid' : 'invisible hidden opacity-0'
      }`}
    >
      <ul className="flex h-auto flex-col items-start justify-start gap-x-5 gap-y-1 bg-white pl-4 sm:bg-none">
        {firstPart.map((item, index) => (
          <li
            key={index}
            className="relative text-sm leading-3 lg:text-base [&:not(:last-child)]:mb-1"
          >
            <Link
              href={item.href}
              onClick={() => catalogMenuStateChange(false, false)}
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
                onClick={() => catalogMenuStateChange(false, false)}
                className="link-hover inline-flex w-full items-center rounded bg-white py-2.5 pl-2.5 pr-1 font-medium leading-5 underline lg:pr-[5px]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TabCategory
