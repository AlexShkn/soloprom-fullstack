'use client'
import React from 'react'
import { Button } from './ui'

interface Props {
  className?: string
  sliderClass: string
}

export const SliderNavigation: React.FC<Props> = ({
  className,
  sliderClass,
}) => {
  return (
    <div
      className={`absolute left-[5px] right-[5px] top-[43%] translate-y-[-50%] ${className}`}
    >
      <Button
        aria-label="Переключить назад"
        className={`${sliderClass}-prev slider-nav-prev absolute left-[5px] -m-2.5 h-10 w-10 rounded-[50%] p-2.5`}
      >
        <svg className="icon pointer-events-none h-4 w-4 rotate-[90deg] select-none fill-white transition-colors">
          <use xlinkHref="/img/sprite.svg#arrow-drop"></use>
        </svg>
      </Button>
      <Button
        aria-label="Переключить вперед"
        className={`${sliderClass}-next slider-nav-next absolute right-[5px] -m-2.5 h-10 w-10 rounded-[50%] p-2.5`}
      >
        <svg className="icon pointer-events-none h-4 w-4 rotate-[-90deg] select-none fill-white transition-colors">
          <use xlinkHref="/img/sprite.svg#arrow-drop"></use>
        </svg>
      </Button>
    </div>
  )
}
