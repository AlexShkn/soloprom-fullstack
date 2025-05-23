'use client'
import React, { useCallback } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { Minus, Plus } from 'lucide-react'

interface Props {
  className?: string
  productId: string
  count: number
}

export const CartCountButtons: React.FC<Props> = ({
  className,
  productId,
  count,
}) => {
  const { decreaseProductCount, increaseProductCount } = useCartStore()

  const handleDecrease = useCallback(() => {
    decreaseProductCount(productId)
  }, [decreaseProductCount, productId])

  const handleIncrease = useCallback(() => {
    increaseProductCount(productId)
  }, [increaseProductCount, productId])

  return (
    <div className="order-2 flex items-center gap-2.5 mds:order-none">
      <button
        onClick={handleDecrease}
        disabled={count === 1}
        type="button"
        className="cart__item-count border-1-[#d4d4d4] inline-flex h-[30px] w-[30px] items-center justify-center rounded-custom bg-accentBlue text-white transition-colors disabled:cursor-default disabled:bg-slate-200 hover:[&:not(:disabled)]:bg-hoverBlue"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="text-lg">{count}</div>
      <button
        onClick={handleIncrease}
        type="button"
        className="cart__item-count border-1-[#d4d4d4] inline-flex h-[30px] w-[30px] items-center justify-center rounded-custom border bg-accentBlue text-white transition-colors disabled:cursor-default disabled:bg-slate-200 hover:[&:not(:disabled)]:bg-hoverBlue"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
