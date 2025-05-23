'use client'
import { getDigFormat } from '@/supports'
import { CardDataProps } from '@/types/products.types'
import React, { useState } from 'react'
import { Button, Loading } from '../ui'
import { CartButton } from '../ProductsCard/CartButton'
import { formattedDiscountPrice } from '@/utils/formattedDiscountPrice'

interface Props {
  cardData: CardDataProps
  relatedProducts: CardDataProps[]
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

export const ProductsPageOffers: React.FC<Props> = ({
  cardData,
  relatedProducts,
}) => {
  const { productId, categoryName, defaultPrice, discount } = cardData

  const productsList = [
    cardData,
    ...relatedProducts.filter((item) => item.productId !== productId),
  ]

  const [visibleRows, setVisibleRows] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const showMoreRows = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleRows(productsList.length)
      setLoadingMore(false)
    }, 1000)
  }

  const remainingOffers = productsList.length - visibleRows
  const discountPrice = formattedDiscountPrice(defaultPrice, discount ?? 0)

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center font-bold text-gray-700">
              {categoryName === 'oils' ? 'Объем' : 'Размер'}
            </th>
            {categoryName === 'battery' ? (
              <th className="border p-2 text-center font-bold text-gray-700">
                Емкость
              </th>
            ) : (
              ''
            )}

            <th className="border p-2 text-center font-bold text-gray-700">
              Наличие
            </th>
            <th className="border p-2 text-left font-bold text-gray-700">
              Цена
            </th>
          </tr>
        </thead>
        <tbody>
          {productsList.slice(0, visibleRows).map((product, index) => (
            <tr
              key={product.productId}
              className="whitespace-nowrap border-b border-grayColor text-center last:border-b-0"
            >
              <td className="whitespace-nowrap p-2 text-center font-bold">
                {product.defaultSize}
              </td>
              {categoryName === 'battery' ? (
                <td className="whitespace-nowrap p-2 text-center font-bold">
                  {product.container}Ah
                </td>
              ) : (
                ''
              )}

              <td className="whitespace-nowrap p-2 text-center font-medium text-darkGreenColor">
                {categoryName === 'oils'
                  ? 'В наличии'
                  : product.stock
                    ? `${product.stock} шт.`
                    : product.delivery}
              </td>
              <td className="flex flex-col items-end justify-between whitespace-nowrap p-2 mds:flex-row mds:items-center mds:gap-4">
                <div
                  className={`relative flex ${discount ? 'text-accentBlue' : 'text-[#272b2c]'} items-end justify-end gap-2`}
                >
                  {discount && (
                    <>
                      <span className={`whitespace-nowrap text-xl font-medium`}>
                        getDigFormat(defaultPrice)
                      </span>
                      <b
                        className={`leading-1 whitespace-nowrap font-medium text-[#a7a0a0] line-through`}
                      >
                        {`${discountPrice} ₽`}
                      </b>
                    </>
                  )}
                  {!product.discount && (
                    <span className="text-lg font-medium">
                      {product.defaultPrice > 0
                        ? `${getDigFormat(product.defaultPrice)} ₽`
                        : 'По запросу'}
                    </span>
                  )}
                </div>
                <CartButton
                  cardData={product}
                  className="gap-2.5 px-2.5 py-1.5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleRows < productsList.length && (
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
