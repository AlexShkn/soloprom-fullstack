'use client'
import { getDigFormat } from '@/supports'
import { CardDataProps } from '@/types/products.types'
import { useCartStore } from '@/store/cartStore'
import React, { useEffect, useState } from 'react'

interface Props {
  cardData: CardDataProps
}

export const ProductsPageOffers: React.FC<Props> = ({ cardData }) => {
  const {
    productId,
    url,
    name,
    img,
    categoryName,
    regalia = [],
    sizes,
    defaultPrice,
    volumes,
    discount,
    productType,
    stock,
    delivery,
  } = cardData

  const [cartIsLoad, setCartIsLoad] = useState(false)

  const [cartIsAddedList, setCartIsAddedList] = useState<string[]>([])

  const { cartState, addProductToCart, removeCartProduct } = useCartStore()

  const sizesData = sizes || volumes

  const checkProductInCart = (variant: string) => {
    const storeId = `${productId}-${variant}`
    return cartState.some((item) => item.storeId === storeId)
  }

  useEffect(() => {
    if (sizesData) {
      const initialAddedStates = Object.keys(sizesData).filter((variant) =>
        checkProductInCart(variant),
      )
      setCartIsAddedList(initialAddedStates)
    }
  }, [sizesData, cartState])

  const handleAddToCart = (variant: string) => {
    setCartIsLoad(true)

    const product = {
      productId: productId,
      name,
      variant: variant,
      price: sizesData?.[variant] ?? defaultPrice,
      url,
      img,
      productType,
      categoryName,
    }

    addProductToCart(product)
    setCartIsAddedList((prev) => [...prev, variant])

    setCartIsLoad(false)
  }

  const handleRemoveFromCart = (variant: string) => {
    setCartIsLoad(true)
    removeCartProduct(productId, variant)
    setCartIsAddedList((prev) => prev.filter((item) => item !== variant))
    setCartIsLoad(false)
  }

  return (
    <div className="">
      <div className="mb-1 flex items-center rounded bg-grayColor px-5 py-2.5 text-2xl font-medium shadow-sm">
        <span>Предложения</span>
      </div>
      <ul className="">
        {sizesData &&
          Object.keys(sizesData).length &&
          Object.keys(sizesData).map((variant) => (
            <li
              key={variant}
              className="border-1 flex flex-col items-end gap-2 border-b border-grayColor p-1 py-2.5 mds:gap-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex w-full flex-auto items-center justify-between gap-2.5">
                <div className="flex flex-auto flex-col mds:flex-row mds:items-center">
                  <div className="border-1 border-r border-grayColor px-2.5 py-1.5">
                    {name}
                  </div>
                  <div className="border-1 border-bottom whitespace-nowrap border-grayColor px-2.5">
                    {variant}
                  </div>
                </div>

                <div className="border-1 whitespace-nowrap border-b border-dashed border-grayColor font-medium">
                  {categoryName === 'oils'
                    ? 'В наличии'
                    : stock
                      ? `${stock} шт.`
                      : delivery}
                </div>

                <div className="whitespace-nowrap text-lg font-bold">
                  {getDigFormat(sizesData[variant])} ₽
                </div>
              </div>

              <button
                onClick={() =>
                  checkProductInCart(variant)
                    ? handleRemoveFromCart(variant)
                    : handleAddToCart(variant)
                }
                disabled={cartIsLoad}
                className={`button product-page-card__button-cart relative gap-2.5 p-2.5 font-bold ${
                  checkProductInCart(variant) && 'added'
                }`}
              >
                <span className="tall transition-color invisible absolute inline-flex h-full w-full items-center justify-center gap-2.5 rounded-custom bg-hoverBlue opacity-0">
                  <img
                    src="/img/icons/availability.svg"
                    className="h-7 w-7"
                    alt=""
                  />
                  Добавлен
                </span>
                <svg className="icon h-6 w-6 fill-white">
                  <use xlinkHref="/img/sprite.svg#cart"></use>
                </svg>
                Добавить
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
