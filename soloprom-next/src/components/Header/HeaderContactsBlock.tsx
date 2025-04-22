'use client'
import React from 'react'
import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  className?: string
}

export const HeaderContactsBlock: React.FC<Props> = ({ className }) => {
  const { modalCallbackStateChange } = useModalsStore()

  return (
    <div className="flex w-full items-end justify-end gap-5 lg:items-center">
      <div className="hidden w-full items-center justify-end gap-2.5 md:flex md:max-w-60 md:flex-col md:gap-5 lg:max-w-full lg:flex-row">
        <div className="flex items-center gap-2.5">
          <img
            src="/img/icons/clock.svg"
            alt=""
            className="h-5 w-5 lg:h-7 lg:w-7"
          />

          <div className="flex gap-1 whitespace-nowrap text-sm font-medium leading-5">
            <div className="flex flex-col text-right">
              <span className="whitespace-nowrap">будни - 9:00-21:00</span>
              <span className="whitespace-nowrap"> сб. - 10:00-15:00</span>
            </div>
          </div>
        </div>
        <div className="flex max-w-[300px] items-center gap-2.5 text-ss font-medium leading-5 xl:text-sm">
          <svg className="icon h-5 w-5 min-w-5 fill-darkBlue lg:h-7 lg:w-7 lg:min-w-7">
            <use xlinkHref="/img/sprite.svg#locate"></use>
          </svg>
          <address className="not-italic">
            г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
          </address>
        </div>
      </div>

      <div className="lg-gap-0 flex items-center gap-5 xs:flex-col mdl:flex-row mdl:gap-4 md:flex-col md:gap-2.5 xl:flex-row">
        <div className="header-body__phone flex flex-col">
          <a
            href="tel:+79036569393"
            className="link-hover whitespace-nowrap text-[clamp(0.875rem,0.6772rem+0.6593vw,1.25rem)] font-bold"
          >
            +7 (903) 656-93-93
          </a>
        </div>
      </div>
    </div>
  )
}
