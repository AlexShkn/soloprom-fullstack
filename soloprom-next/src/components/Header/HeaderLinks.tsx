'use client'
import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

interface Props {
  className?: string
}

const links = [
  {
    href: '/catalog/tires',
    label: 'Шины',
    icon: '/img/sprite.svg#catalog-tires',
  },
  {
    href: '/catalog/battery',
    label: 'Акб',
    icon: '/img/sprite.svg#catalog-battery',
  },
  {
    href: '/catalog/oils',
    label: 'Масла',
    icon: '/img/sprite.svg#catalog-oils',
  },
]

export const HeaderLinks: React.FC<Props> = ({ className }) => {
  return (
    <div className="bg-darkBlue">
      <div className="mobile-container flex items-center justify-between">
        <ul className="flex items-center gap-1 mds:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-hover flex items-center gap-1 py-2 pr-2 text-sm font-medium leading-none text-white"
              >
                <svg className="hidden h-4 w-4 fill-white xs:block">
                  <use xlinkHref={link.icon}></use>
                </svg>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="tel:+79036569393"
          className="text-white transition-colors hover:text-greenColor"
        >
          <div className="flex items-center whitespace-nowrap text-sm font-medium mds:gap-1">
            <Phone className="h-5 w-5" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] leading-none">
                будни - 9:00-21:00 сб. - 10:00-15:00
              </span>
              <span className="text-sm leading-none">+7 (903) 656-93-93</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
