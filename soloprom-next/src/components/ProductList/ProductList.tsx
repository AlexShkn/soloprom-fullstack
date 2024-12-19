'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import axios from 'axios'

import './ProductList.scss'
import { ProductsCard } from '../ProductsCard/ProductsCard'

// Интерфейсы остаются без изменений

export interface cardDataProps {
  id: string
  url: string
  category: string
  subcategory: string
  name: string
  descr: string
  img: string
  group: string[]
  delivery: string
  sizes?: { [size: string]: number }
  defaultPrice: number
  volumes?: { [size: string]: number }
  models?: string[]
  type: string
  brand: string
  country: string
  size?: string
  weight?: string
  voltage?: string
  container?: string
  plates?: string
  discount?: number
  regalia?: string[]
  isPopular?: boolean
}

interface FavoriteList {
  tires: cardDataProps[]
  battery: cardDataProps[]
  oils: cardDataProps[]
}

export interface ProductsCardProps {
  cardData: cardDataProps
}

const productTypes = [
  { name: 'Шины', type: 'tires' },
  { name: 'Аккумуляторы', type: 'battery' },
  { name: 'Масла', type: 'oils' },
]

export const ProductList: React.FC = () => {
  const [currantTab, setCurrantTab] = useState<'tires' | 'battery' | 'oils'>(
    'tires',
  )
  const [activeNav, setActiveNav] = useState(true)
  const [popularProducts, setPopularProducts] = useState<FavoriteList>({
    tires: [],
    battery: [],
    oils: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/products')
        const data: cardDataProps[] = response.data

        console.log(data)

        const popularProductsData: FavoriteList = {
          tires: data.filter((item) => item.category === 'tires'),
          battery: data.filter((item) => item.category === 'battery'),
          oils: data.filter((item) => item.category === 'oils'),
        }

        setPopularProducts(popularProductsData)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="product-list section-offset">
      <div className="product-list__container">
        <h2 className="section-title product-list__title">Популярные товары</h2>
        <div className="product-list__tabs">
          <div className="product-list__caption-list">
            {productTypes.map((caption) => (
              <div
                onClick={() =>
                  setCurrantTab(caption.type as 'tires' | 'battery' | 'oils')
                }
                key={caption.type}
                className={`product-list__caption ${caption.type === currantTab && 'active'}`} // Correct template literal syntax
              >
                {caption.name}
              </div>
            ))}
          </div>
          <div className="product-list__content">
            {productTypes.map((category) => (
              <div
                key={category.type}
                className={`product-list__body ${category.type === currantTab && 'active'}`}
              >
                <Swiper
                  className="product-list__slider"
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

                    if (swiper.slides.length >= numSlidesPerView) {
                      setActiveNav(false)
                    }
                  }}
                  navigation={{
                    nextEl: '.product-list__slider-button--next',
                    prevEl: '.product-list__slider-button--prev',
                  }}
                >
                  {popularProducts[currantTab].map((item) => (
                    <SwiperSlide key={item.id} className="product-list__item">
                      <ProductsCard cardData={item} />
                    </SwiperSlide>
                  ))}

                  <div className="product-list__slider-buttons">
                    <button
                      type="button"
                      className="product-list__slider-button product-list__slider-button--prev"
                    >
                      <svg className="icon">
                        <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="product-list__slider-button product-list__slider-button--next"
                    >
                      <svg className="icon">
                        <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
                      </svg>
                    </button>
                  </div>
                </Swiper>
              </div>
            ))}
          </div>

          <p className="product-list__footnote">
            Мы стараемся держать цены на товары в актуальном состоянии, но лучше
            актуальную информацию получать у наших менеджеров онлайн, в
            мессенджерах или по телефону.
          </p>
        </div>
      </div>
    </section>
  )
}
