'use client'
import { wordAdaptive } from '@/supports/adaptiveDto'
import { CardDataProps } from '@/types/products.types'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { renderDescriptionItem } from '@/utils/renderDescriptionItem'
import React from 'react'

interface Props {
  cardData: CardDataProps
}

export const ProductMainDescrBlock: React.FC<Props> = ({ cardData }) => {
  const {
    categoryName,
    productType,
    brandName,
    country,
    load_index,
    viscosity,
    container,
    voltage,
    plates,
    defaultSize,
  } = cardData
  return (
    <div className="min-w-64">
      <div className="mb-2.5 flex items-center border-b border-b-gray-400 pb-2.5 text-xl shadow-sm">
        <span>Основная информация</span>
      </div>

      {renderDescriptionItem(
        getAdaptiveValue(wordAdaptive, 'types', categoryName) || 'Тип',
        productType,
      )}

      {defaultSize && renderDescriptionItem('Размер', defaultSize)}
      {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
      {container && renderDescriptionItem('Емкость', container, 'Ah')}
      {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
      {plates && renderDescriptionItem('Тип пластин', plates)}
      {viscosity && renderDescriptionItem('Вязкость', viscosity)}
      {brandName && renderDescriptionItem('Бренд', brandName)}
      {country && renderDescriptionItem('Производитель', country)}
    </div>
  )
}
