'use client'
import React from 'react'
import Image from 'next/image'

import './Benefits.scss'

interface BenefitItem {
  imageSrc: string
  altText: string
  iconHref: string
  title: string
  text: string
}

const benefitItems: BenefitItem[] = [
  {
    imageSrc: '/img/benefits/zp.png',
    altText: 'Широкий ассортимент в наличии',
    iconHref: '/img/sprite.svg#stock',
    title: 'Широкий ассортимент в наличии',
    text: 'Более 500 наименований на складе',
  },
  {
    imageSrc: '/img/benefits/delivery.png',
    altText: 'Отправка в любой регион России и страны СНГ',
    iconHref: '/img/sprite.svg#delivery',
    title: 'Отправка в любой регион России и страны СНГ',
    text: 'Бесплатная доставка до транспортной компании',
  },
  {
    imageSrc: '/img/benefits/search.png',
    altText: 'Поиск и поставка запчастей под заказ',
    iconHref: '/img/sprite.svg#search',
    title: 'Поиск и поставка запчастей под заказ',
    text: 'Оригинальные детали и их аналоги',
  },
  {
    imageSrc: '/img/benefits/experience.png',
    altText: 'Большой опыт в сфере',
    iconHref: '/img/sprite.svg#experience',
    title: 'Большой опыт в сфере',
    text: '10 лет успешной работы',
  },
  {
    imageSrc: '/img/benefits/contact.png',
    altText: 'Прямые контракты с производителями',
    iconHref: '/img/sprite.svg#contact',
    title: 'Прямые контракты с производителями',
    text: 'Запасные части отличного качества в кратчайшие сроки',
  },
  {
    imageSrc: '/img/benefits/price.png',
    altText: 'Гибкие цены',
    iconHref: '/img/sprite.svg#price',
    title: 'Гибкие цены',
    text: 'Индивидуальный ценовой подход',
  },
]

const BenefitItemComponent = ({ item }: { item: BenefitItem }) => {
  return (
    <li className="benefits__item relative min-h-56 overflow-hidden rounded-custom bg-accentBlue p-7">
      <Image
        className="absolute -right-2.5 top-0 h-full w-52 object-cover transition-transform"
        src={item.imageSrc}
        alt={item.altText}
        width={200}
        height={220}
        priority
      />

      <svg className="icon mb-2.5 h-12 w-12 fill-grayColor">
        <use xlinkHref={item.iconHref}></use>
      </svg>
      <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-64 text-xl font-bold leading-5 text-white">
        {item.title}
      </h3>
      <p className="benefits__item-text relative z-[1] max-w-72 leading-5 text-white">
        {item.text}
      </p>
    </li>
  )
}

export const Benefits = () => {
  return (
    <section className="benefits section-offset bg-sectionWhite">
      <div className="benefits__container">
        <h2 className="section-title">Преимущества</h2>

        <ul className="benefits__list grid grid-cols-3 gap-3">
          {benefitItems.map((item, index) => (
            <BenefitItemComponent key={index} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
