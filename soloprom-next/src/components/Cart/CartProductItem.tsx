'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getDigFormat } from '@/supports'
import { useCartStore, CartProductTypes } from '@/store/useCartStore'
import { Trash2 } from 'lucide-react'
import { sizeNameAdaptive, typeNameAdaptive } from '@/supports/adaptiveDto'
import { CartCountButtons } from './CartCountButtons'
import { formattedDiscountPrice } from '@/utils/formattedDiscountPrice'

interface CartProductItemProps {
  product: CartProductTypes
}

export const CartProductItem: React.FC<CartProductItemProps> = ({
  product,
}) => {
  const { removeCartProduct } = useCartStore()
  const discountPrice = formattedDiscountPrice(
    product.price,
    product.discount,
    product.count,
  )

  return (
    <div
      key={product.productId}
      className="flex flex-col gap-5 rounded-md py-2.5 shadow-full mds:p-2.5 mdl:flex-row mdl:items-center [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayColor"
    >
      <div className="flex flex-auto items-center">
        <div className="mds:h-30 mds:w-30 mr-5 h-20 w-20">
          <Image
            src={
              product.img
                ? `/img/catalog/${product.img}.webp`
                : '/img/catalog/not-found.jpg'
            }
            className="h-full w-full object-contain"
            width={150}
            height={150}
            alt={product.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="link-hover font-medium leading-5">
            <Link href={product.url}>
              <b>{product.name}</b>
            </Link>
          </div>
          <div>
            {sizeNameAdaptive[product.categoryName]}: <b>{product.size}</b>
          </div>
          <div>
            {typeNameAdaptive[product.categoryName]}:{' '}
            <b>{product.productType}</b>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end gap-2.5 pr-3 xs:gap-5 mdl:flex-col mdl:gap-5 md:pr-0 lg:flex-row">
        <CartCountButtons productId={product.productId} count={product.count} />
        <div className="order-2 flex flex-row items-center gap-5 mdl:order-none mdl:items-end md:items-center">
          <div className="order-2 whitespace-nowrap text-xl md:order-none">
            <div className="relative font-medium">
              {discountPrice ? (
                <span className="absolute bottom-full right-0 text-base leading-none text-[#a7a0a0] line-through">
                  {discountPrice}
                </span>
              ) : (
                ''
              )}
              <span className={`text-lg ${discountPrice && 'text-redColor'}`}>
                {getDigFormat(product.price * product.count)}₽
              </span>
            </div>
          </div>

          <div className="order-2 flex items-center gap-5 mdl:order-none mdl:flex-row md:flex-col">
            <button
              onClick={() => removeCartProduct(product.productId)}
              className="text-darkBlue hover:text-accentBlue"
            >
              <Trash2 className="icon h-5 w-5 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
