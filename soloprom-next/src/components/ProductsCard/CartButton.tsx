'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui'
import { useCartStore } from '@/store/useCartStore'
import { ArrowLeft, Zap } from 'lucide-react'
import { useFastOrder } from '@/hooks/useFastOrder'
import { toast } from 'sonner'
import { useDrawerStore } from '@/store/useDrawerStore'

export interface CartData {
  productId: string
  url: string
  name: string
  img: string
  categoryName: string
  defaultPrice: number
  discount?: number
  defaultSize: string
  productType: string
}

interface Props {
  className?: string
  cardData: CartData
  mod?: string
}

export const CartButton: React.FC<Props> = ({ cardData, mod, className }) => {
  const [cartIsAdded, setCartIsAdded] = useState(false)
  const [cartIsLoad, setCartIsLoad] = useState(false)
  const { addProductToCart, removeCartProduct } = useCartStore()
  const { cartState } = useCartStore()
  const { fastOrder } = useFastOrder()
  const { setProductDrawer } = useDrawerStore()

  const {
    productId,
    url,
    name,
    img,
    categoryName,
    defaultPrice,
    defaultSize,
    productType,
    discount = 0,
  } = cardData

  useEffect(() => {
    setCartIsAdded(cartState.some((item) => item.storeId === productId))
  }, [cartState, productId])

  const handleAddToCart = () => {
    setCartIsLoad(true)
    const product = {
      productId,
      name,
      price: defaultPrice,
      size: defaultSize,
      discount,
      url,
      img,
      productType,
      categoryName,
    }
    addProductToCart(product)

    setProductDrawer(productId, true, cardData)

    setTimeout(() => {
      setCartIsAdded(true)
      setCartIsLoad(false)
    }, 1000)
  }

  const handleRemoveFromCart = () => {
    setCartIsLoad(true)
    removeCartProduct(productId)
    toast.success('Товар удален из корзины товаров')

    setTimeout(() => {
      setCartIsAdded(false)
      setCartIsLoad(false)
    }, 1000)
  }

  return (
    <>
      {defaultPrice ? (
        <button
          type="button"
          aria-label="добавить товар в корзину"
          onClick={cartIsAdded ? handleRemoveFromCart : handleAddToCart}
          disabled={cartIsLoad}
          className={`${className} button group relative min-w-32 items-center gap-2 overflow-hidden px-5 py-2.5 font-bold ${mod === 'grid' && 'grid-view w-auto'} ${cartIsLoad && mod !== 'grid' && 'load'} ${cartIsLoad && mod === 'grid' && 'load load--mini'} ${cartIsAdded && 'added bg-transparent'}`}
        >
          <span className="ttall invisible absolute inline-flex h-full w-full items-center justify-center rounded-custom bg-successColor opacity-0 transition-colors">
            <img
              className={`${mod === 'grid' ? 'h-5 w-5' : 'h-7 w-7'}`}
              src="/img/icons/availability-w.svg"
              alt="Availability"
            />
          </span>

          <b className={`relative flex items-center gap-1`}>
            <svg
              className={`grid-view h-5 w-5 fill-white transition-transform group-hover:translate-x-[-16px]`}
            >
              <use xlinkHref="/img/sprite.svg#cart" />
            </svg>

            <ArrowLeft
              className={`absolute right-0 top-1 h-4 w-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100`}
            />
          </b>
          <b
            className={`${mod === 'grid' ? '-mb-0.5 text-sm leading-none' : 'mt-[2px] text-base'} whitespace-nowrap`}
          >
            В корзину
          </b>
        </button>
      ) : (
        <Button
          variant={'dark'}
          type="button"
          onClick={() =>
            fastOrder(productId, name, defaultPrice, defaultSize, url, img)
          }
          aria-label="узнать цену"
          className="button h-10 gap-1 px-5 py-2.5"
        >
          <Zap className="h-5 w-5" />
          Запросить цену
        </Button>
      )}
    </>
  )
}
