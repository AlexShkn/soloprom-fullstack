'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import './SidePanel.scss'

import {
  Group,
  Brand,
  Subcategory,
  Categories,
} from '@/app/catalog/[category]/page'

export const SidePanel: React.FC<Categories> = ({ categoryData }) => {
  const [isHover, setIsHover] = useState(false)
  const subcategories = categoryData.subcategories
  const groups = categoryData.group
  const brands = categoryData.brands
  const headGroup = groups && groups[0].headGroupTitle
  return (
    <div className="side-panel">
      <ul className="side-panel__list">
        {headGroup && (
          <li
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`side-panel__item ${isHover && 'current'}`}
          >
            <div className="side-panel__item-link link-hover">
              <span className="side-panel__item-bridge"></span>
              {headGroup}
              <svg className="icon">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>

            <ul data-drop-list className="side-panel__drop-list">
              {brands?.map((brand) => (
                <li key={brand.url} className="side-panel__drop-item">
                  <Link href={`/catalog/${categoryData.name}/${brand.url}`}>
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
                href={`/catalog/${categoryData.name}/${link.url}`}
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
                href={`/catalog/${categoryData.name}/${link.url}`}
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
