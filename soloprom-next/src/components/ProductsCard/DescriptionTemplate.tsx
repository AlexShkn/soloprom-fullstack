'use client'
import React, { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { AdaptiveValues } from '@/utils/getAdaptiveValue'
import { renderDescriptionItem } from '@/utils/renderDescriptionItem'

import { ProductsCardProps } from '../ProductList/ProductList'

interface DescriptionTypes extends ProductsCardProps {
  variantValue: string
  setVariantValue: (value: string) => void
}

const wordAdaptive: AdaptiveValues<{
  sizes: { tires: string; battery: string }
  types: { tires: string; battery: string; oils: string }
}> = {
  sizes: {
    tires: 'Размерность',
    battery: 'ДхШхВ',
  },
  types: {
    tires: 'Тип шины',
    battery: 'Тип аккумулятора',
    oils: 'Тип жидкости',
  },
}

export const DescriptionTemplate: React.FC<DescriptionTypes> = ({
  cardData,
  variantValue,
  setVariantValue,
}) => {
  const {
    id,
    category,
    type,
    brand,
    country,
    sizes,
    load_index,
    volumes,
    viscosity,
    container,
    voltage,
    plates,
  } = cardData
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  const selectedVariant = (value: string) => {
    setVariantValue(value)
    setDropOpen(false)
  }

  useClickOutside(dropRef, () => {
    setDropOpen(false)
  })

  return (
    <div className="product-card__descr-list">
      {renderDescriptionItem(
        getAdaptiveValue(wordAdaptive, 'types', category) || 'Тип',
        type,
      )}

      {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
      {container && renderDescriptionItem('Емкость', container, 'Ah')}
      {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
      {plates && renderDescriptionItem('Тип пластин', plates)}
      {viscosity && renderDescriptionItem('Вязкость', viscosity)}

      {sizes && (
        <div className="product-card__descr-item">
          <div className="product-card__descr-item-name">
            {getAdaptiveValue(wordAdaptive, 'sizes', category)}
          </div>
          <div className="product-card__descr-item-value">
            {Object.keys(sizes).length === 1 ? (
              variantValue
            ) : (
              <div
                ref={dropRef}
                className={`product-card-dropdown ${dropOpen && 'show'}`}
              >
                <button
                  onClick={() => setDropOpen((prev) => !prev)}
                  className="product-card-dropdown__button"
                >
                  <span>{variantValue}</span>
                  <img src="/img/icons/arrow-right.svg" alt="" />
                </button>
                <ul
                  data-product-volumes
                  className="product-card-dropdown__list scroll-bar"
                >
                  {Object.keys(sizes).map((itemSize, index) => (
                    <li
                      key={itemSize}
                      className={`product-card-dropdown__item ${itemSize === variantValue && 'current'}`}
                      onClick={() => selectedVariant(itemSize)}
                    >
                      <input
                        id={itemSize}
                        type="radio"
                        value={itemSize}
                        name={id + itemSize}
                        defaultChecked={index === 0}
                      />
                      <label htmlFor={id + itemSize}>
                        <span>{itemSize}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {brand && renderDescriptionItem('Бренд', brand)}
      {country && renderDescriptionItem('Производитель', country)}
    </div>
  )
}
