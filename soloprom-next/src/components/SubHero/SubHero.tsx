'use client'
import React from 'react'
import Image from 'next/image'

const list = [
  {
    icon: 'payment',
    title: 'Оплата любым удобным способом',
    subtitle:
      'Предоставляем нашим клиентам выбор и множество удобных способов оплаты',
  },
  {
    icon: 'assortment',
    title: 'Большой выбор товаров в каталоге',
    subtitle:
      'Постоянно отслеживаем и пополняем ассортимент шин и аккумуляторов для специальной техники',
  },
  {
    icon: 'delivery',
    title: 'Осуществляем быструю доставку',
    subtitle: 'Производим оперативную доставку заказов во все регионы России',
  },
  {
    icon: 'discount',
    title: 'Делаем скидки на крупные покупки',
    subtitle:
      'Для наших постоянных клиентов предлагаем только самые выгодные предложения',
  },
]

export const SubHero = () => {
  return (
    <div className="section-offset p-7 lg:pt-[50px]">
      <div className="page-container">
        <ul className="mds:grid-cols-2 grid grid-cols-1 gap-2.5 lg:grid-cols-4 lg:gap-5">
          {list.map((item) => (
            <li
              key={item.icon}
              className="flex flex-col rounded bg-white p-4 shadow-custom"
            >
              <div className="mds:flex-row mb-4 flex flex-col items-center gap-2.5 border-b border-accentBlue pb-2.5 text-sm font-bold leading-5 lg:text-base">
                <div className="subhero__item-image inline-flex items-center justify-center rounded bg-accentBlue p-2.5 shadow-custom">
                  <Image
                    src={`/img/subhero/${item.icon}.svg`}
                    alt=""
                    width={35}
                    height={35}
                  />
                </div>
                {item.title}
              </div>
              <p className="mds:text-left text-center text-sm font-medium leading-5 text-[#7d7d7d] lg:text-base">
                {item.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
