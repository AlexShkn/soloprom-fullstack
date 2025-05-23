'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Link from 'next/link'

import './HeroMainSlider.scss'

const mainSliderData = [
  {
    title: 'Шины и аккумуляторы для специальной техники',
    subtitle: 'Широкий ассортимент в наличии и на заказ',
    img: '/img/hero/main/trucks-new.webp',
    link: '/catalog',
    btnText: 'Перейти в каталог',
    alt: '',
  },
  {
    title: 'Сезонные акции на шины',
    subtitle: 'Быстрый подбор под технику',
    img: '/img/hero/main/tires-main-800.webp',
    link: '/podbor-tires',
    btnText: 'Подобрать шину',
    alt: '',
  },
  {
    title: 'Подбор тяговых акб',
    subtitle: 'по характеристикам, типу и бренду техники',
    img: '/img/hero/main/contracts.webp',
    link: '/podbor-battery',
    btnText: 'Подобрать',
    alt: '',
  },
]

const HeroMainSlider = () => {
  return (
    <Swiper
      className="hero-main-slider relative h-auto w-full overflow-hidden 2xl:rounded-bl-custom 2xl:rounded-br-2xl 2xl:rounded-tl-custom 2xl:rounded-tr-2xl"
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
        <SwiperSlide key={slide.title} className="hero-main-slider__slide">
          <div className="hero__card duration-600 relative flex h-full items-center overflow-hidden px-8 pb-[25px] pt-[20px] transition-colors ease-in-out before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-60 mds:px-20 2xl:rounded-bl-custom 2xl:rounded-br-2xl 2xl:rounded-tl-custom 2xl:rounded-tr-2xl">
            <Image
              className="duration-600 absolute inset-0 block h-full w-full transform object-cover transition ease-in-out"
              src={slide.img}
              alt={slide.alt}
              priority
              width={824}
              height={300}
            />
            <div className="relative z-[2]">
              <div className="mb-5 text-[clamp(1.625rem,1.1635rem+1.5385vw,2.5rem)] font-bold leading-[110%] text-white">
                {slide.title}
              </div>

              {slide.subtitle && (
                <div className="mb-5 max-w-[500px] text-lg leading-tight text-white">
                  {slide.subtitle}
                </div>
              )}

              <Link
                href={slide.link}
                className="button relative z-10 rounded-custom p-5 font-bold leading-none"
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="hero-main-slider__pagination absolute bottom-2.5 right-5 z-[8] flex items-center gap-2.5 lg:bottom-7 lg:translate-x-[-50%]"></div>
    </Swiper>
  )
}

export default HeroMainSlider
