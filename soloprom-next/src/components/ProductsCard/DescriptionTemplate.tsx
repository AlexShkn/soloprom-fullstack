'use client'
import React from 'react'

import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { AdaptiveValues } from '@/utils/getAdaptiveValue'
import { renderDescriptionItem } from '@/utils/renderDescriptionItem'

import { ProductsCardPropTypes } from '@/types/products.types'
import { SizesRow } from './SizesRow'

interface DescriptionTypes extends ProductsCardPropTypes {
  variantValue: string
  mod: string
  setVariantValue: (value: string) => void
}

export const ProductsCardWordAdaptive: AdaptiveValues<{
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
  mod,
}) => {
  const {
    productId,
    categoryName,
    productType,
    brandName,
    country,
    sizes,
    load_index,
    volumes,
    viscosity,
    container,
    voltage,
    plates,
  } = cardData

  return (
    <div
      className={`product-card__descr-list ${mod === 'grid' ? 'mb-2.5' : ''}`}
    >
      {mod !== 'grid' && (
        <>
          {renderDescriptionItem(
            getAdaptiveValue(ProductsCardWordAdaptive, 'types', categoryName) ||
              'Тип',
            productType,
          )}

          {load_index && renderDescriptionItem('Индекс нагрузки', load_index)}
          {container && renderDescriptionItem('Емкость', container, 'Ah')}
          {voltage && renderDescriptionItem('Напряжение', voltage, 'V')}
          {plates && renderDescriptionItem('Тип пластин', plates)}
          {viscosity && renderDescriptionItem('Вязкость', viscosity)}
        </>
      )}

      {sizes && mod === 'grid' && categoryName === 'battery' && (
        <SizesRow
          productId={productId}
          setVariantValue={setVariantValue}
          variantValue={variantValue}
          sizes={sizes as { [key: string]: number }}
          categoryName={categoryName}
        />
      )}

      {mod !== 'grid' && sizes && (
        <SizesRow
          productId={productId}
          setVariantValue={setVariantValue}
          variantValue={variantValue}
          sizes={sizes as { [key: string]: number }}
          categoryName={categoryName}
        />
      )}

      {mod !== 'grid' && (
        <>
          {brandName && renderDescriptionItem('Бренд', brandName)}
          {country && renderDescriptionItem('Производитель', country)}
        </>
      )}
    </div>
  )
}
