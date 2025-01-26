'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import './SidePanel.scss'
import { PageDataTypes } from '@/types/products.types'
import pagesDataRaw from '@/data/products/pagesData.json'

interface SidePanelProps {
  pageData: PageDataTypes
}

export type InputDataType = { [key: string]: any }

export type OutputCategory = {
  name: string
  title: string
  description: string
  img: string
  alt: string
  pageType: string
  category: string
  headGroupTitle?: string
  url: string

  subcategories?: Array<{
    title: string
    description: string
    img: string
    alt: string
    url: string
    crumb: string
    pageType: string
    category: string
    headGroupTitle?: string
  }>
  group?: Array<{
    headGroupTitle?: string
    title: string
    description: string
    img: string
    alt: string
    url: string
    crumb: string
    pageType: string
    category: string
  }>
  brands?: Array<{
    title: string
    description: string
    img: string
    alt: string
    url: string
    crumb: string
    pageType: string
    category: string
    headGroupTitle?: string
  }>
}

export interface Subcategory {
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb: string
}

export function transformJson(inputData: InputDataType): {
  [key: string]: OutputCategory
} {
  const result: { [key: string]: OutputCategory } = {}

  Object.keys(inputData).forEach((key) => {
    const item = inputData[key]

    if (item.pageType === 'category') {
      result[key] = {
        name: item.name,
        title: item.title,
        description: item.description,
        img: item.img,
        alt: item.alt,
        url: item.url,
        pageType: item.pageType,
        category: item.category,
        subcategories: [],
        group: [],
        brands: [],
      }
    } else if (item.pageType === 'subcategory' && item.category) {
      result[item.category]?.subcategories?.push({
        pageType: item.pageType,
        category: item.category,
        title: item.title,
        description: item.description,
        img: item.img,
        alt: item.alt,
        url: item.url,
        crumb: item.crumb,
      })
    } else if (item.pageType === 'group' && item.category) {
      result[item.category]?.group?.push({
        pageType: item.pageType,
        category: item.category,

        headGroupTitle: item?.headGroupTitle,
        title: item.title,
        description: item.description,
        img: item.img,
        alt: item.alt,
        url: item.url,
        crumb: item.crumb,
      })
    } else if (item.pageType === 'brands' && item.category) {
      result[item.category]?.brands?.push({
        pageType: item.pageType,
        category: item.category,

        title: item.title,
        description: item.description,
        img: item.img,
        alt: item.alt,
        url: item.url,
        crumb: item.crumb,
      })
    }
  })

  return result
}

export const SidePanel: React.FC<SidePanelProps> = ({ pageData }) => {
  const [isHover, setIsHover] = useState(false)
  const transformData = transformJson(pagesDataRaw)
  const categoryData = transformData[pageData.category]

  const subcategories = categoryData.subcategories
  const groups = categoryData.group
  const brands = categoryData.brands
  const headGroup = groups && groups[0]?.headGroupTitle

  return (
    <div className="side-panel scroll-bar z-30 max-h-[526px] overflow-y-auto overflow-x-hidden overscroll-contain rounded bg-white p-4 shadow-custom">
      <ul className="side-panel__list">
        {headGroup && (
          <li
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`side-panel__item ${isHover && 'current'}`}
          >
            <div className="side-panel__item-link link-hover">
              <span className="side-panel__item-bridge absolute left-[50%] top-0 hidden h-full w-full"></span>
              {headGroup}
              <svg className="icon">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>

            <ul data-drop-list className="side-panel__drop-list">
              {brands?.map((brand) => (
                <li key={brand.url} className="side-panel__drop-item">
                  <Link href={`/catalog/${brand.url}`}>{brand.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}

        {subcategories &&
          subcategories.map((link: Subcategory) => (
            <li key={link.url} className="side-panel__item">
              <Link
                href={`/catalog/${link.url}`}
                className="side-panel__item-link link-hover"
              >
                {link.title}
              </Link>
            </li>
          ))}
        {groups &&
          groups.map((link: Subcategory) => (
            <li key={link.url} className="side-panel__item">
              <Link
                href={`/catalog/${link.url}`}
                className="side-panel__item-link link-hover"
              >
                {link.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
