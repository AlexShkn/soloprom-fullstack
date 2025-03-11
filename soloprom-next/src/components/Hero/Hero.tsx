'use client'
import React, { useEffect, useState } from 'react'

import HeroMainSlider from '../HeroSliders/HeroMainSlider/HeroMainSlider'
import HeroVerticalSlider from '../HeroSliders/HeroVerticalSlider/HeroVerticalSlider'

import './Hero.scss'

export interface HeroTypes {
  isReady: boolean
}

const Hero = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [isReady])

  return (
    <section className="hero bg-sectionWhite py-7">
      <div className="hero__hero-container">
        <div className="hero__body relative grid gap-2 overflow-hidden">
          <HeroMainSlider isReady={isReady} />
          <HeroVerticalSlider isReady={isReady} />
        </div>
      </div>
    </section>
  )
}

export default Hero
