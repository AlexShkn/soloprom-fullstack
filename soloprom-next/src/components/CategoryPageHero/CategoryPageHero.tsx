'use client'
import React from 'react'
import Image from 'next/image'

import './CategoryPageHero.scss'
import { CategoryPageBrands } from './CategoryPageBrands'

interface Props {
  categoryTitle: string
  categoryImage: string
  categoryAlt: string
}

const brandsList = [
  'jungheinrich',
  'komatsu',
  'balkanar',
  'hangcha',
  'maximal',
  'nichiyu',
  'om',
  'still',
  'tcm',
  'vp',
  'jac',
]

export const CategoryPageHero: React.FC<Props> = ({
  categoryTitle,
  categoryImage,
  categoryAlt,
}) => {
  return (
    <section className="category-hero relative">
      <div className="category-hero__body relative mb-5 flex w-full justify-end overflow-hidden rounded px-5 shadow-custom">
        <Image
          className="absolute inset-0 h-full w-[60%] object-cover"
          src={`${categoryImage}.webp`}
          alt={categoryAlt}
          width={983}
          height={0}
          priority
        />
        <h1 className="category-hero__title relative z-[2] max-w-[400px] text-center font-bold">
          {categoryTitle}
        </h1>
      </div>

      {/* <CategoryPageBrands brandsList={brandsList} /> */}
    </section>
  )
}
