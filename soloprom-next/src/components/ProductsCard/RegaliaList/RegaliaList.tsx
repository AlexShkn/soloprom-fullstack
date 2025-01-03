'use client'
import React from 'react'

interface RegaliaProps {
  regalia: string[]
  discount?: number
}

interface RegaliaItem {
  icon: string
  text: string
  discount?: number
}
import './RegaliaList.scss'

const regaliaSettings: RegaliaItem[] = [
  { icon: 'new', text: 'Новинка' },
  { icon: 'recommend', text: 'Рекомендуем' },
  { icon: 'selected', text: 'Выбор покупателей' },
  { icon: 'discount', text: '' },
]

export const RegaliaList: React.FC<RegaliaProps> = ({ regalia, discount }) => {
  return (
    <ul className="absolute left-2.5 top-4 z-[5] flex flex-col items-center gap-1">
      {regalia.map((item) => {
        const regaliaItem = regaliaSettings.find((r) => r.icon === item)
        return (
          <li key={item} className="feature-item relative h-9 w-9">
            <img
              className="relative z-[6] h-full w-full"
              src={`/img/icons/${item}.svg`}
              alt={`${item} icon`}
            />
            {regaliaItem && (
              <>
                {item === 'discount' && discount ? (
                  <span className="absolute left-10 top-[50%] translate-y-[-50%] rounded bg-white p-1 font-bold text-[#ff005c]">
                    -{discount}%
                  </span>
                ) : (
                  <b className="absolute left-10 top-[50%] translate-y-[-50%] rounded bg-white p-1 text-sm font-bold text-accentBlue opacity-0 transition-opacity">
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
