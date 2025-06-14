'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'

import {
  SubcategoryCount,
  CategoryData,
} from '../CategoriesSliders/CategoriesSliders'

import initialCategoriesData from '../../data/products/categoriesData.json'
import { getProductsCounts } from '../../api/products'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './OtherCategorySlider.scss'
import { SliderNavigation } from '../SliderNavigation'
import { SwiperScrollbar } from '../SwiperScrollbar/SwiperScrollbar'
import { getItemCountString } from '@/utils/getItemCountString'

interface Props {
  category: string
}

interface CategoriesData {
  [key: string]: CategoryData
}

const categoriesData = initialCategoriesData as CategoriesData

export const OtherCategorySlider: React.FC<Props> = ({ category }) => {
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

  const categoryList = categoriesData[category]?.items || []

  return (
    <div className={`page-category-slider pt-10`}>
      <div className="page-container">
        <div className="page-category-slider__category products-card-slider">
          <div className="relative mb-[clamp(0.9375rem,0.443rem+1.6484vw,1.875rem)] inline-flex items-center gap-2.5 text-[clamp(1.25rem,1.0522rem+0.6593vw,1.625rem)] font-bold">
            Другие категории
          </div>
          <div className="page-category-slider relative overflow-hidden p-5">
            {isReady ? (
              <Swiper
                modules={[Scrollbar, Navigation]}
                grabCursor={true}
                followFinger={true}
                watchSlidesProgress={true}
                spaceBetween={20}
                scrollbar={{
                  el: '.category-page-slider-scrollbar',
                  draggable: true,
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
                    spaceBetween: 20,
                    slidesPerView: 2.3,
                  },

                  650: {
                    spaceBetween: 20,
                    slidesPerView: 2.8,
                  },
                  780: {
                    spaceBetween: 20,
                    slidesPerView: 3.4,
                  },
                  992: {
                    spaceBetween: 20,
                    slidesPerView: 4,
                    scrollbar: { draggable: true },
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
                navigation={{
                  nextEl: '.category-page-slider-next',
                  prevEl: '.category-page-slider-prev',
                }}
              >
                {categoryList.map((item) => {
                  const countString = getItemCountString(
                    productsCounts[item.id],
                  )

                  return (
                    <SwiperSlide
                      key={item.href}
                      className="swiper-slide group relative flex min-w-48 select-none flex-col items-center justify-center rounded-custom text-center shadow-custom transition-all any-hover:hover:bg-accentBlue"
                    >
                      <Link
                        href={item.href}
                        className="block h-full w-full p-2.5"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            className="mb-2 block h-16 w-16 object-contain"
                            src={item.img}
                            alt={item.title}
                            width={64}
                            height={64}
                          />
                          <div className="any-hover:group-hover:text-white">
                            <div className="mb-4 px-2.5 font-bold leading-5 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-sm text-grayText">
                              {productsCounts[item.id]
                                ? `${productsCounts[item.id]} ${countString}`
                                : '0 товаров'}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  )
                })}
                <SliderNavigation
                  sliderClass="category-page-slider"
                  className="bottom-8 top-auto"
                />
                <SwiperScrollbar sliderClass="category-page-slider" />
              </Swiper>
            ) : (
              <Skeleton count={1} width={'100%'} height={'300px'} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
