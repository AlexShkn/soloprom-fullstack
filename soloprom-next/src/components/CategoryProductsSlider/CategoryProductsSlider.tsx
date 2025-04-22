'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Grid, Navigation } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './CategoryProductsSlider.scss'

import initialCategoriesData from '../../data/products/categoriesData.json'

import { getProductsCounts } from '@/utils/api/products'

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
}

export interface SubcategoryCount {
  [subcategory: string]: number
}

const categoriesData = initialCategoriesData as CategoriesData

export const CategoryProductsSlider: React.FC<Props> = ({ className }) => {
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
    <section className={`catalog-products pb-5 pt-12 mds:pt-2.5 ${className}`}>
      <div className="catalog-products__container">
        {Object.entries(categoriesData).map(([key, category]) => (
          <div key={key}>
            <h2 className="relative mb-[clamp(0.9375rem,0.443rem+1.6484vw,1.875rem)] inline-flex items-center gap-2.5 text-[clamp(1.25rem,1.0522rem+0.6593vw,1.625rem)] font-bold">
              {category.title}
            </h2>
            <div className="catalog-products__category-slider relative overflow-hidden px-2.5 py-1 mds:p-1">
              {isReady ? (
                <Swiper
                  modules={[Scrollbar, Grid, Navigation]}
                  grabCursor={true}
                  followFinger={true}
                  watchSlidesProgress={true}
                  spaceBetween={15}
                  grid={{ rows: 2, fill: 'row' }}
                  scrollbar={{
                    el: '.service-packages__scrollbar',
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
                    },
                    1200: {
                      slidesPerView: 6,
                    },
                  }}
                  navigation={{
                    nextEl: '.category-slider__next',
                    prevEl: '.category-slider__prev',
                  }}
                >
                  {category.items.map((item) => (
                    <SwiperSlide
                      key={item.href}
                      className="swiper-slide category-link relative flex select-none flex-col items-center justify-center rounded-custom px-2.5 py-5 text-center shadow-custom transition-all"
                    >
                      <Link href={item.href} className="blok h-full w-full">
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            className="mb-2 block h-20 w-20 object-contain mds:h-[80px] mds:w-[80px]"
                            src={item.img}
                            alt={item.title}
                            width={80}
                            height={80}
                          />
                          <div className="catalog-products__category-body">
                            <div className="title mb-4 text-[14px] font-bold leading-5 transition-colors mds:text-[16px]">
                              {item.title}
                            </div>
                            <div className="text text-sm text-[#b7b7b7]">
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
                  <div className="absolute left-[5px] right-[5px] top-[43%] translate-y-[-50%]">
                    <button
                      type="button"
                      className="category-slider__prev absolute left-[5px] -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center transition-all hover:bg-hoverBlue"
                    >
                      <svg className="icon pointer-events-none h-4 w-4 rotate-[90deg] select-none fill-white transition-colors">
                        <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="category-slider__next absolute right-[5px] -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center transition-all hover:bg-hoverBlue"
                    >
                      <svg className="icon pointer-events-none h-4 w-4 rotate-[-90deg] select-none fill-white transition-colors">
                        <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="service-packages__scrollbar swiper-scrollbar"></div>
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
