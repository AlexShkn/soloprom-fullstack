'use client'
import React from 'react'
import Image from 'next/image'

const list = [
  {
    icon: 'payment',
    title: 'Оплата любым удобным способом',
    subtitle:
      'Предоставляем нашим клиентам выбор и множество удобных способов оплаты',
    alt: 'Все доступные методы оплаты',
  },
  {
    icon: 'assortment',
    title: 'Большой выбор товаров в каталоге',
    subtitle:
      'Постоянно отслеживаем и пополняем ассортимент шин и аккумуляторов для специальной техники',
    alt: 'Широкий ассортимент',
  },
  {
    icon: 'delivery',
    title: 'Осуществляем быструю доставку',
    subtitle: 'Производим оперативную доставку заказов во все регионы России',
    alt: 'Экспресс подбор и отправка',
  },
  {
    icon: 'discount',
    title: 'Делаем скидки на крупные покупки',
    subtitle:
      'Для наших постоянных клиентов предлагаем только самые выгодные предложения',
    alt: 'Скидки партнерам и оптовикам',
  },
]

export const SubHero = () => {
  return (
    <div className="section-offset p-7 lg:pt-[50px]">
      <div className="page-container">
        <ul className="grid grid-cols-1 gap-2.5 mds:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {list.map((item) => (
            <li
              key={item.icon}
              className="flex flex-col rounded-custom bg-white p-4 shadow-custom"
            >
              <div className="mb-4 flex flex-col items-center gap-2.5 border-b border-accentBlue pb-2.5 text-sm font-bold leading-5 mds:flex-row lg:text-base">
                <div className="inline-flex h-14 w-14 min-w-14 items-center justify-center rounded-custom bg-accentBlue shadow-custom">
                  <img
                    src={`/img/subhero/${item.icon}.svg`}
                    alt={item.alt}
                    className="h-8 w-8"
                  />
                </div>
                {item.title}
              </div>
              <p className="text-center text-sm font-medium leading-5 text-[#7d7d7d] mds:text-left lg:text-base">
                {item.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
