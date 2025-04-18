'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface Category {
  title: string
  subtitle: string
  img: string
  link: string
  alt: string
}

interface Props {
  data: Category[]
}

export const HeroCategoryBlocks: React.FC<Props> = ({ data }) => {
  return (
    <div className="hero-vertical-slider relative grid w-full grid-cols-2 gap-1 overflow-hidden">
      {data.map((category, index) => (
        <div key={category.title} className="h-full">
          <Link
            href={category.link}
            className={`hero__card hero__card--link btn-glare relative flex h-full overflow-hidden px-7 pb-[60px] pt-[30px] transition-transform duration-300 ease-in before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-60 ${index > 0 ? '2xl:rounded-bl-2xl 2xl:rounded-br-custom 2xl:rounded-tl-2xl 2xl:rounded-tr-custom' : '2xl:rounded-bl-custom 2xl:rounded-br-2xl 2xl:rounded-tl-custom 2xl:rounded-tr-2xl'}`}
          >
            <div className="border">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Image
              className="duration-600 absolute inset-0 block h-full w-full object-cover transition-transform"
              src={category.img}
              priority
              width={546}
              height={246}
              alt={category.alt}
            />

            <div className="relative z-[2]">
              <div className="mb-4 text-[clamp(1.5rem,1.3022rem+0.6593vw,1.875rem)] font-medium text-white">
                {category.title}
              </div>
              <div className="leading-5 text-white">{category.subtitle}</div>
            </div>
            <div className="absolute bottom-0 left-0 z-10 inline-flex h-14 w-14 items-center justify-center rounded-tr-custom bg-accentBlue transition-colors hover:bg-hoverBlue">
              <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
