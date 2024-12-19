'use client'
import React from 'react'
import Image from 'next/image'

import './SubHero.scss'

interface Props {
  className?: string
}

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

export const SubHero: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="subhero section-offset pt-[50px]">
        <div className="subhero__container">
          <ul className="subhero__list grid grid-cols-4 gap-5">
            {list.map((item) => (
              <li
                key={item.icon}
                className="flex flex-col rounded bg-white p-4 shadow-custom"
              >
                <div className="subhero__item-head mb-4 flex items-center gap-2.5 pb-2.5 font-bold leading-5">
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
                <p className="subhero__item-text font-medium leading-5 text-[#7d7d7d]">
                  {item.subtitle}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
