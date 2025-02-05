'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useClickOutside } from '@/hooks/useClickOutside'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { AdaptiveValues } from '@/utils/getAdaptiveValue'
import { ProductsCardPropTypes } from '@/types/products.types'
import { useCartStore } from '@/store/cartStore'

interface DescriptionTypes extends ProductsCardPropTypes {
  // variantValue: string
  // setVariantValue: (value: string) => void
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
    <div className="border-1 flex items-center justify-between border-b border-grayColor hover:bg-grayColor">
      <div className="p-2.5 text-sm md:text-base">{name}</div>
      <div className="p-2.5 text-sm font-bold md:text-base">
        {value}
        {unit || ''}
      </div>
    </div>
  )
}

export const ProductPageCardDescription: React.FC<DescriptionTypes> = ({
  cardData,
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
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)
  const { cartState } = useCartStore()

  // const selectedVariant = (value: string) => {
  //   setVariantValue(value)
  //   setDropOpen(false)
  // }

  // useClickOutside(dropRef, () => {
  //   setDropOpen(false)
  // })
  return (
    <div className="flex flex-col">
      <div className="border-1 mb-5 flex items-center justify-between border-b border-grayColor pt-6">
        <Image
          src={`/img/catalog/brands-logo/${brandName.toLowerCase()}.jpg`}
          width={144}
          height={48}
          className="h-12 w-36 object-contain text-left"
          alt=""
        />
        <button
          type="button"
          className="inline-flex items-center gap-2.5 transition-colors hover:text-hoverBlue"
        >
          <img src="/img/icons/question.svg" alt="" />
          Задать вопрос
        </button>
      </div>
      <div className="min-w-64">
        <div className="mb-1 flex items-center rounded bg-grayColor px-5 py-2.5 text-2xl font-medium shadow-sm">
          <span>Основная информация</span>
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
        {brandName && renderDescriptionItem('Бренд', brandName)}
        {country && renderDescriptionItem('Производитель', country)}
      </div>
    </div>
  )
}
