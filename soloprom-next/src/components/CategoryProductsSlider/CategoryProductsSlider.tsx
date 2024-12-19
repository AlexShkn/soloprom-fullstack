'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Grid } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './CategoryProductsSlider.scss'

interface Props {
  className?: string
}

export const categoriesData = {
  tires: {
    icon: 'catalog-tires',
    title: 'Шины для специальной техники',
    items: [
      {
        href: '/catalog/tires/shini-celnolitie',
        img: '/img/catalog/category/tires/teleskopicheskii-pogruzchik.webp',
        title: 'Для телескопических погрузчиков',
        count: 7,
      },
      {
        href: '/catalog/tires/shini-bandazhnie',
        img: '/img/catalog/category/tires/bandazhnie-shini.webp',
        title: 'Бандажные',
        count: 4,
      },
      {
        href: '/catalog/tires/shini-pnevmatichesckie',
        img: '/img/catalog/category/tires/pnevmatichesckie-shini.webp',
        title: 'Пневматические',
        count: 281,
      },
      {
        href: '/catalog/tires/shini-dlya-teleskopicheskih-pogruzchikov',
        img: '/img/catalog/category/tires/shini-celnolitite.webp',
        title: 'Цельнолитые',
        count: 67,
      },
      {
        href: '/catalog/tires/shini-dlya-minipogruzchikov',
        img: '/img/catalog/category/tires/shini-dlya-mini-pogruzchikov.webp',
        title: 'Для минипогрузчиков',
        count: 27,
      },
      {
        href: '/catalog/tires/shini-dlya-ekskavator-pogruzchikov',
        img: '/img/catalog/category/tires/dlya-ekskavator-pogruzchikov.webp',
        title: 'Для экскаватор - погрузчиков',
        count: 37,
      },
      {
        href: '/catalog/tires/shini-dlya-selhoztehniki',
        img: '/img/catalog/category/tires/selhoztechnika.webp',
        title: 'Для сельскохозяйственной техники',
        count: 52,
      },
      {
        href: '/catalog/tires/shini-dlya-sochlenennih-samosvalov',
        img: '/img/catalog/category/tires/sochlenenni-samosval.webp',
        title: 'Для сочлененных самосвалов',
        count: 4,
      },
      {
        href: '/catalog/tires/shini-dlya-portov-i-terminalov',
        img: '/img/catalog/category/tires/richstaker.webp',
        title: 'Для портов и терминалов',
        count: 7,
      },
      {
        href: '/catalog/tires/shini-dlya-zhestkoramnih-samosvalov',
        img: '/img/catalog/category/tires/zhestkoramnii-samosval.webp',
        title: 'Для жесткорамных самосвалов',
        count: 1,
      },
      {
        href: '/catalog/tires/shini-dlya-vilochnih-pogruzchikov',
        img: '/img/catalog/category/tires/vilochnii-pogruzchik.webp',
        title: 'Для вилочных погрузчиков',
        count: 126,
      },
      {
        href: '/catalog/tires/shini-dlya-greiderov',
        img: '/img/catalog/category/tires/greider.webp',
        title: 'Для грейдеров',
        count: 4,
      },
      {
        href: '/catalog/tires/shini-dlya-frontalnih-pogruzchikov',
        img: '/img/catalog/category/tires/frontalnii-pogruzchik.webp',
        title: 'Для фронтальных погрузчиков',
        count: 32,
      },
      {
        href: '/catalog/tires/shini-dlya-kolesnih-ekskavatorov',
        img: '/img/catalog/category/tires/kolesnii-ekskavator.webp',
        title: 'Долесных экскаваторов',
        count: 5,
      },
      {
        href: '/catalog/tires/shini-dlya-asfaltoukladchikov-i-katkov',
        img: '/img/catalog/category/tires/asphaltoukladchik.webp',
        title: 'Для асфальтоукладчиков и катков',
        count: 7,
      },
      {
        href: '/catalog/tires/shini-legkovie',
        img: '/img/catalog/category/tires/legkovie.webp',
        title: 'Легковые',
        count: 43,
      },
    ],
  },
  acb: {
    icon: 'catalog-battery',
    title: 'Аккумуляторные батареи',
    items: [
      {
        href: '/catalog/battery/accumulyatori-tyagovie',
        img: '/img/catalog/category/battery/tyagovie.webp',
        title: 'Тяговые аккумуляторы',
        count: 104,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-pogruzchikov',
        img: '/img/catalog/category/battery/akb-dlya-pogruzchijov.webp',
        title: 'Аккумуляторы для погрузчиков',
        count: 77,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-polomoechnih-mashin',
        img: '/img/catalog/category/battery/akb-dlya-polomoechnih-mashin.webp',
        title: 'Аккумуляторы для поломоечных машин',
        count: 1,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-richtrakov',
        img: '/img/catalog/category/battery/akumulyator-dlya-richtrakov.webp',
        title: 'Аккумуляторы для ричтраков',
        count: 10,
      },
      {
        href: '/catalog/battery/accumulyatori-polutyagovie',
        img: '/img/catalog/category/battery/polutyagovie-akkumulyatori.webp',
        title: 'Полутяговые аккумуляторы',
        count: 19,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-electrotelezhek',
        img: '/img/catalog/category/battery/akkumulyatori-dlya-elektrotelezhek.webp',
        title: 'Аккумуляторы для электротележек',
        count: 5,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-shtabelerov',
        img: '/img/catalog/category/battery/akkumulyatori-dlya-shtabelerov.webp',
        title: 'Аккумуляторы для штабелеров',
        count: 14,
      },
      {
        href: '/catalog/battery/accumulyatori-dlya-polletoperevozchikov',
        img: '/img/catalog/category/battery/akkumelyator-dlya-palletoperevozchikov.webp',
        title: 'Аккумуляторы для паллетоперевозчиков',
        count: 5,
      },
    ],
  },
  oils: {
    icon: 'oils',
    title: 'Масла и охлаждающие жидкости',
    items: [
      {
        href: '/catalog/oils/masla-motornie',
        img: '/img/catalog/category/oils/motornoe-maslo.webp',
        title: 'Моторные масла',
        count: 23,
      },
      {
        href: '/catalog/oils/masla-transmissionnie',
        img: '/img/catalog/category/oils/maslo-transmissionnoe.webp',
        title: 'Трансмиссионные масла',
        count: 21,
      },
      {
        href: '/catalog/oils/masla-gidravlichecskie',
        img: '/img/catalog/category/oils/gidravlicheskoe-maslo.webp',
        title: 'Гидравлические масла',
        count: 2,
      },
      {
        href: '/catalog/oils/masla-industrialnie',
        img: '/img/catalog/category/oils/industrialnoe-maslo.webp',
        title: 'Индустриальные масла',
        count: 5,
      },
      {
        href: '/catalog/oils/antifreezi',
        img: '/img/catalog/category/oils/antifreeez.webp',
        title: 'Охлаждающие жидкости',
        count: 15,
      },
    ],
  },
}

export const CategoryProductsSlider: React.FC<Props> = ({ className }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initSlider = () => {
      setTimeout(() => {
        setIsReady(true)
      }, 500)
    }

    initSlider()
  }, [isReady])

  return (
    <div className={`catalog-products pb-[50px] pt-10 ${className || ''}`}>
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
                      <Link href={item.href}>
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
                              {item.count} товар{item.count === 1 ? '' : 'а'}
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
