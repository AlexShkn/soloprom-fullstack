'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  className?: string
}

export const HeaderLogoBlock: React.FC<Props> = ({ className }) => {
  return (
    <Link
      href="/"
      className="header__logo z-[2] inline-flex flex-[0_0_auto] items-center font-bold"
    >
      <Image
        src="/img/logo.webp"
        width={40}
        height={40}
        className="h-10 w-10 object-contain xl:h-12 xl:w-12"
        alt="Soloprom"
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
  )
}
