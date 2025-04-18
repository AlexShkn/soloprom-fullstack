'use client'
import React, { useEffect, useState } from 'react'

import HeroMainSlider from '../HeroSliders/HeroMainSlider/HeroMainSlider'
import HeroCategoryBlock from '../HeroSliders/HeroCategoryBlock/HeroCategoryBlock'

import './Hero.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HeroCategoryStaticSlide } from '../HeroSliders/HeroCategoryBlock/HeroCategoryStaticSlide'

export interface HeroTypes {
  isReady: boolean
  isClient: boolean
}

const Hero = () => {
  const isTablet = useMediaQuery('(max-width: 991.98px)')

  return (
    <section className="hero bg-sectionWhite mds:pb-12 2xl:py-7">
      <div className="mx-auto flex flex-col gap-1 2xl:max-w-[1390px] 2xl:px-5">
        <div className="relative grid grid-cols-1 justify-between gap-1 overflow-hidden lg:grid-cols-[calc(60%-4px)40%]">
          <HeroMainSlider />
          {!isTablet && <HeroCategoryStaticSlide />}
        </div>
        <HeroCategoryBlock />
      </div>
    </section>
  )
}

export default Hero
