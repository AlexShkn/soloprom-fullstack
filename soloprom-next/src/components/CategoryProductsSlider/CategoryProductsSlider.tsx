'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Grid } from 'swiper/modules'
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
}
export interface CategoryData {
  icon: string
  title: string
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
            'Invalid data format received from getProductsCounts:',
            result,
          )
        }
      } catch (error) {
        console.error('Failed to fetch product counts:', error)
      }
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

  return (
    <div className={`catalog-products pb-[20px] pt-10 ${className || ''}`}>
      <div className="catalog-products__container">
        {Object.entries(categoriesData).map(([key, category]) => (
          <div className="catalog-products__category" key={key}>
            <div className="catalog-products__category-title relative inline-flex items-center gap-2.5 font-bold">
              {category.title}
            </div>
            <div className="catalog-products__category-slider relative overflow-hidden p-5">
              {isReady ? (
                <Swiper
                  modules={[Scrollbar, Grid]}
                  grabCursor={true}
                  followFinger={true}
                  watchSlidesProgress={true}
                  spaceBetween={20}
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
                  {category.items.map((item) => (
                    <SwiperSlide
                      key={item.href}
                      className="swiper-slide catalog-products__category-link relative flex select-none flex-col items-center justify-center rounded px-2.5 py-5 text-center shadow-custom transition-all"
                    >
                      <Link href={item.href} className="blok h-full w-full">
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            className="catalog-products__category-link-image mb-4 block h-[110px] w-[110px] object-contain"
                            src={item.img}
                            alt={item.title}
                            width={110}
                            height={110}
                          />
                          <div className="catalog-products__category-body">
                            <div className="catalog-products__category-link-title mb-4 text-lg font-bold leading-5 transition-colors">
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
                  <div className="service-packages__scrollbar swiper-scrollbar"></div>
                </Swiper>
              ) : (
                <Skeleton count={1} width={'100%'} height={'300px'} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
