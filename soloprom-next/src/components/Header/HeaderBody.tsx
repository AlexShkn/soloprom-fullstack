'use client'
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useModalsStore } from '@/store/modalsStore'

const HeaderBody = () => {
  const { modalCallbackStateChange } = useModalsStore()
  return (
    <div className="header-body flex flex-col justify-between gap-4 py-4 xs:flex-row xs:items-center xs:gap-0 lg:py-7">
      <Link
        href="/"
        className="header__logo flex-0-auto z-[2] mr-10 inline-flex items-center font-bold xs:mr-6"
      >
        <Image
          src="/img/logo.webp"
          width={40}
          height={40}
          className="h-10 w-10 object-contain xl:h-12 xl:w-12"
          alt=""
          priority
        />
        <div className="header__logo-text flex flex-col">
          <span className="text-xl font-bold leading-9 text-darkBlue mds:text-2xl xl:text-[28px]">
            СОЛО
            <b className="mt-[-5px] inline-block rounded bg-accentBlue px-1 leading-8 text-white">
              PROM
            </b>
          </span>
          <span className="max-w-32 pl-[5px] text-[9px] leading-3 text-[#3b3b3b] mds:max-w-36 xl:max-w-[170px] xl:text-[11px]">
            Интернет-магазин запчастей для спецтехники
          </span>
        </div>
      </Link>
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
          <div className="md:order-1 lg:order-none">
            <a
              href="https://wa.me/79036569393"
              className="flex min-w-[140px] items-center gap-1 rounded-lg bg-greenColor px-1 py-1 text-center text-ss font-medium text-white md:p-2.5"
            >
              <svg className="icon h-7 w-7 fill-white">
                <use xlinkHref="/img/sprite.svg#footer-wp"></use>
              </svg>
              Напишите нам в WhatsApp
            </a>
          </div>
          <div className="header-body__phone flex flex-col">
            <a
              href="tel:+79036569393"
              className="link-hover whitespace-nowrap text-[clamp(0.875rem,0.6772rem+0.6593vw,1.25rem)] font-bold"
            >
              +7 (903) 656-93-93
            </a>
            <button
              onClick={() => modalCallbackStateChange(true)}
              data-btn-callback
              type="button"
              className="link-hover mt-1 text-sm font-bold underline md:text-base"
            >
              обратная связь
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderBody
