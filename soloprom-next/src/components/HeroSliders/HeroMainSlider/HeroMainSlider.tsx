'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './HeroMainSlider.scss'

import { HeroTypes } from '@/components/Hero/Hero'
import Link from 'next/link'

const mainSliderData = [
  {
    title: 'Запчасти для спецтехники',
    subtitle:
      'Широкий ассортимент аккумуляторов, шин и запчастей для специальной техники',
    img: '/img/hero/main/trucks-new.webp',
    link: '/catalog',
    btnText: 'ПЕРЕЙТИ В КАТАЛОГ',
    alt: '',
  },
  {
    title: 'Сезонные акции на шины',
    subtitle: '',
    img: '/img/hero/main/tires-main-800.webp',
    link: '/catalog/tires',
    btnText: 'Каталог шин',
    alt: '',
  },
  {
    title: 'Подбор тяговых акб по характеристикам, типу и бренду техники',
    subtitle: '',
    img: '/img/hero/main/contracts.webp',
    link: '/catalog/battery',
    btnText: 'Подобрать',
    alt: '',
  },
]

const HeroMainSlider: React.FC<HeroTypes> = ({ isReady }) => {
  return (
    <>
      {isReady ? (
        <Swiper
          className="hero-main-slider"
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={800}
          effect={'fade'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.hero-main-slider__pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: (index, className) => {
              return (
                '<span class="' +
                className +
                '"><svg class="circle" width="24" height="24" viewBox="0 0 60 60"><circle class="circle2" cx="34" cy="34" r="12" stroke="#fff" stroke-width="8" fill="none"/><circle class="circle1" cx="34" cy="34" r="12" stroke="#007dfb" stroke-width="8" fill="none"/></svg></span>'
              )
            },
          }}
        >
          {mainSliderData.map((slide, index) => (
            <SwiperSlide key={index} className="hero-main-slider__slide">
              <div className="hero__card duration-600 relative flex h-full items-center justify-center overflow-hidden rounded px-7 pb-[75px] pt-[50px] transition-colors ease-in-out before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-60">
                <Image
                  className="duration-600 absolute inset-0 block h-full w-full transform object-cover transition ease-in-out"
                  src={slide.img}
                  alt={slide.alt}
                  priority
                  width={824}
                  height={500}
                />
                <div className="relative z-[2]">
                  <div className="hero__title mb-5 font-bold text-white">
                    {slide.title}
                  </div>

                  {slide.subtitle && (
                    <div className="hero__subtitle max-w-[500] font-medium leading-5 text-white">
                      {slide.subtitle}
                    </div>
                  )}

                  <Link
                    href={slide.link}
                    className="button relative z-10 w-full max-w-[300] p-5 font-bold uppercase"
                  >
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="hero-main-slider__pagination right-[50%]translate-x-[-50%] absolute bottom-7 z-[8] flex items-center gap-2.5"></div>
        </Swiper>
      ) : (
        <Skeleton count={1} width={'100%'} height={'300px'} />
      )}
    </>
  )
}

export default HeroMainSlider
