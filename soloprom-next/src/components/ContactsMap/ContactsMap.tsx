'use client'
import React from 'react'

import './ContactsMap.scss'
import YaMap from './YaMap'

interface Props {
  className?: string
}

export const ContactsMap: React.FC<Props> = ({ className }) => {
  return (
    <section id="contacts" className="contacts-map relative">
      <YaMap />
      <div className="contacts-map__container">
        <div className="contacts-map__body relative mb-14 mt-14 inline-flex max-w-[460px] flex-col rounded p-14 shadow-custom">
          <h2 className="mb-7 text-3xl font-medium leading-9 text-white">
            Офис продаж
            <br />
            ООО «СОЛО»
          </h2>
          <div className="mb-2.5 text-lg leading-7 text-white">
            Время работы: Пн – Пт, 9:00 – 20:00
          </div>
          <a
            href="tel+79036569393"
            className="link-hover mb-2.5 text-lg font-bold text-[#ffcf33]"
          >
            +7 (903) 656-93-93
          </a>
          <a
            href="mailto:solo.vrn@mail.ru"
            className="link-hover mb-2.5 text-lg text-white"
          >
            solo.vrn@mail.ru
          </a>
          <address className="mb-7 text-lg not-italic leading-7 text-white">
            г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
          </address>
        </div>
      </div>
    </section>
  )
}
