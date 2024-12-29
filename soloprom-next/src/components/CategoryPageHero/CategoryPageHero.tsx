'use client'
import React from 'react'
import Image from 'next/image'

import './CategoryPageHero.scss'

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
    <section className="category-hero relative mb-12">
      <div className="category-hero__body relative mb-5 flex w-full justify-end overflow-hidden rounded px-5 shadow-custom">
        <Image
          className="absolute inset-0 h-full w-[60%] object-cover"
          src={`${categoryImage}.webp`}
          alt={categoryAlt}
          width={983}
          height={0}
        />
        <h1 className="category-hero__title relative z-[2] max-w-[400px] text-center font-bold">
          {categoryTitle}
        </h1>
      </div>

      <div className="swiper-slider category-hero__brands-slider w-full overflow-hidden">
        <ul className="swiper-wrapper category-hero__brands-list">
          <li className="swiper-slide category-hero__brands-item">
            <img
              src="/img/category/brands/battery/jungheinrich.jpg"
              alt="jungheinrich"
            />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/komatsu.jpg" alt="komatsu" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img
              src="/img/category/brands/battery/balkanar.png"
              alt="balkanar"
            />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/hangcha.jpg" alt="hangcha" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/maximal.jpg" alt="maximal" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/nichiyu.jpg" alt="nichiyu" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/om.jpg" alt="om" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/still.jpg" alt="still" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/tcm.jpg" alt="tcm" />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img
              src="/img/category/brands/battery/vp.jpg"
              alt="Волжский погрузчик"
            />
          </li>
          <li className="swiper-slide category-hero__brands-item">
            <img src="/img/category/brands/battery/jac.jpg" alt="jac" />
          </li>
        </ul>
      </div>
    </section>
  )
}
