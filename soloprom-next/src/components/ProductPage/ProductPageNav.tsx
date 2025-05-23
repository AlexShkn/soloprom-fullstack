'use client'
import { ReviewsTypes } from '@/api/reviews'
import React, { useMemo } from 'react'
import {
  ArrowLeft,
  Info,
  List,
  Star,
  Tractor,
  PackageCheck,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ProductDescription } from '@/types/products.types'

interface Props {
  productDescr: ProductDescription
  reviewData: ReviewsTypes[]
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void
  refs: React.RefObject<HTMLDivElement>[]
}

export const ProductPageNav: React.FC<Props> = ({
  productDescr,
  reviewData,
  scrollToRef,
  refs,
}) => {
  const router = useRouter()

  const captions = useMemo(
    () => [
      { label: 'О товаре', icon: Info },
      { label: 'Характеристики', icon: List },
      { label: 'Применяемость', icon: Tractor },
      { label: 'Доставка', icon: PackageCheck },
      { label: `Отзывы (${(reviewData || []).length})`, icon: Star },
    ],
    [reviewData?.length],
  )

  return (
    <div className="p-2">
      <div className="scroll-bar-row scroll-bar-row--mini flex gap-4 overflow-x-auto overflow-y-hidden xl:flex-col">
        <button
          className="relative flex cursor-pointer items-center gap-2 whitespace-nowrap px-1 py-4 text-left leading-none text-darkBlue hover:text-accentBlue md:px-4 md:font-medium xl:py-2"
          onClick={() => router.back()}
          type="button"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Вернутся назад
        </button>
        {captions.map((caption, index) => {
          if (
            caption.label === 'Характеристики' &&
            !productDescr?.options?.length
          )
            return ''
          if (
            caption.label === 'Применяемость' &&
            !productDescr?.models?.length
          )
            return ''

          return (
            <button
              key={caption.label}
              className="relative flex cursor-pointer items-center gap-2 whitespace-nowrap px-1 py-4 text-left leading-none text-darkBlue hover:text-accentBlue md:px-4 md:font-medium xl:py-2"
              onClick={() => scrollToRef(refs[index])}
              type="button"
            >
              <caption.icon className="mr-1 h-4 w-4" />
              {caption.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
