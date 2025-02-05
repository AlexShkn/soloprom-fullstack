'use client'
import React from 'react'

import YaMap from './YaMap'

interface Props {
  className?: string
}

export const ContactsMap: React.FC<Props> = ({ className }) => {
  return (
    <section
      id="contacts"
      className="contacts-map relative flex flex-col bg-accentBlue lg:block lg:bg-none"
    >
      <YaMap />
      <div className="page-container">
        <div className="relative my-14 inline-flex flex-col rounded p-14 px-4 py-7 shadow-custom xs:p-7 md:w-full md:max-w-max lg:max-w-[460px] lg:bg-accentBlue">
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
