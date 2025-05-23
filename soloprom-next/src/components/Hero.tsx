'use client'
import React, { Suspense } from 'react'

import HeroMainSlider from './HeroSliders/HeroMainSlider/HeroMainSlider'
import HeroCategoryBlock from './HeroSliders/HeroCategoryBlock/HeroCategoryBlock'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HeroCategoryStaticSlide } from './HeroSliders/HeroCategoryBlock/HeroCategoryStaticSlide'
import { Loading } from './ui'
import HeroLoadWrapper from './HeroLoadWrapper'

export interface HeroTypes {
  isReady: boolean
  isClient: boolean
}

const Hero = () => {
  const isTablet = useMediaQuery('(max-width: 991.98px)')
  const isMobileSmall = useMediaQuery('(max-width: 767.98px)')

  return (
    <HeroLoadWrapper>
      <section className="hero bg-sectionWhite mds:pb-12 2xl:py-7">
        <div className="mx-auto flex flex-col gap-1 2xl:max-w-[1390px] 2xl:px-5">
          <div className="relative grid grid-cols-1 justify-between gap-1 overflow-hidden lg:grid-cols-[calc(60%-4px)40%]">
            <HeroMainSlider />

            <Suspense fallback={<Loading />}>
              {!isTablet && <HeroCategoryStaticSlide />}
            </Suspense>
          </div>

          <Suspense fallback={<Loading />}>
            {!isMobileSmall && <HeroCategoryBlock />}
          </Suspense>
        </div>
      </section>
    </HeroLoadWrapper>
  )
}

export default Hero
