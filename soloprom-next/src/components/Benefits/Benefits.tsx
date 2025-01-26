'use client'
import React from 'react'
import Image from 'next/image'

import './Benefits.scss'

export const Benefits = () => {
  return (
    <section className="benefits section-offset bg-sectionWhite">
      <div className="benefits__container">
        <h2 className="section-title">Преимущества</h2>

        <ul className="benefits__list grid grid-cols-3 gap-7">
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover transition-transform"
              src="/img/benefits/zp.png"
              alt=""
              width={200}
              height={220}
            />
            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#stock"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Широкий ассортимент в наличии
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              Более 500 наименований на складе
            </p>
          </li>
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover transition-transform"
              src="/img/benefits/delivery.png"
              alt=""
              width={200}
              height={220}
            />

            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#delivery"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Отправка в любой регион России и страны СНГ
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              Бесплатная доставка до транспортной компании
            </p>
          </li>
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover"
              src="/img/benefits/search.png"
              alt=""
              width={200}
              height={259}
            />

            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#search"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Поиск и поставка запчастей под заказ
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              Оригинальные детали и их аналоги
            </p>
          </li>
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover transition-transform"
              src="/img/benefits/experience.png"
              alt=""
              width={200}
              height={220}
            />

            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#experience"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Большой опыт в сфере
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              10 лет успешной работы
            </p>
          </li>
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover transition-transform"
              src="/img/benefits/contact.png"
              alt=""
              width={200}
              height={220}
            />

            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#contact"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Прямые контракты с производителями
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              Запасные части хорошего качества в кратчайшие сроки
            </p>
          </li>
          <li className="benefits__item relative min-h-[220px] overflow-hidden rounded bg-accentBlue p-7">
            <Image
              className="absolute -right-2.5 top-0 h-auto w-auto object-cover transition-transform"
              src="/img/benefits/price.png"
              alt=""
              width={200}
              height={220}
            />

            <svg className="icon mb-2.5 h-[50px] w-[50px] fill-grayColor">
              <use xlinkHref="/img/sprite.svg#price"></use>
            </svg>
            <h3 className="benefits__item-title relative z-[1] mb-2.5 max-w-[250px] text-xl font-bold leading-5 text-white">
              Гибкие цены
            </h3>
            <p className="benefits__item-text relative z-[1] leading-5 text-white">
              Индивидуальный ценовой подход
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
