'use client'
import React from 'react'

import { ShareButton } from './ShareButton'
import { CompareButton } from './CompareButton'
import { FavoriteButton } from './FavoriteButton'
import { CardDataProps } from '@/types/products.types'
import { TooltipItem } from '../ui/TooltipItem'

interface Props {
  className?: string
  cardData: CardDataProps
  mod?: string
}

export const ProductsCardSideButtons: React.FC<Props> = ({
  className,
  cardData,
  mod,
}) => {
  return (
    <div
      className={`flex items-center gap-4 ${mod === 'static' ? 'md:gap-2' : ''} ${className}`}
    >
      <TooltipItem message="Поделиться">
        <ShareButton
          productId={cardData.productId}
          className={mod === 'static' ? mod : 'absolute right-2 top-3'}
          svgSize={mod === 'static' ? 'h-8 w-8 md:h-6 md:w-6' : 'h-6 w-6'}
        />
      </TooltipItem>
      <TooltipItem message="В избранное">
        <FavoriteButton
          className={`${mod === 'grid' ? 'absolute right-2.5 top-12' : 'relative'}`}
          cardData={cardData}
          svgSize={mod === 'static' ? 'h-8 w-8 md:h-6 md:w-6' : 'h-6 w-6'}
        />
      </TooltipItem>
      <TooltipItem message="В сравнение">
        <CompareButton
          className={`${mod === 'grid' ? 'absolute right-2.5 top-20' : 'relative'}`}
          cardData={cardData}
          svgSize={mod === 'static' ? 'h-8 w-8 md:h-6 md:w-6' : 'h-6 w-6'}
          mod={mod}
        />
      </TooltipItem>
    </div>
  )
}
