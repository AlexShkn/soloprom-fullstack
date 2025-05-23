'use client'
import React from 'react'
import Image from 'next/image'

interface RegaliaProps {
  regalia: string[]
  discount?: number
}

interface RegaliaItem {
  icon: string
  text: string
  discount?: number
}

const regaliaSettings: RegaliaItem[] = [
  { icon: 'new', text: 'Новинка' },
  { icon: 'recommend', text: 'Рекомендуем' },
  { icon: 'selected', text: 'Выбор покупателей' },
  { icon: 'discount', text: '' },
]

export const RegaliaList: React.FC<RegaliaProps> = ({ regalia, discount }) => {
  return (
    <ul className="absolute left-2.5 top-4 z-[5] flex flex-col items-center gap-1">
      {discount && (
        <li className="feature-item group relative h-8 w-8">
          <img
            className="relative z-[6] h-full w-full"
            src={`/img/icons/discount.svg`}
            alt={`discount icon`}
          />
          <span className="absolute left-10 top-[50%] translate-y-[-50%] rounded bg-white p-1 font-bold text-[#ff005c]">
            -{discount}%
          </span>
        </li>
      )}
      {regalia.map((item) => {
        const regaliaItem = regaliaSettings.find((r) => r.icon === item)
        return (
          <li key={item} className="feature-item group relative h-8 w-8">
            <img
              className="relative z-[6] h-full w-full"
              src={`/img/icons/${item}.svg`}
              alt={`${item} icon`}
            />
            {regaliaItem && (
              <>
                {item !== 'discount' && (
                  <b className="absolute left-10 top-[50%] translate-y-[-50%] rounded bg-white p-1 text-sm font-bold text-accentBlue opacity-0 transition-opacity group-hover:opacity-100">
                    {regaliaItem.text}
                  </b>
                )}
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
