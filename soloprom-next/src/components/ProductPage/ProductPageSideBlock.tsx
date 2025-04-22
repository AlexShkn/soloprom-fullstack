'use client'
import { getDigFormat } from '@/supports'
import { CardDataProps } from '@/types/products.types'
import { useCartStore } from '@/store/useCartStore'
import React, { useEffect, useState } from 'react'
import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  cardData: CardDataProps
}

export const ProductPageSideBlock: React.FC<Props> = ({ cardData }) => {
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
    size,
  } = cardData

  const [cartIsLoad, setCartIsLoad] = useState(false)

  const [cartIsAddedList, setCartIsAddedList] = useState<string[]>([])

  const { cartState, addProductToCart, removeCartProduct } = useCartStore()
  const { setShareModal } = useModalsStore()
  const { modalCallbackStateChange, setFastOrderProduct } = useModalsStore()

  const sizesData = sizes || volumes

  const variantSize = size || (sizesData && Object.keys(sizesData)[0])

  const checkProductInCart = (size: string) => {
    const storeId = `${productId}-${size}`
    return cartState.some((item) => item.storeId === storeId)
  }

  useEffect(() => {
    if (sizesData) {
      const initialAddedStates = Object.keys(sizesData).filter((size) =>
        checkProductInCart(size),
      )
      setCartIsAddedList(initialAddedStates)
    }
  }, [sizesData, cartState])

  const handleAddToCart = (size: string) => {
    setCartIsLoad(true)

    const product = {
      productId: productId,
      name,
      variant: size,
      price: sizesData?.[size] ?? defaultPrice,
      url,
      img,
      productType,
      categoryName,
    }

    addProductToCart(product)
    setCartIsAddedList((prev) => [...prev, size])

    setCartIsLoad(false)
  }

  const handleRemoveFromCart = (size: string) => {
    setCartIsLoad(true)
    removeCartProduct(productId, size)
    setCartIsAddedList((prev) => prev.filter((item) => item !== size))
    setCartIsLoad(false)
  }

  const fastOrderHandle = () => {
    setFastOrderProduct({
      productId,
      name,
      variant: variantSize || '1',
      price: defaultPrice,
      url,
      img,
    })
    modalCallbackStateChange(true)
  }

  const cost =
    (sizesData && variantSize && sizesData[variantSize]) || defaultPrice

  const formattedDiscountPrice = () => {
    if (!discount || !cost) return defaultPrice

    return getDigFormat(Math.floor(cost * (1 + discount / 100)))
  }

  return (
    <div className="w-full rounded-custom bg-white px-5 py-7 shadow-custom lg:relative lg:w-full lg:max-w-[350px]">
      <button
        type="button"
        className={`product-card__favorite absolute right-4 top-3`}
        onClick={() => setShareModal(productId, true)}
      >
        <svg className="icon h-6 w-6 fill-accentBlue transition-colors">
          <use xlinkHref="/img/sprite.svg#shared" />
        </svg>
      </button>
      {variantSize && (
        <div className="flex h-full flex-col items-start">
          <div className="mb-10">
            <div className={`my-2.5 flex items-center justify-between gap-2.5`}>
              <div
                className={`relative flex font-bold ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} flex-row-reverse items-center gap-2 text-2xl`}
              >
                {discount && (
                  <>
                    <b
                      className={`leading-1 whitespace-nowrap text-lg font-medium text-[#a7a0a0] line-through`}
                    >
                      {`${formattedDiscountPrice()} ₽`}
                    </b>
                    <span className={`whitespace-nowrap text-2xl`}>
                      {`${getDigFormat(cost)} ₽`}
                    </span>
                  </>
                )}
                {!discount && (
                  <span>
                    {defaultPrice > 0
                      ? `${getDigFormat(cost)} ₽`
                      : 'По запросу'}
                  </span>
                )}
              </div>
            </div>
            <span className="rounded-custom bg-darkGreenColor px-4 py-1 text-white">
              В наличии{stock > 1 ? `: ${stock} шт` : ''}
            </span>
          </div>

          <div className="mt-auto w-full">
            <button
              type="button"
              onClick={() => fastOrderHandle()}
              className={`my-5 font-medium text-[#dd3824] underline`}
            >
              Быстрый заказ
            </button>
            <button
              onClick={() =>
                checkProductInCart(variantSize)
                  ? handleRemoveFromCart(variantSize)
                  : handleAddToCart(variantSize)
              }
              disabled={cartIsLoad}
              className={`button relative w-full gap-2.5 p-2.5 font-bold ${
                checkProductInCart(variantSize) && 'added'
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
              В корзину
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
