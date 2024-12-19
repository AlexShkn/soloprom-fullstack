import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './HeroVerticalSlider.scss'

import { HeroTypes } from '@/components/Hero/Hero'

const verticalSliderData = [
  {
    title: 'Аккумуляторы',
    subtitle:
      'Тяговые АКБ, полутяговые, гелевые. Для штабелеров, погрузчиков, электротележек и поломоечной техники.',
    img: '/img/hero/main/acb-bg.webp',
    link: '/catalog/battery',
    alt: '',
  },
  {
    title: 'Шины для спецтехники',
    subtitle:
      'Для вилочных, телескопических, мини и фронтальных погрузчиков, грейдеров, колесных экскаваторов, сочлененных самосвалов, жесткорамных самосвалов.',
    img: '/img/hero/main/spec.webp',
    link: '/catalog/tires',
    alt: '',
  },
  {
    title: 'Масла и антифризы',
    subtitle:
      'Моторные, трансмиссионные, гидравлические и индустриальные масла',
    img: '/img/hero/main/oils.webp',
    link: '/catalog/oils',
    alt: '',
  },
]

const HeroVerticalSlider: React.FC<HeroTypes> = ({ isReady }) => {
  return (
    <>
      {isReady ? (
        <Swiper
          className="hero-vertical-slider relative h-[500px] w-full overflow-hidden"
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          watchSlidesProgress={true}
          spaceBetween={20}
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
              direction: 'horizontal',
              slidesPerView: 1,
              spaceBetween: 0,
            },
            650: {
              direction: 'horizontal',
              slidesPerView: 2,
              spaceBetween: 5,
            },
            992.98: {
              direction: 'vertical',
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {verticalSliderData.map((slide, index) => (
            <SwiperSlide key={index} className="hero-vertical-slider__slide">
              <a
                href={slide.link}
                className="hero__card hero__card--link btn-glare relative flex h-full items-center justify-center overflow-hidden rounded px-7 pb-[75px] pt-[50px]"
              >
                <div className="border">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <Image
                  className="duration-600 absolute inset-0 block h-full w-full transform object-cover transition ease-in-out"
                  src={slide.img}
                  priority
                  width={546}
                  height={240}
                  alt={slide.alt}
                />

                <div className="relative z-[2]">
                  <div className="hero__card-title mb-4 font-medium text-white">
                    {slide.title}
                  </div>
                  <div className="leading-5 text-white">{slide.subtitle}</div>
                </div>
                <div className="hero__card-link">
                  <svg className="icon">
                    <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                  </svg>
                </div>
              </a>
            </SwiperSlide>
          ))}

          <div className="hero-vertical-slider__pagination absolute bottom-[50%] right-[5px] z-[8] flex translate-y-[50%] flex-col justify-center gap-2.5 rounded-[20px] bg-accentBlue p-2 shadow-custom"></div>
        </Swiper>
      ) : (
        <div style={{ width: '100%', height: '100%' }}>
          <Skeleton
            style={{ marginBottom: '20px' }}
            count={2}
            width={'100%'}
            height={'50%'}
          />
          <Skeleton count={2} width={'100%'} height={'50%'} />
        </div>
      )}
    </>
  )
}

export default HeroVerticalSlider
