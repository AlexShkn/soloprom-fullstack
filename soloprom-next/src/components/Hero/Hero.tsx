'use client'
import React, { useEffect, useState } from 'react'

import HeroMainSlider from '../HeroSliders/HeroMainSlider/HeroMainSlider'
import HeroCategoryBlock from '../HeroSliders/HeroCategoryBlock/HeroCategoryBlock'

import './Hero.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HeroCategoryStaticSlide } from '../HeroSliders/HeroCategoryBlock/HeroCategoryStaticSlide'

export interface HeroTypes {
  isReady: boolean
}

const Hero = () => {
  const [isReady, setIsReady] = useState(false)
  const isTablet = useMediaQuery('(max-width: 991.98px)')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [isReady])

  return (
    <section className="hero bg-sectionWhite mds:pb-12 2xl:py-7">
      <div className="mx-auto flex flex-col gap-1 lg:gap-2 2xl:max-w-[1390px] 2xl:px-5">
        <div className="relative grid grid-cols-1 justify-between gap-1 overflow-hidden lg:grid-cols-[calc(60%-10px)40%] lg:gap-2">
          <HeroMainSlider isReady={isReady} />

          {!isTablet && <HeroCategoryStaticSlide isReady={isReady} />}
        </div>
        <HeroCategoryBlock isReady={isReady} />
      </div>
    </section>
  )
}

export default Hero
