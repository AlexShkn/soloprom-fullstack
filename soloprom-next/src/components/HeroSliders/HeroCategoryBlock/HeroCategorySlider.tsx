'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

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

export const HeroCategorySlider: React.FC<Props> = ({ data }) => {
  return (
    <Swiper
      className="hero-vertical-slider relative w-full overflow-hidden"
      modules={[Pagination, Autoplay]}
      grabCursor={true}
      watchSlidesProgress={true}
      spaceBetween={8}
      pagination={{
        el: '.hero-vertical-slider__pagination',
        clickable: true,
      }}
      loop={true}
      speed={800}
      effect={'fade'}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        650: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
      }}
    >
      {data.map((slide, index) => (
        <SwiperSlide key={slide.title} className="hero-vertical-slider__slide">
          <Link
            href={slide.link}
            className="hero__card hero__card--link btn-glare relative flex h-full justify-center overflow-hidden px-7 pb-[25px] pt-[30px] transition-transform duration-300 ease-in before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-60 2xl:rounded"
          >
            <div className="border">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Image
              className="duration-600 absolute inset-0 block h-full w-full object-cover transition-transform"
              src={slide.img}
              priority
              width={546}
              height={246}
              alt={slide.alt}
            />

            <div className="relative z-[2]">
              <div className="mb-4 text-[clamp(1.5rem,1.3022rem+0.6593vw,1.875rem)] font-medium text-white">
                {slide.title}
              </div>
              <div className="leading-5 text-white">{slide.subtitle}</div>
            </div>
            <div className="absolute bottom-0 left-0 z-10 inline-flex h-14 w-14 items-center justify-center rounded-tr-custom bg-accentBlue transition-colors hover:bg-hoverBlue">
              <svg className="icon h-5 w-5 rotate-[-90deg] fill-white">
                <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
              </svg>
            </div>
          </Link>
        </SwiperSlide>
      ))}

      <div className="hero-vertical-slider__pagination absolute bottom-[50%] right-[5px] z-[8] flex translate-y-[50%] flex-col justify-center gap-2.5 rounded-[20px] bg-accentBlue p-2 shadow-custom"></div>
    </Swiper>
  )
}
