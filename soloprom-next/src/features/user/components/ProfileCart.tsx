'use client'
import { CartProductItem } from '@/components/Cart/CartProductItem'
import { useCartStore } from '@/store/cartStore'
import React from 'react'

interface Props {
  className?: string
}

export const ProfileCart: React.FC<Props> = ({ className }) => {
  const { cartState } = useCartStore()

  return (
    <div className="flex flex-col gap-5">
      {cartState.length ? (
        cartState.map((product) => (
          <CartProductItem
            key={product.productId + product.variant}
            product={product}
          />
        ))
      ) : (
        <div className="page-container flex justify-center py-10 text-2xl font-medium">
          Список пуст
        </div>
      )}
    </div>
  )
}
