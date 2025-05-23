'use client'
import React, { memo } from 'react'

import Link from 'next/link'
import { ICON_SPRITE_PATH } from './MobileNav'
import clsx from 'clsx'

interface Props {
  className?: string
  href: string
  icon: string
  label: string
  id?: string
  count?: number
}

export const NavItem: React.FC<Props> = memo(
  ({ id, className, href, icon, label, count }) => {
    return (
      <div
        className={clsx(
          'mobile-nav__item relative inline-flex cursor-pointer justify-center rounded-lg text-white transition-colors hover:bg-hoverBlue md:h-11 md:bg-accentBlue md:bg-none lg:h-12',
          className,
        )}
      >
        <Link
          href={href}
          className="relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base"
          aria-label={label}
        >
          <div className="relative px-1">
            {count ? (
              <span
                className={clsx(
                  'absolute -right-2 bottom-[-6px] inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-ss font-bold transition-all',
                  count
                    ? 'bg-greenColor text-white'
                    : 'bg-white text-accentBlue',
                )}
              >
                {count}
              </span>
            ) : (
              ''
            )}

            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref={`${ICON_SPRITE_PATH}${icon}`}></use>
            </svg>
          </div>
          <span className="leading-none md:hidden">{label}</span>
        </Link>
      </div>
    )
  },
)
