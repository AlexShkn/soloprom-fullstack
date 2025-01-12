'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './BreadCrumbs.module.scss'

import { pagesData } from '@/app/catalog/[pageUrl]/server'

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
}

const BreadCrumbs: React.FC<forcedListTypes> = ({
  category,
  subcategory,
  name,
  url,
}) => {
  const pathname = usePathname()
  const pathParts = pathname.split('/').filter((part) => part)

  const breadcrumbs: Breadcrumb[] = pathParts.map((part, index) => {
    const label = dictionary[part] || pagesData[part]?.title || part
    return {
      label: label,
      href: `/${pathParts.slice(0, index + 1).join('/')}`,
    }
  })

  const subCategoryInfo = url ? pagesData[url] : undefined

  return (
    <nav aria-label="breadcrumb" className={`relative z-[2] mb-7 pt-5`}>
      <ul>
        <div className="breadCrumbs__container flex flex-wrap items-center">
          <Link
            href="/"
            className={`${s.breadCrumbsLink} relative text-accentBlue`}
          >
            <svg className="icon h-5 w-5 fill-accentBlue transition-colors hover:text-darkBlue">
              <use xlinkHref="/img/sprite.svg#home" />
            </svg>
          </Link>

          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              href={crumb.href}
              className={`${s.breadCrumbsLink} link-hover relative text-darkBlue`}
            >
              {crumb.label}
            </Link>
          ))}
          {subCategoryInfo && (
            <Link
              key={'last'}
              href={`/catalog/${subCategoryInfo.url}`}
              className={`${s.breadCrumbsLink} link-hover relative text-darkBlue`}
            >
              {subCategoryInfo.crumb
                ? subCategoryInfo.crumb
                : subCategoryInfo.title}
            </Link>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default BreadCrumbs
