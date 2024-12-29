'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './BreadCrumbs.module.scss'

interface Breadcrumb {
  label: string
  href: string
}

interface Dictionary {
  [key: string]: string
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

const BreadCrumbs = () => {
  const pathname = usePathname()
  const pathParts = pathname.split('/').filter((part) => part)

  const breadcrumbs: Breadcrumb[] = pathParts.map((part, index) => ({
    label: dictionary[part] || part,
    href: `/${pathParts.slice(0, index + 1).join('/')}`,
  }))

  return (
    <nav aria-label="breadcrumb" className={`relative z-[2] mb-7 pt-5`}>
      <ul>
        <div className="breadCrumbs__container flex items-center gap-5">
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
        </div>
      </ul>
    </nav>
  )
}

export default BreadCrumbs
