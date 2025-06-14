'use client'
import React from 'react'
import Image from 'next/image'
interface Props {
  className?: string
}

export const HeaderContactsBlock: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex w-full items-end justify-end gap-5 lg:items-center">
      <div className="hidden w-full items-center justify-end gap-2.5 md:flex md:max-w-60 md:flex-col md:gap-5 lg:max-w-full lg:flex-row">
        <div className="flex items-center gap-2.5">
          <img
            src="/img/icons/clock.svg"
            alt="График работы магазина"
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
          <svg
            className="icon h-5 w-5 min-w-5 fill-darkBlue lg:h-7 lg:w-7 lg:min-w-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            id="locate"
          >
            <path d="M10 0C6.12297 0 2.96875 3.15422 2.96875 7.03125C2.96875 8.34117 3.3316 9.61953 4.01832 10.7286L9.59977 19.723C9.70668 19.8953 9.89504 20 10.0976 20C10.0992 20 10.1007 20 10.1023 20C10.3066 19.9984 10.4954 19.8905 10.6003 19.7152L16.0395 10.6336C16.6883 9.54797 17.0312 8.30231 17.0312 7.03125C17.0312 3.15422 13.877 0 10 0ZM15.0338 10.032L10.0887 18.2885L5.01434 10.1112C4.44273 9.18805 4.13281 8.12305 4.13281 7.03125C4.13281 3.80039 6.76914 1.16406 10 1.16406C13.2309 1.16406 15.8633 3.80039 15.8633 7.03125C15.8633 8.09066 15.5738 9.12844 15.0338 10.032Z"></path>
            <path d="M10 3.51562C8.06148 3.51562 6.48438 5.09273 6.48438 7.03125C6.48438 8.95738 8.03582 10.5469 10 10.5469C11.9884 10.5469 13.5156 8.93621 13.5156 7.03125C13.5156 5.09273 11.9385 3.51562 10 3.51562ZM10 9.38281C8.7009 9.38281 7.64844 8.32684 7.64844 7.03125C7.64844 5.73891 8.70766 4.67969 10 4.67969C11.2923 4.67969 12.3477 5.73891 12.3477 7.03125C12.3477 8.30793 11.3197 9.38281 10 9.38281Z"></path>
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
