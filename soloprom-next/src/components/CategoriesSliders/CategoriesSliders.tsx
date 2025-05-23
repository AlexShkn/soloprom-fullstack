'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Grid, Navigation } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './CategoriesSliders.scss'

import initialCategoriesData from '../../data/products/categoriesData.json'

import { getProductsCounts } from '../../api/products'
import { SliderNavigation } from '../SliderNavigation'
import { SwiperScrollbar } from '../SwiperScrollbar/SwiperScrollbar'
import { getItemCountString } from '@/utils/getItemCountString'

export interface CategoryItem {
  id: string
  href: string
  img: string
  title: string
  type: string
  short: string
}
export interface CategoryData {
  icon: string
  title: string
  abbreviated: string
  items: CategoryItem[]
}
export interface CategoriesData {
  [key: string]: CategoryData
}

interface Props {
  className?: string
  categoriesData: CategoriesData
}

export interface SubcategoryCount {
  [subcategory: string]: number
}

export const CategoriesSliders: React.FC<Props> = ({
  className,
  categoriesData,
}) => {
  const [isReady, setIsReady] = useState(false)
  const [productsCounts, setProductsCounts] = useState<SubcategoryCount>({})

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const result = await getProductsCounts()

        if (result && typeof result === 'object' && !Array.isArray(result)) {
          setProductsCounts(result as SubcategoryCount)
        } else {
          console.error(
            'Неверный формат данных, полученных из getProductsCounts:',
            result,
          )
        }
      } catch (error) {
        console.error('Не удалось получить количество продуктов:', error)
      }
    }

    fetchCounts()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [isReady])

  return (
    <section className={`catalog-products pb-5 pt-12 ${className}`}>
      <div className="page-container flex flex-col gap-5">
        {Object.entries(categoriesData).map(([key, category]) => (
          <div key={key}>
            <h2 className="relative mb-[clamp(0.9375rem,0.443rem+1.6484vw,1.875rem)] inline-flex items-center gap-2.5 text-[clamp(1.25rem,1.0522rem+0.6593vw,1.625rem)] font-bold">
              {category.title}
            </h2>
            <div className="products-card-slider relative overflow-hidden">
              {isReady ? (
                <Swiper
                  modules={[Scrollbar, Grid, Navigation]}
                  grabCursor={true}
                  followFinger={true}
                  watchSlidesProgress={true}
                  spaceBetween={15}
                  grid={{ rows: 3, fill: 'row' }}
                  scrollbar={{
                    el: '.catalog-products-slider-scrollbar',
                    dragSize: 200,
                  }}
                  breakpoints={{
                    320: {
                      spaceBetween: 10,
                      slidesPerView: 1.3,
                      scrollbar: { draggable: false },
                    },
                    375: {
                      spaceBetween: 10,
                      slidesPerView: 2,
                    },
                    550: {
                      spaceBetween: 15,
                      slidesPerView: 2.3,
                    },

                    650: {
                      spaceBetween: 15,
                      slidesPerView: 2.8,
                    },
                    780: {
                      spaceBetween: 15,
                      slidesPerView: 3.4,
                    },
                    992: {
                      spaceBetween: 15,
                      slidesPerView: 4,
                      scrollbar: { draggable: true },
                    },
                    1200: {
                      slidesPerView: 6,
                    },
                  }}
                  navigation={{
                    nextEl: '.catalog-products-slider-next',
                    prevEl: '.catalog-products-slider-prev',
                  }}
                >
                  {category.items.map((item) => {
                    const countString = getItemCountString(
                      productsCounts[item.id],
                    )

                    return (
                      <SwiperSlide
                        key={item.href}
                        className="swiper-slide group relative flex select-none flex-col items-center justify-center rounded-2xl text-center shadow-full transition-all any-hover:hover:bg-accentBlue"
                      >
                        <Link
                          href={item.href}
                          className="block h-full w-full overflow-hidden"
                        >
                          <div className="relative flex h-full flex-col items-end pb-9 pt-4">
                            <div className="w-full px-4 text-left any-hover:group-hover:text-white">
                              <div className="title mb-2 text-ss font-medium leading-4 transition-colors mds:text-base mds:leading-5">
                                {item.title}
                              </div>
                              <div className="text-sm text-grayText any-hover:group-hover:text-white any-hover:group-hover:underline">
                                {productsCounts[item.id]
                                  ? `${productsCounts[item.id]} ${countString}`
                                  : '0 товаров'}
                              </div>
                            </div>
                            <Image
                              className="absolute bottom-0 right-0 block h-16 w-16 object-contain mds:h-16 mds:w-16"
                              src={item.img}
                              alt={item.title}
                              width={64}
                              height={64}
                            />
                          </div>
                        </Link>
                      </SwiperSlide>
                    )
                  })}
                  <SliderNavigation sliderClass="catalog-products-slider" />

                  <SwiperScrollbar sliderClass="catalog-products-slider" />
                </Swiper>
              ) : (
                <Skeleton count={1} width={'100%'} height={'300px'} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
