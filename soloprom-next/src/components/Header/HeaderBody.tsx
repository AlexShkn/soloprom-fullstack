'use client'
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import HeaderBottom from './HeaderBottom/HeaderBottom'

const HeaderBody = () => {
  return (
    <div className="header-body relative flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-6">
      <Link
        href="/"
        className="header__logo flex-0-auto z-[2] inline-flex items-center font-bold"
      >
        <Image
          src="/img/logo.webp"
          width={40}
          height={40}
          className="h-10 w-10 object-contain xl:h-12 xl:w-12"
          alt=""
          priority
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-9 text-darkBlue mds:text-2xl xl:text-[28px]">
            <span className="mr-1">СОЛО</span>
            <b className="mt-[-5px] inline-block rounded bg-accentBlue px-1 leading-8 text-white">
              PROM
            </b>
          </span>
          <span className="max-w-32 pl-[5px] text-[9px] leading-[120%] text-[#3b3b3b] mds:max-w-36 xl:max-w-[170px] xl:text-[11px]">
            Интернет-магазин запчастей для спецтехники
          </span>
        </div>
      </Link>
      <HeaderBottom />
    </div>
  )
}

export default HeaderBody
