'use client'
import React, { useRef, useState } from 'react'

import { useClickOutside } from '@/hooks/useClickOutside'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { AdaptiveValues } from '@/utils/getAdaptiveValue'
import { ProductsCardPropTypes } from '@/types/products.types'
import { useCartStore } from '@/zustand/cartStore'

interface DescriptionTypes extends ProductsCardPropTypes {
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

const renderDescriptionItem = (
  name: string,
  value: string | number | undefined,
  unit?: string,
) => {
  if (value === undefined || value === null) return null
  return (
    <div className="product-page-card__table-row">
      <div className="product-page-card__table-item">{name}</div>
      <div className="product-page-card__table-item font-bold">
        {value}
        {unit || ''}
      </div>
    </div>
  )
}

export const ProductPageCardDescription: React.FC<DescriptionTypes> = ({
  cardData,
  variantValue,
  setVariantValue,
}) => {
  const {
    productId,
    categoryName,
    productType,
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
  const cartState = useCartStore((state) => state.cartState)

  const selectedVariant = (value: string) => {
    setVariantValue(value)
    setDropOpen(false)
  }

  useClickOutside(dropRef, () => {
    setDropOpen(false)
  })
  return (
    <div className="product-page-card__description">
      <div className="product-page-card__head">
        <img
          src={`/img/catalog/brands-logo/${brand}.jpg`}
          className="product-page-card__brand-logo"
          alt=""
        />
        <button type="button" className="product-page-card__question-button">
          <img src="/img/icons/question.svg" alt="" />
          Задать вопрос
        </button>
      </div>
      <div className="product-page-card__table-wrapper">
        <div className="product-page-card__table-title">
          Основные характеристики
        </div>

        {renderDescriptionItem(
          getAdaptiveValue(wordAdaptive, 'types', categoryName) || 'Тип',
          productType,
        )}

        {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
        {container && renderDescriptionItem('Емкость', container, 'Ah')}
        {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
        {plates && renderDescriptionItem('Тип пластин', plates)}
        {viscosity && renderDescriptionItem('Вязкость', viscosity)}
        {brand && renderDescriptionItem('Бренд', brand)}
        {country && renderDescriptionItem('Производитель', country)}

        {sizes && (
          <div className="product-page-card__table-row">
            <div className="product-page-card__table-item">
              {getAdaptiveValue(wordAdaptive, 'sizes', categoryName)}
            </div>
            <div className="product-page-card__table-item font-bold">
              {Object.keys(sizes).length === 1 ? (
                variantValue
              ) : (
                <div
                  ref={dropRef}
                  className={`product-page-card__dropdown ${dropOpen && 'show'}`}
                >
                  <button
                    onClick={() => setDropOpen((prev) => !prev)}
                    className="product-page-card__dropdown-button"
                  >
                    <span className="pointer-events-none select-none">
                      {variantValue}
                    </span>
                    <img
                      className="pointer-events-none h-6 w-6 select-none transition-transform"
                      src="/img/icons/arrow-right.svg"
                      alt=""
                    />
                  </button>
                  <ul className="product-page-card__dropdown-list scroll-bar overscroll-contain">
                    {Object.keys(sizes).map((itemSize, index) => (
                      <li
                        key={itemSize}
                        className={`product-page-card__dropdown-item ${itemSize === variantValue && 'bg-[#cfcfcf]'}`}
                        onClick={() => selectedVariant(itemSize)}
                      >
                        <input
                          id={itemSize}
                          type="radio"
                          value={itemSize}
                          name={productId + itemSize}
                          defaultChecked={index === 0}
                        />
                        <label
                          className={
                            cartState.some(
                              (item) =>
                                item.cartId === `${productId}-${itemSize}`,
                            )
                              ? 'selected'
                              : ''
                          }
                          htmlFor={productId + itemSize}
                        >
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
      </div>
    </div>
  )
}
