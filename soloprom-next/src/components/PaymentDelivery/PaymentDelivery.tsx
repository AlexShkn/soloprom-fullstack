'use client'
import React from 'react'
import Image from 'next/image'

import './PaymentDelivery.scss'

interface HeaderProps {
  level: string
}

export const PaymentDelivery: React.FC<HeaderProps> = ({ level }) => {
  const HeadingTag = level === 'h1' ? 'h1' : 'h2'
  return (
    <section className="payment-delivery section-offset bg-sectionWhite">
      <div className="payment-delivery__container">
        <HeadingTag className="section-title payment-delivery__title">
          Оплата и доставка
        </HeadingTag>

        <div className="payment-delivery__body grid grid-cols-2 gap-7">
          <div className="payment-delivery__column payment-delivery__payment rounded bg-white p-10 shadow-custom">
            <div className="mb-7 flex items-center gap-4 text-2xl font-bold">
              <Image
                src="/img/icons/payment.svg"
                alt=""
                width={50}
                height={50}
              />
              Способы оплаты
            </div>
            <div>
              <h3 className="mb-5 text-xl font-medium">Для юридических лиц:</h3>
              <ul className="flex flex-col gap-2.5">
                <li className="relative pl-5 leading-5 before:absolute before:left-0 before:top-1 before:h-2.5 before:w-2.5 before:rounded-[50%] before:bg-accentBlue">
                  Оплата безналичному расчету в российских рублях с учетом НДС.
                </li>
                <li className="relative pl-5 leading-5 before:absolute before:left-0 before:top-1 before:h-2.5 before:w-2.5 before:rounded-[50%] before:bg-accentBlue">
                  Отгружаем заказы в соответствии с платежным поручением,
                  подтвержденным банком.
                </li>
              </ul>
            </div>
            <div className="mt-7">
              <h3 className="mb-5 text-xl font-medium">Для частных лиц:</h3>
              <ul className="flex flex-col gap-2.5">
                <li className="relative pl-5 leading-5 before:absolute before:left-0 before:top-1 before:h-2.5 before:w-2.5 before:rounded-[50%] before:bg-accentBlue">
                  Перевод на карту Сбербанка
                </li>
                <li className="relative pl-5 leading-5 before:absolute before:left-0 before:top-1 before:h-2.5 before:w-2.5 before:rounded-[50%] before:bg-accentBlue">
                  Банковские переводы в любом банке
                </li>
              </ul>
            </div>
          </div>
          <div className="payment-delivery__column payment-delivery__delivery rounded bg-white p-10 shadow-custom">
            <div className="mb-7 flex items-center gap-4 text-2xl font-bold">
              <Image
                src="/img/icons/delivery.svg"
                alt=""
                width={50}
                height={50}
              />
              Способы доставки
            </div>

            <div className="payment-delivery__delivery-text mb-7 leading-5">
              <p className="mb-5">
                Мы осуществляем поставку автозапчастей для спецтехники на всей
                территории РФ и в страны СНГ, обеспечивая надежность и
                оперативность доставки.
              </p>
              <p>
                В зависимости от вашего местоположения, условий доставки и
                сроков получения, процесс доставки может различаться. Мы
                прилагаем максимум усилий для оптимизации доставки, чтобы
                сотрудничество с нами было удобным для вас.
              </p>
            </div>

            <Image
              className="object-contain"
              src="/img/icons/company/brands.png"
              alt=""
              width={580}
              height={61}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
