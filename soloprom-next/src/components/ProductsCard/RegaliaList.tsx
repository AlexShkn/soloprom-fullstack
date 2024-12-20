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

const regaliaSettings: RegaliaItem[] = [
  { icon: 'new', text: 'Новинка' },
  { icon: 'recommend', text: 'Рекомендуем' },
  { icon: 'selected', text: 'Выбор покупателей' },
  { icon: 'discount', text: '' },
]

export const RegaliaList: React.FC<RegaliaProps> = ({ regalia, discount }) => {
  return (
    <ul className="product-card__feature-list">
      {regalia.map((item) => {
        const regaliaItem = regaliaSettings.find((r) => r.icon === item)
        return (
          <li key={item} className="product-card__feature-item">
            <img src={`/img/icons/${item}.svg`} alt={`${item} icon`} />
            {regaliaItem && (
              <>
                {item === 'discount' && discount ? (
                  <span>-{discount}%</span>
                ) : (
                  <b>{regaliaItem.text}</b>
                )}
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
