'use client'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
  const cartState = useSelector((state: RootState) => state.cart.cartState)

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
        getAdaptiveValue(wordAdaptive, 'types', categoryName) || 'Тип',
        productType,
      )}

      {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
      {container && renderDescriptionItem('Емкость', container, 'Ah')}
      {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
      {plates && renderDescriptionItem('Тип пластин', plates)}
      {viscosity && renderDescriptionItem('Вязкость', viscosity)}

      {sizes && (
        <div className="product-card__descr-item flex items-center justify-between pb-1 text-sm">
          <div className="product-card__descr-item-name">
            {getAdaptiveValue(wordAdaptive, 'sizes', categoryName)}
          </div>
          <div className="font-bold">
            {Object.keys(sizes).length === 1 ? (
              variantValue
            ) : (
              <div
                ref={dropRef}
                className={`product-card-dropdown relative z-[2] ${dropOpen && 'show'}`}
              >
                <button
                  onClick={() => setDropOpen((prev) => !prev)}
                  className="relative inline-flex items-center pr-2.5 font-bold"
                >
                  <span className="pointer-events-none select-none">
                    {variantValue}
                  </span>
                  <img
                    className="pointer-events-none absolute -right-2.5 -top-[3px] h-6 w-6 select-none transition-transform"
                    src="/img/icons/arrow-right.svg"
                    alt=""
                  />
                </button>
                <ul className="product-card-dropdown__list scroll-bar invisible absolute -right-1 top-[100%] mt-1 max-h-[200px] w-auto overflow-y-auto overscroll-contain rounded-b-md border-t border-blue-800 bg-white opacity-0 shadow-custom">
                  {Object.keys(sizes).map((itemSize, index) => (
                    <li
                      key={itemSize}
                      className={`product-card-dropdown__item transition-colors hover:bg-accentBlue hover:text-white ${itemSize === variantValue && 'bg-[#cfcfcf]'}`}
                      onClick={() => selectedVariant(itemSize)}
                    >
                      <input
                        id={itemSize}
                        type="radio"
                        value={itemSize}
                        name={id + itemSize}
                        defaultChecked={index === 0}
                      />
                      <label
                        className={
                          cartState.some(
                            (item) => item.cartId === `${id}-${itemSize}`,
                          )
                            ? 'selected'
                            : ''
                        }
                        htmlFor={id + itemSize}
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

      {brand && renderDescriptionItem('Бренд', brand)}
      {country && renderDescriptionItem('Производитель', country)}
    </div>
  )
}
