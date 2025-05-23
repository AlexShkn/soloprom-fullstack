'use client'
import React from 'react'
import Image from 'next/image'

interface Props {
  categoryTitle: string
  categoryImage: string
  categoryAlt: string
}

export const CategoryPageHero: React.FC<Props> = ({
  categoryTitle,
  categoryImage,
  categoryAlt,
}) => {
  return (
    <section className="relative w-full md:w-[calc(100%-250px)] lg:w-[calc(100%-260px)] xl:w-[calc(75%-30px)]">
      <div className="relative flex h-full w-full items-center justify-end overflow-hidden rounded px-5 py-5 shadow-custom before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-[linear-gradient(100deg,rgba(0,0,0,0)_45%,#142f49_45%)]">
        <Image
          className="absolute inset-0 h-full w-[60%] object-cover"
          src={`${categoryImage.toLowerCase()}.webp`}
          alt={categoryAlt}
          width={983}
          height={0}
          priority
        />
        <h1 className="category-title relative z-[2] max-w-[400px] text-center font-bold text-white">
          {categoryTitle}
        </h1>
      </div>
    </section>
  )
}
