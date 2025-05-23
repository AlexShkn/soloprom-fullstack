'use client'
import React from 'react'

import './SwiperScrollbar.scss'

interface Props {
  className?: string
  sliderClass: string
}

export const SwiperScrollbar: React.FC<Props> = ({
  className,
  sliderClass,
}) => {
  return <div className={`${sliderClass}-scrollbar swiper-scrollbar`}></div>
}
