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
  return (
    <div className="cart__list">
      {cartState.length ? (
        cartState.map((product) => (
          <CartProductItem key={product.productId} product={product} />
        ))
      ) : (
        <div className="cart__item cart__item--empty">Корзина пуста</div>
      )}
    </div>
  )
}
