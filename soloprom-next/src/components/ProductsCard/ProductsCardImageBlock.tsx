'use client'
import { CardDataProps } from '@/types/products.types'
import React from 'react'
import Image from 'next/image'
import { translateCountryNameToEnglish } from '@/utils/translateCountryNameToEnglish'
import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  cardData: CardDataProps
  mod: string | undefined
}

export const ProductsCardImageBlock: React.FC<Props> = ({ cardData, mod }) => {
  const {
    productId,
    name,
    img,
    regalia = [],
    discount,
    brandName,
    country,
  } = cardData
  const { setProductModal } = useModalsStore()

  const enCountry = translateCountryNameToEnglish(country || '')

  return (
    <div
      className={`group relative ${mod !== 'row' ? 'mb-2.5' : 'items-center'} flex justify-center`}
    >
      <div
        className={`absolute left-0 flex ${regalia?.length || discount ? '-bottom-2 flex-row items-center' : 'flex-col'} ${mod === 'row' && 'bottom-0 flex-row'}`}
      >
        {brandName && img && (
          <Image
            className={`inline-block h-7 w-12 object-contain`}
            src={`/img/brands/${brandName.toLowerCase()}.webp`}
            width={48}
            height={28}
            alt={brandName}
          />
        )}

        {enCountry && mod && mod !== 'row' ? (
          <Image
            src={`/img/country/${enCountry}.jpg`}
            className="h-3 w-5"
            width={20}
            height={12}
            alt={enCountry}
          />
        ) : (
          ''
        )}
      </div>

      <Image
        className="inline-block h-[120px] object-contain"
        src={
          (img && `/img/catalog/${img}.webp`) ||
          `/img/brands/${brandName.toLowerCase()}.webp`
        }
        width={120}
        height={120}
        alt={name}
      />

      <button
        type="button"
        onClick={() => setProductModal(productId, true, cardData)}
        className="ttall pointer-events-none invisible absolute z-20 rounded bg-slate-700 bg-opacity-90 px-3 py-2 text-sm leading-4 text-white opacity-0 transition-all any-hover:hover:bg-opacity-100 any-hover:group-hover:visible any-hover:group-hover:opacity-100 md:pointer-events-auto"
      >
        Быстрый просмотр
      </button>
    </div>
  )
}
