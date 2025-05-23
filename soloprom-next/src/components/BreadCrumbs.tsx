'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { transformJson } from '@/components/CategoryPageHero/SidePanel/SidePanel'

interface Subcategory {
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb: string
}

interface Category {
  name: string
  title: string
  description: string
  img: string
  alt: string
  subcategories: Subcategory[]
}

interface PagesData {
  [key: string]: Category
}

interface Breadcrumb {
  label: string
  href: string
}

interface Dictionary {
  [key: string]: string
}

interface ForcedListTypes {
  category?: string
  subcategory?: string
  name?: string
  url?: string
}

const dictionary: Dictionary = {
  'payment-delivery': 'Оплата и доставка',
  requisites: 'Реквизиты',
  profile: 'Личный кабинет',
  catalog: 'Каталог',
  cart: 'Корзина',
  favorite: 'Избранное',
  tires: 'Шины для спецтехники',
  battery: 'Аккумуляторы',
  oils: 'Мала и антифризы',
  agreement: 'Политика обработки персональных данных',
  policy: 'Политика конфиденциальности',
  'shini-celnolitie': 'Шины цельнолитые',
}

const getSubCategoryDescription = (
  category: string,
  subcategory: string,
): { crumb: string; url: string } | undefined => {
  const pagesData = require('@/data/products/pagesData.json') as PagesData

  if (!pagesData[category]) {
    return undefined
  }

  const transformData = transformJson(pagesData)

  if (!transformData[category]) {
    return undefined
  }

  const object = transformData[category]?.subcategories?.find(
    (obj) => obj.url === subcategory,
  )

  if (!object) {
    return undefined
  }
  return { crumb: object.crumb, url: object.url }
}

const BreadCrumbs: React.FC<ForcedListTypes> = ({
  category,
  subcategory,
  name,
  url,
}) => {
  const pathname = usePathname()
  const pathParts = pathname.split('/').filter((part) => part)

  const breadcrumbs: Breadcrumb[] = pathParts.map((part, index) => ({
    label: dictionary[part] || part,
    href: `/${pathParts.slice(0, index + 1).join('/')}`,
  }))

  const subCategoryInfo =
    category && subcategory && getSubCategoryDescription(category, subcategory)

  return (
    <nav aria-label="breadcrumb" className={`relative z-[2] mb-7 pt-5`}>
      <ul>
        <div className="breadCrumbs__container flex flex-wrap items-center text-sm md:text-base">
          <Link
            href="/"
            className={`relative flex items-center text-accentBlue`}
          >
            <svg
              className="h-4 w-4 fill-accentBlue"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M29.574 11.215a1.985 1.985 0 0 0-.851-1.27l-11.248-7.5a2.652 2.652 0 0 0-2.948 0L3.272 9.948a2 2 0 0 0-.549 2.771l.737 1.105a1.983 1.983 0 0 0 1.271.852A2.043 2.043 0 0 0 5 14.7V25a3 3 0 0 0 3 3h5a1 1 0 0 0 1-1v-8h4v8a1 1 0 0 0 1 1h5a3 3 0 0 0 3-3V14.7a2.043 2.043 0 0 0 .269-.027 1.983 1.983 0 0 0 1.271-.852l.737-1.105a1.985 1.985 0 0 0 .297-1.501ZM24 26h-4v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8H8a1 1 0 0 1-1-1V13.868l9-6 9 6V25a1 1 0 0 1-1 1Zm2.876-13.285L16.555 5.834a1 1 0 0 0-1.11 0L5.124 12.715l-.742-1.1 11.255-7.5a.658.658 0 0 1 .729 0l11.247 7.5Z"></path>
            </svg>
          </Link>

          {!category ? (
            breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />{' '}
                <Link
                  href={crumb.href}
                  className={`link-hover relative text-darkBlue`}
                >
                  {crumb.label}
                </Link>
              </span>
            ))
          ) : (
            <>
              <span className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                <Link
                  href={`/catalog`}
                  className={`link-hover relative text-darkBlue`}
                >
                  Каталог
                </Link>
              </span>

              <span className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                <Link
                  href={`/catalog/${category}`}
                  className={`link-hover relative text-darkBlue`}
                >
                  {dictionary[category]}
                </Link>
              </span>

              {subCategoryInfo && (
                <span className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                  <Link
                    href={`/catalog/${subcategory}`}
                    className={`link-hover relative text-darkBlue`}
                  >
                    {subCategoryInfo.crumb}
                  </Link>
                </span>
              )}

              {url !== category && name && (
                <span className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                  <Link
                    href={url ? url : '/'}
                    className={`link-hover relative text-darkBlue`}
                  >
                    {name}
                  </Link>
                </span>
              )}
            </>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default BreadCrumbs
