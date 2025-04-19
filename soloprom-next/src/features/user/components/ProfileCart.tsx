'use client'
import { CartProductItem } from '@/components/Cart/CartProductItem'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
}

export const ProfileCart: React.FC<Props> = ({ className }) => {
  const { cartState } = useCartStore()

  return (
    <div className="">
      {cartState.length ? (
        <div className="flex flex-col items-start">
          <div className="mb-5 flex w-full flex-col gap-5 border-b border-grayColor">
            {cartState.map((product) => (
              <CartProductItem
                key={product.productId + product.variant}
                product={product}
              />
            ))}
          </div>
          <Link href={'/cart'} className="button ml-auto px-3 py-2 font-medium">
            К оформлению
          </Link>
        </div>
      ) : (
        <div className="page-container flex justify-center py-10 text-2xl font-medium">
          Список пуст
        </div>
      )}
    </div>
  )
}
