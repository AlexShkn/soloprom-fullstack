'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { HeroTypes } from '@/components/Hero/Hero'

export const HeroCategoryStaticSlide: React.FC<HeroTypes> = ({ isReady }) => {
  return (
    <div className="hero-vertical-slider__slide h-full">
      {isReady ? (
        <Link
          href={'/catalog/tires'}
          className="hero__card hero__card--link btn-glare relative flex h-full items-center overflow-hidden px-7 pb-[45px] pt-[30px] transition-transform duration-300 ease-in before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-60 2xl:rounded"
        >
          <div className="border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Image
            className="duration-600 absolute inset-0 block h-full w-full object-cover transition-transform"
            src="/img/hero/main/spec.webp"
            priority
            width={546}
            height={246}
            alt=""
          />

          <div className="relative z-[2]">
            <div className="mb-4 text-[clamp(1.5rem,1.3022rem+0.6593vw,1.875rem)] font-medium text-white">
              Шины для спецтехники
            </div>
            <div className="leading-5 text-white">
              Для вилочных, телескопических, мини и фронтальных погрузчиков,
              грейдеров, колесных экскаваторов, сочлененных и жесткорамных
              самосвалов.
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-10 inline-flex h-14 w-14 items-center justify-center rounded-tr-custom bg-accentBlue transition-colors hover:bg-hoverBlue">
            <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </div>
        </Link>
      ) : (
        <Skeleton count={1} width={'100%'} height={'300px'} />
      )}
    </div>
  )
}
