'use client'
import { getDigFormat } from '@/supports'
import { CardDataProps } from '@/types/products.types'
import { useCartStore } from '@/store/cartStore'
import React, { useEffect, useState } from 'react'
import { Button, Loading } from '../ui'

interface Props {
  cardData: CardDataProps
}

const pluralize = (count: number, variants: [string, string, string]) => {
  const absCount = Math.abs(count)
  const remainder10 = absCount % 10
  const remainder100 = absCount % 100

  if (remainder10 === 1 && remainder100 !== 11) {
    return variants[0]
  } else if (
    remainder10 >= 2 &&
    remainder10 <= 4 &&
    (remainder100 < 10 || remainder100 >= 20)
  ) {
    return variants[1]
  } else {
    return variants[2]
  }
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

  const [visibleRows, setVisibleRows] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

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

  const formattedDiscountPrice =
    discount && defaultPrice
      ? `${getDigFormat(Math.floor(defaultPrice * (1 + discount / 100)))}`
      : ''

  const showMoreRows = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleRows(Object.keys(sizesData!).length)
      setLoadingMore(false)
    }, 1000)
  }

  const sizesArray = sizesData ? Object.keys(sizesData) : []
  const remainingOffers = sizesArray.length - visibleRows

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center font-bold text-gray-700">
              {categoryName === 'oils' ? 'Объем' : 'Размер'}
            </th>
            <th className="border p-2 text-center font-bold text-gray-700">
              Наличие
            </th>
            <th className="border p-2 text-left font-bold text-gray-700">
              Цена
            </th>
          </tr>
        </thead>
        <tbody>
          {sizesArray
            .slice(0, visibleRows) // Only render the visible rows
            .map((variant, index) => (
              <tr
                key={variant}
                className="whitespace-nowrap border-b border-grayColor text-center last:border-b-0"
              >
                <td className="whitespace-nowrap p-2 text-center font-bold">
                  {variant}
                </td>
                <td className="text-darkGreenColor whitespace-nowrap p-2 text-center font-medium">
                  {categoryName === 'oils'
                    ? 'В наличии'
                    : stock
                      ? `${stock} шт.`
                      : delivery}
                </td>
                <td className="flex flex-col items-end justify-between whitespace-nowrap p-2 mds:flex-row mds:items-center mds:gap-4">
                  <div
                    className={`relative flex ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} items-end justify-end gap-2`}
                  >
                    {formattedDiscountPrice && (
                      <>
                        <span
                          className={`whitespace-nowrap text-xl font-medium`}
                        >
                          {`${getDigFormat(defaultPrice)} ₽`}{' '}
                        </span>
                        <b
                          className={`leading-1 whitespace-nowrap font-medium text-[#a7a0a0] line-through`}
                        >
                          {`${getDigFormat(formattedDiscountPrice)} ₽`}
                        </b>
                      </>
                    )}
                    {!formattedDiscountPrice && (
                      <span className="text-lg font-medium">
                        {defaultPrice > 0
                          ? `${getDigFormat(defaultPrice)} ₽`
                          : 'По запросу'}{' '}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      checkProductInCart(variant)
                        ? handleRemoveFromCart(variant)
                        : handleAddToCart(variant)
                    }
                    disabled={cartIsLoad}
                    className={`button relative w-full max-w-32 gap-2.5 px-2.5 py-1.5 font-bold ${
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
                    {checkProductInCart(variant) ? 'Удалить' : 'В корзину'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {visibleRows < sizesArray.length && (
        <div className="mt-2 flex justify-end">
          <Button
            variant={'link'}
            onClick={showMoreRows}
            disabled={loadingMore}
            className="px-4 py-2 font-bold underline"
          >
            {!loadingMore &&
              `Показать еще ${remainingOffers} ${pluralize(remainingOffers, ['предложение', 'предложения', 'предложений'])}`}
          </Button>
        </div>
      )}

      {loadingMore && (
        <div className="mt-2 flex justify-center">
          <Loading />
          <div>Загрузка...</div>
        </div>
      )}
    </div>
  )
}
