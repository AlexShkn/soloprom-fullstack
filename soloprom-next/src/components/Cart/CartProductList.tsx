'use client'
import React from 'react'

import { CartProductItem } from './CartProductItem'
import { CartProductTypes } from '@/zustand/cartStore'

interface CartProductListProps {
  cartState: CartProductTypes[]
}

export const CartProductList: React.FC<CartProductListProps> = ({
  cartState,
}) => {
  return (
    <div className="border-t-1-grayColor border-b-1-grayColor mb-12 flex flex-col gap-5">
      {cartState.map((product) => (
        <CartProductItem
          key={product.productId + product.variant}
          product={product}
        />
      ))}
    </div>
  )
}
