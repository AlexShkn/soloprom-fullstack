'use client'
import React from 'react'
import { cardDataProps } from '@/types/products.types'
import './ProductListSlider.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ProductsCard } from '../ProductsCard/ProductsCard'

interface Props {
  listData: cardDataProps[]
}

export const ProductListSlider: React.FC<Props> = ({ listData }) => {
  return (
    <>
      <Swiper
        className="product-list-slider relative overflow-hidden p-7"
        modules={[Navigation]}
        spaceBetween={30}
        watchSlidesProgress={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
        onSwiper={(swiper) => {
          const slidesPerView = swiper.params.slidesPerView
          const numSlidesPerView =
            typeof slidesPerView === 'number' ? slidesPerView : 1

          // if (swiper.slides.length >= numSlidesPerView) {
          //   setActiveNav(false)
          // }
        }}
        navigation={{
          nextEl: '.product-list-slider__slider-button--next',
          prevEl: '.product-list-slider__slider-button--prev',
        }}
      >
        {listData.map((item: cardDataProps) => (
          <SwiperSlide
            key={item.productId}
            className="product-list-slider__item opacity-0 transition-opacity duration-300 ease-in"
          >
            <ProductsCard cardData={item} />
          </SwiperSlide>
        ))}

        <div className="absolute left-[5px] right-[5px] top-[60%] translate-y-[-50%]">
          <button
            type="button"
            className="product-list-slider__slider-button product-list-slider__slider-button--prev absolute left-[5px] -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center transition-colors hover:bg-hoverBlue"
          >
            <svg className="icon pointer-events-none h-4 w-4 rotate-[90deg] select-none fill-white transition-colors">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </button>
          <button
            type="button"
            className="product-list-slider__slider-button product-list-slider__slider-button--next absolute right-[5px] -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center transition-colors hover:bg-hoverBlue"
          >
            <svg className="icon pointer-events-none h-4 w-4 rotate-[-90deg] select-none fill-white transition-colors">
              <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
            </svg>
          </button>
        </div>
      </Swiper>
      <p className="product-list-slider__footnote relative pl-2.5 text-sm leading-5">
        Мы стараемся держать цены на товары в актуальном состоянии, но лучше
        актуальную информацию получать у наших менеджеров онлайн, в мессенджерах
        или по телефону.
      </p>
    </>
  )
}
