'use client'
import React from 'react'
import Image from 'next/image'
import { ProductsCardPropTypes } from '@/types/products.types'
import { useModalsStore } from '@/store/useModalsStore'
import Link from 'next/link'
import { CircleHelp } from 'lucide-react'
import { wordAdaptive } from '@/supports/adaptiveDto'
import { ProductMainDescrBlock } from './ProductMainDescrBlock'
import { RatingDisplay } from '../ProductsCard/RatingDisplay'

interface DescriptionTypes extends ProductsCardPropTypes {
  // variantValue: string
  // setVariantValue: (value: string) => void
  rating: number
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
  rating,
}) => {
  const { categoryName, brandName } = cardData

  const { modalMessageStateChange, modalCallbackStateChange } = useModalsStore()

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
            alt={brandName}
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
          className="group inline-flex items-center gap-2 text-darkBlue transition-colors hover:text-hoverBlue"
        >
          <CircleHelp className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <RatingDisplay rating={rating} />
        {rating ? <span className="font-medium"> {rating}</span> : ''}
      </div>

      <ProductMainDescrBlock cardData={cardData} />
    </div>
  )
}
