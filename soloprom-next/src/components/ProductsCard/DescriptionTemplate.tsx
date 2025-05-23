'use client'
import React from 'react'

import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { renderDescriptionItem } from '@/utils/renderDescriptionItem'

import { ProductsCardPropTypes } from '@/types/products.types'
import { translateCountryNameToEnglish } from '@/utils/translateCountryNameToEnglish'
import { wordAdaptive } from '@/supports/adaptiveDto'

interface DescriptionTypes extends ProductsCardPropTypes {
  mod?: string
}

export const DescriptionTemplate: React.FC<DescriptionTypes> = ({
  cardData,
  mod,
}) => {
  const {
    categoryName,
    productType,
    brandName,
    country,
    load_index,
    images,
    defaultSize,
    viscosity,
    container,
    voltage,
    plates,
  } = cardData

  const enCountry = translateCountryNameToEnglish(country || '')

  const sizesName =
    categoryName === 'battery'
      ? 'ДхШхВ'
      : categoryName === 'oils'
        ? 'Объем'
        : 'Размерность'

  return (
    mod !== 'grid' && (
      <div className={`product-card__descr-list w-full`}>
        {renderDescriptionItem(
          getAdaptiveValue(wordAdaptive, 'types', categoryName) || 'Тип',
          productType,
        )}

        {defaultSize && renderDescriptionItem(sizesName, defaultSize)}
        {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
        {container && renderDescriptionItem('Емкость', container, 'Ah')}
        {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
        {plates && renderDescriptionItem('Тип пластин', plates)}
        {viscosity && renderDescriptionItem('Вязкость', viscosity)}
        {brandName && renderDescriptionItem('Бренд', brandName)}
        {country &&
          renderDescriptionItem('Производитель', country, '', enCountry)}
      </div>
    )
  )
}
