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
    <div className="mx-auto max-w-[800px] overflow-x-auto">
      <table className="w-full table-auto border-collapse overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left font-semibold text-gray-700">
              Вариант
            </th>
            <th className="border p-2 text-left font-semibold text-gray-700">
              Наличие
            </th>
            <th className="border p-2 text-left font-semibold text-gray-700">
              Цена
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sizesData &&
            Object.keys(sizesData).map((variant, index) => (
              <tr
                key={variant}
                className="whitespace-nowrap border-b border-grayColor last:border-b-0"
              >
                <td className="whitespace-nowrap border p-2">{variant}</td>
                <td className="whitespace-nowrap border p-2">
                  {categoryName === 'oils'
                    ? 'В наличии'
                    : stock
                      ? `${stock} шт.`
                      : delivery}
                </td>
                <td className="whitespace-nowrap border p-2">
                  {getDigFormat(sizesData[variant])} ₽
                </td>
                <td className="flex justify-center p-2">
                  <button
                    onClick={() =>
                      checkProductInCart(variant)
                        ? handleRemoveFromCart(variant)
                        : handleAddToCart(variant)
                    }
                    disabled={cartIsLoad}
                    className={`button product-page-card__button-cart relative gap-2.5 px-2.5 py-1.5 font-bold ${
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
                    {checkProductInCart(variant) ? 'Удалить' : 'Добавить'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
