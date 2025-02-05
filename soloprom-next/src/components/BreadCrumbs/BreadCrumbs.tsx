'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronRight } from 'lucide-react'
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

interface forcedListTypes {
  category?: string
  subcategory?: string
  name?: string
  url?: string
}

const dictionary: Dictionary = {
  'payment-delivery': 'Оплата и доставка',
  requisites: 'Реквизиты',
  catalog: 'Каталог',
  cart: 'Корзина',
  favorite: 'Избранное',
  tires: 'Шины для спецтехники',
  battery: 'Аккумуляторы',
  oils: 'Мала и антифризы',
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

const BreadCrumbs: React.FC<forcedListTypes> = ({
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
            <Home className="h-4 w-4" />
          </Link>

          {!category ? (
            breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />{' '}
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
                <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
                <Link
                  href={`/catalog`}
                  className={`link-hover relative text-darkBlue`}
                >
                  Каталог
                </Link>
              </span>

              <span className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
                <Link
                  href={`/catalog/${category}`}
                  className={`link-hover relative text-darkBlue`}
                >
                  {dictionary[category]}
                </Link>
              </span>

              {subCategoryInfo && (
                <span className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
                  <Link
                    href={`/catalog/${subcategory}`}
                    className={`link-hover relative text-darkBlue`}
                  >
                    {subCategoryInfo.crumb}
                  </Link>
                </span>
              )}

              {url !== category && (
                <span className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
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
