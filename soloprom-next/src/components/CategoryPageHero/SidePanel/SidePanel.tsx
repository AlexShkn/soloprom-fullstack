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
  model?: Array<{
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
        model: [],
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
    } else if (item.pageType === 'model' && item.category) {
      result[item.category]?.model?.push({
        pageType: item.pageType,
        category: item.category,

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
        headGroupTitle: item?.headGroupTitle,
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
  const [isHoverGroup, setIsHoverGroup] = useState(false)
  const [isHoverBrand, setIsHoverBrand] = useState(false)
  const [activeItem, setActiveItem] = useState('')

  const transformData = transformJson(pagesDataRaw)

  const categoryData = transformData[pageData.category]

  const subcategories = categoryData.subcategories
  const groups = categoryData.group
  const brands = categoryData.brands
  const model = categoryData.model
  const headGroup = groups && groups[0]?.headGroupTitle
  const headBrand = brands && brands[0]?.headGroupTitle

  return (
    <div className="scroll-bar z-30 order-2 max-h-[526px] flex-shrink-0 flex-grow-0 overflow-y-auto overflow-x-hidden overscroll-contain rounded bg-white p-4 shadow-custom md:order-none md:px-2.5 lg:w-auto">
      <ul>
        {headGroup && (
          <li
            onClick={() =>
              setActiveItem((prev) => (prev !== 'headGroup' ? 'headGroup' : ''))
            }
            className={`side-panel__item ${(isHoverGroup || activeItem === 'headGroup') && 'current'}`}
          >
            <div className="side-panel__item-link link-hover relative z-[1] flex cursor-pointer items-center justify-between rounded p-2.5 text-sm lg:py-2.5 lg:pl-4">
              <span className="side-panel__item-bridge absolute left-[50%] top-0 hidden h-full w-full"></span>
              {headGroup}
              <svg className="icon h-5 w-5 min-w-5 fill-accentBlue transition-colors md:rotate-[-90deg]">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>

            <ul className="side-panel__drop-list pointer-events-none invisible z-20 hidden min-h-max w-full select-none flex-col rounded bg-white py-2.5 opacity-0 shadow-custom transition-all md:absolute md:left-[330px] md:top-0 md:w-[calc(100%-340px)] md:gap-2.5 md:p-7">
              {model?.map((brand) => (
                <li
                  key={brand.url}
                  className="side-panel__drop-item md:border-1 h-auto px-2.5 transition-colors md:rounded md:border-accentBlue md:bg-none [&:nth-child(2n)]:bg-[#f2f2f2]"
                >
                  <Link
                    href={`/catalog/${brand.url}`}
                    className="inline-flex h-full w-full items-center justify-center px-2.5 py-2 text-center font-medium transition-colors"
                  >
                    {brand.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {headBrand && (
          <li
            onClick={() =>
              setActiveItem((prev) => (prev !== 'headBrand' ? 'headBrand' : ''))
            }
            className={`side-panel__item ${(isHoverBrand || activeItem === 'headBrand') && 'current'}`}
          >
            <div className="side-panel__item-link link-hover relative z-[1] flex cursor-pointer items-center justify-between rounded p-2.5 text-sm lg:py-2.5 lg:pl-4">
              <span className="side-panel__item-bridge absolute left-[50%] top-0 hidden h-full w-full"></span>
              {headBrand}
              <svg className="icon h-5 w-5 min-w-5 fill-accentBlue transition-colors md:rotate-[-90deg]">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>

            <ul className="side-panel__drop-list pointer-events-none invisible z-20 hidden min-h-max w-full select-none flex-col rounded bg-white py-2.5 opacity-0 shadow-custom transition-all md:absolute md:left-[330px] md:top-0 md:w-[calc(100%-340px)] md:gap-2.5 md:p-7">
              {brands?.map((brand) => (
                <li
                  key={brand.url}
                  className="side-panel__drop-item md:border-1 h-auto px-2.5 transition-colors md:rounded md:border md:border-accentBlue md:bg-transparent [&:nth-child(2n)]:bg-[#f2f2f2]"
                >
                  <Link
                    href={`/catalog/${brand.url}`}
                    className="inline-flex h-full w-full items-center justify-center px-2.5 py-2 text-center font-medium transition-colors"
                  >
                    {brand.title}
                  </Link>
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
                className="side-panel__item-link link-hover relative z-[1] flex cursor-pointer items-center justify-between rounded p-2.5 text-sm lg:py-2.5 lg:pl-4"
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
                className="side-panel__item-link link-hover relative z-[1] flex cursor-pointer items-center justify-between rounded p-2.5 text-sm lg:py-2.5 lg:pl-4"
              >
                {link.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
