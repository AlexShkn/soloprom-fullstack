'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

interface Props {
  brandsList: string[]
}

export const CategoryPageBrands: React.FC<Props> = ({ brandsList }) => {
  return (
    <Swiper
      className="category-hero__brands-slider w-full overflow-hidden"
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={8}
      loop={true}
      speed={800}
      autoplay={{
        delay: 4000,
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        375: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 4,
        },
        576: {
          slidesPerView: 4,
        },
        650: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 7,
        },
      }}
    >
      {brandsList.map((brand) => (
        <SwiperSlide key={brand} className="category-hero__brands-item">
          <Image
            src={`/img/category/brands/battery/${brand}.jpg`}
            alt={brand}
            width={120}
            height={120}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
