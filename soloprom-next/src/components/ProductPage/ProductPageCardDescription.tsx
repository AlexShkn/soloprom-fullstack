'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useClickOutside } from '@/hooks/useClickOutside'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { AdaptiveValues } from '@/utils/getAdaptiveValue'
import { ProductsCardPropTypes } from '@/types/products.types'
import { useCartStore } from '@/store/cartStore'
import { useModalsStore } from '@/store/modalsStore'

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
    name,
    url,
    img,
    productType,
    brandName,
    country,
    load_index,
    viscosity,
    container,
    voltage,
    plates,
    defaultPrice,
    sizes,
    volumes,
  } = cardData
  const [variantValue, setVariantValue] = useState('')

  const {
    modalMessageStateChange,
    modalCallbackStateChange,
    setFastOrderProduct,
  } = useModalsStore()

  const sizesData = sizes || volumes

  useEffect(() => {
    let defaultSize: string | undefined = undefined
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]
      setVariantValue(defaultSize || '')
    }
  }, [])

  const showMessageWindow = () => {
    modalMessageStateChange(true)
    modalCallbackStateChange(true)
  }

  const fastOrderHandle = () => {
    setFastOrderProduct({
      productId,
      name,
      variant: variantValue,
      price: defaultPrice,
      url,
      img,
    })
    modalCallbackStateChange(true)
  }

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
          onClick={() => showMessageWindow()}
          type="button"
          className="inline-flex items-center gap-2.5 transition-colors hover:text-hoverBlue"
        >
          <img src="/img/icons/question.svg" alt="задайте свой вопрос" />
          Задать вопрос
        </button>
      </div>
      <button
        type="button"
        onClick={() => fastOrderHandle()}
        className={`my-5 ml-auto font-medium text-[#dd3824] underline`}
      >
        Купить в 1 клик
      </button>
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
