'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'

import { SubcategoryCount } from '../CategoryProductsSlider/CategoryProductsSlider'
import { CategoryData } from '../CategoryProductsSlider/CategoryProductsSlider'

import initialCategoriesData from '../../data/products/categoriesData.json'
import { getProductsCounts } from '@/utils/api/products'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './CategoryPageSlider.scss'

interface Props {
  category: string
}

interface CategoriesData {
  [key: string]: CategoryData
}

const categoriesData = initialCategoriesData as CategoriesData

export const CategoryPageSlider: React.FC<Props> = ({ category }) => {
  const [isReady, setIsReady] = useState(false)
  const [productsCounts, setProductsCounts] = useState<SubcategoryCount>({})

  useEffect(() => {
    const fetchCounts = async () => {
      const result = await getProductsCounts()

      setProductsCounts(result)
    }

    fetchCounts()
  }, [])

  useEffect(() => {
    const initSlider = () => {
      setTimeout(() => {
        setIsReady(true)
      }, 500)
    }

    initSlider()
  }, [isReady])

  const categoryList = categoriesData[category]?.items || []

  return (
    <div className={`page-category-slider pt-10`}>
      <div className="page-container">
        {
          <div className="page-category-slider__category">
            <div className="page-category-slider__category-title relative inline-flex items-center gap-2.5 font-bold">
              Другие категории
            </div>
            <div className="page-category-slider relative overflow-hidden p-5">
              {isReady ? (
                <Swiper
                  modules={[Scrollbar]}
                  grabCursor={true}
                  followFinger={true}
                  watchSlidesProgress={true}
                  spaceBetween={20}
                  scrollbar={{
                    el: '.page-category-slider__scrollbar',
                    draggable: true,
                    dragSize: 200,
                  }}
                  breakpoints={{
                    320: {
                      spaceBetween: 10,
                      slidesPerView: 1.3,
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
                    },
                    1200: {
                      slidesPerView: 5,
                    },
                  }}
                >
                  {categoryList.map((item) => (
                    <SwiperSlide
                      key={item.href}
                      className="swiper-slide page-category-slider__category-link relative flex min-w-48 select-none flex-col items-center justify-center rounded px-2.5 py-5 text-center shadow-custom transition-all"
                    >
                      <Link href={item.href} className="blok h-full w-full">
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            className="mb-4 block h-20 w-20 object-contain"
                            src={item.img}
                            alt={item.title}
                            width={110}
                            height={110}
                          />
                          <div>
                            <div className="page-category-slider__category-link-title mb-4 px-2.5 font-bold leading-5 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-sm text-[#b7b7b7]">
                              {productsCounts[item.id]} товар
                              {productsCounts[item.id] === 1
                                ? ''
                                : productsCounts[item.id] >= 2 &&
                                    productsCounts[item.id] <= 4
                                  ? 'а'
                                  : 'ов'}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                  <div className="page-category-slider__scrollbar swiper-scrollbar"></div>
                </Swiper>
              ) : (
                <Skeleton count={1} width={'100%'} height={'300px'} />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
