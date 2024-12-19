import React from 'react'
import Link from 'next/link'

import { useDispatch } from 'react-redux'
import { catalogMenuStateChange } from '@/redux/slices/catalogMenu'

import { CategoryProduct } from './CatalogMenu'

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
  const dispatch = useDispatch()
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
      className={`catalog-menu__category-body scroll-bar invisible hidden grid-cols-2 gap-5 pr-2.5 opacity-0 transition-all ${
        categoryId === currentTab && 'active'
      }`}
    >
      <ul className="catalog-menu__category-child-list flex flex-col gap-x-5 gap-y-1">
        {firstPart.map((item, index) => (
          <li
            key={index}
            className="catalog-menu__category-child-item relative leading-3"
          >
            <Link
              href={item.href}
              className="catalog-menu__category-child-link link-hover inline-flex w-full items-center rounded bg-white py-2.5 pl-2.5 pr-[5px] font-medium"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      {secondPart.length > 0 && (
        <ul className="catalog-menu__category-child-list flex flex-col gap-x-5 gap-y-1">
          {secondPart.map((item, index) => (
            <li
              key={index + firstPart.length}
              className="catalog-menu__category-child-item relative leading-3"
            >
              <Link
                href={item.href}
                onClick={() =>
                  dispatch(
                    catalogMenuStateChange({ status: false, screen: false }),
                  )
                }
                className="catalog-menu__category-child-link link-hover inline-flex w-full items-center rounded bg-white py-2.5 pl-2.5 pr-[5px] font-medium"
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
