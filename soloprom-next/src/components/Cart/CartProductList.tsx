'use client'
import React from 'react'

import { CartProductItem } from './CartProductItem'
import { CartProductTypes } from '@/store/useCartStore'

interface CartProductListProps {
  cartState: CartProductTypes[]
}

export const CartProductList: React.FC<CartProductListProps> = ({
  cartState,
}) => {
  return (
    <div className="cart-product-list border-t-1-grayColor border-b-1-grayColor flex flex-auto flex-col gap-5">
      {cartState.map((product) => (
        <CartProductItem key={product.productId} product={product} />
      ))}
    </div>
  )
}
