'use client'
import React from 'react'

import { CartProductItem } from './CartProductItem'
import { CartProduct } from '@/redux/slices/cartSlice'

interface CartProductListProps {
  cartState: CartProduct[]
}

export const CartProductList: React.FC<CartProductListProps> = ({
  cartState,
}) => {
  console.log(cartState)

  return (
    <div className="border-t-1-grayColor border-b-1-grayColor mb-12 flex flex-col gap-5">
      {cartState.map((product) => (
        <CartProductItem key={product.productId} product={product} />
      ))}
    </div>
  )
}
