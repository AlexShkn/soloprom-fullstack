'use client'
import React from 'react'
import { useFastOrder } from '@/hooks/useFastOrder'

interface Props {
  className?: string
  data: DataTypes
}

interface DataTypes {
  productId: string
  name: string
  defaultPrice: number
  defaultSize: string
  url: string
  img: string
}

export const FastOrderButton: React.FC<Props> = ({ className, data }) => {
  const { fastOrder } = useFastOrder()

  const { productId, name, defaultPrice, defaultSize, url, img } = data
  return (
    <button
      type="button"
      onClick={() =>
        fastOrder(productId, name, defaultPrice, defaultSize, url, img)
      }
      className={`${className} font-medium text-[#dd3824] underline`}
    >
      Быстрый заказ
    </button>
  )
}
