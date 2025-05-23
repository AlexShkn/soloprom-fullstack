'use client'
import React, { useRef, useEffect } from 'react'
import { CardDataProps } from '@/types/products.types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ProductsCard } from '../ProductsCard/ProductsCard'
import { SliderNavigation } from '../SliderNavigation'
import { Footnote } from '../Footnote'
import { Swiper as SwiperType } from 'swiper'

import './ProductListSlider.scss'

interface Props {
  listData: CardDataProps[]
  mod?: string
  id?: string
}

export const ProductListSlider: React.FC<Props> = ({ listData, mod, id }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  const updateSlideOpacities = () => {
    if (!swiperRef.current) return

    const activeIndex = swiperRef.current.activeIndex
    const visibleSlides = swiperRef.current.slides
    const slidesPerView = swiperRef.current.params.slidesPerView

    if (slidesPerView === undefined) return

    const slidesPerViewNumber =
      typeof slidesPerView === 'number' ? slidesPerView : 1

    visibleSlides.forEach((slide, index) => {
      if (index >= activeIndex && index < activeIndex + slidesPerViewNumber) {
        slide.style.opacity = '1'
        slide.style.transition = 'opacity 0.3s ease-in-out'
      } else {
        slide.style.opacity = '0'
        slide.style.transition = 'opacity 0.3s ease-in-out'
      }
    })
  }

  useEffect(() => {
    if (swiperRef.current) {
      updateSlideOpacities()

      swiperRef.current.on('slideChange', () => {
        updateSlideOpacities()
      })

      swiperRef.current.on('update', () => {
        updateSlideOpacities()
      })

      return () => {
        swiperRef.current?.off('slideChange')
        swiperRef.current?.off('update')
      }
    }
  }, [swiperRef.current])

  return (
    <>
      <Swiper
        className={`product-list-slider product-list-slider${id ? `-${String(id)}` : ''} relative overflow-hidden p-7`}
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
        navigation={{
          nextEl: `.product-list-slider${id ? `-${String(id)}` : ''}-next`,
          prevEl: `.product-list-slider${id ? `-${String(id)}` : ''}-prev`,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onInit={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {listData.map((item: CardDataProps) => (
          <SwiperSlide key={item.productId} className="">
            <ProductsCard cardData={item} mod={mod} />
          </SwiperSlide>
        ))}

        <SliderNavigation
          sliderClass={`product-list-slider${id ? `-${String(id)}` : ''}`}
          className="top-[60%]"
        />
      </Swiper>
      <Footnote />
    </>
  )
}
