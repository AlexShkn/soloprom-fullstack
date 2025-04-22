'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAdaptiveValue, AdaptiveValues } from '@/utils/getAdaptiveValue'
import { ProductsCardPropTypes } from '@/types/products.types'
import { useModalsStore } from '@/store/useModalsStore'
import Link from 'next/link'
import { CircleHelp } from 'lucide-react'

interface DescriptionTypes extends ProductsCardPropTypes {
  // variantValue: string
  // setVariantValue: (value: string) => void
}

type CatalogKeys = 'tires' | 'battery' | 'oils'

const wordAdaptive: AdaptiveValues<{
  sizes: { tires: string; battery: string }
  types: { tires: string; battery: string; oils: string }
  catalogs: { tires: string; battery: string; oils: string }
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
  catalogs: {
    tires: 'shini',
    battery: 'accumulyatori',
    oils: 'maslo',
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
    images,
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

  const catalogValue = (
    Object.keys(wordAdaptive.catalogs) as (keyof typeof wordAdaptive.catalogs)[]
  ).includes(categoryName as keyof typeof wordAdaptive.catalogs)
    ? wordAdaptive.catalogs[categoryName as keyof typeof wordAdaptive.catalogs]
    : undefined

  return (
    <div className="flex flex-col">
      <div className="border-1 mb-5 flex flex-wrap items-center justify-between gap-y-2 pt-6">
        <div className="flex flex-col items-center gap-1 mds:flex-row mds:gap-3">
          <Image
            src={`/img/catalog/brands-logo/${brandName.toLowerCase()}.webp`}
            width={96}
            height={40}
            className="h-10 w-24 object-contain text-left"
            alt=""
          />
          <Link
            href={`/catalog/${catalogValue}-${brandName.toLowerCase()}`}
            className="link-hover flex items-center gap-1 rounded-custom bg-darkBlue px-4 py-1 text-white"
          >
            <svg className="icon h-5 w-5 fill-white">
              <use xlinkHref={`/img/sprite.svg#catalog-${categoryName}`}></use>
            </svg>
            Каталог {brandName}
          </Link>
        </div>

        <button
          onClick={() => showMessageWindow()}
          type="button"
          className="group inline-flex items-center gap-2 transition-colors hover:text-hoverBlue"
        >
          <CircleHelp className="h-5 w-5 stroke-darkBlue group-hover:stroke-accentBlue" />
          Задать вопрос
        </button>
      </div>

      <div className="min-w-64">
        <div className="mb-2.5 flex items-center border-b border-b-gray-400 pb-2.5 text-xl shadow-sm">
          <span>Основная информация</span>
        </div>

        {renderDescriptionItem(
          getAdaptiveValue(wordAdaptive, 'types', categoryName) || 'Тип',
          productType,
        )}
        {sizesData &&
          Object.keys(sizesData).length < 2 &&
          renderDescriptionItem('Размер', variantValue)}
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
