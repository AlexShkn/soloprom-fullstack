'use client'
import { ReviewsTypes } from '@/utils/api/reviews'
import React, { useState, useCallback, useMemo } from 'react'
import { ReviewsTab } from './Tabs/Reviews/ReviewsTab'

type Review = {
  name: string
  rating: number
  positive: string
  negative: string
  comment: string
}

export type ProductDescription = {
  productId: string
  name: string
  text: string
  reviews?: Review[]
  rating?: string
  models?: string[]
  options?: [string, string][]
}

interface Props {
  productDescr?: ProductDescription
  reviewData: ReviewsTypes[]
  productId: string
}

const DescriptionTab = React.memo(({ text }: { text: string }) => (
  <div className="">
    {text ? (
      <div className="text-base">{text}</div>
    ) : (
      <div className="my-12 text-center text-3xl font-bold">Нет описания</div>
    )}
  </div>
))

const CharacteristicsTab = React.memo(
  ({ options }: { options: [string, string][] | undefined }) => (
    <div className="text-base">
      {options?.length ? (
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="border-b border-gray-900/60 bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Свойство
              </th>
              <th scope="col" className="px-6 py-3">
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((row, index) => (
              <tr key={index} className="border-b bg-white hover:bg-gray-50">
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900 mds:px-6">
                  {row[0]}
                </td>
                <td className="px-6 py-4">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="my-12 text-center text-3xl font-bold">
          Нет характеристик
        </div>
      )}
    </div>
  ),
)

const CompatibilityTab = React.memo(
  ({ models }: { models: string[] | undefined }) => (
    <div className="">
      {models && models?.length > 0 ? (
        <ul className="flex max-w-5xl flex-wrap items-center gap-2">
          {models.map((model, index) => (
            <li
              key={model + index}
              className="border-1 border-b border-grayColor"
            >
              {model},
            </li>
          ))}
        </ul>
      ) : (
        <div className="my-12 text-center text-3xl font-bold">Список пуст</div>
      )}
    </div>
  ),
)

const DeliveryTab = React.memo(() => (
  <div className="product-page-tabs__delivery">
    <div className="mb-5">
      <div className="mb-5 font-bold">
        Доставка осуществляется в интервалах:
      </div>
      <div className="mb-5 text-base">- Буди: 9:00 до 18:00</div>
      <div className="mb-5 text-base">- В выходные дни: - с 10:00 до 15:00</div>
    </div>
    <div className="mb-5">
      <div className="mb-5 text-base">
        Если Вы хотите уточнить сумму доставки, то после приема заказа по
        телефону или на нашем сайте, можете задать вопрос нашим менеджерам, и
        они быстро рассчитают Вам стоимость доставки товара по указанному Вами
        адресу.
      </div>
    </div>
  </div>
))

export const ProductPageTabs: React.FC<Props> = ({
  productDescr,
  reviewData,
  productId,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0)

  const {
    models = [],
    reviews = [],
    options = [],
    text = '',
    name = '',
  } = productDescr || {}

  const captions = useMemo(
    () => [
      'Описание товара',
      'Характеристики',
      'Совместимость',
      `Отзывы (${(reviewData || []).length})`,
      'Доставка',
    ],
    [reviewData?.length],
  )

  const handleTabClick = useCallback((index: number) => {
    setCurrentTab(index)
  }, [])

  const handleKeyDown = useCallback(
    (index: number, event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleTabClick(index)
      }
    },
    [handleTabClick],
  )

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <DescriptionTab text={text} />
      case 1:
        return <CharacteristicsTab options={options} />
      case 2:
        return <CompatibilityTab models={models} />
      case 3:
        return (
          <ReviewsTab
            productDescr={productDescr}
            reviews={reviewData}
            productId={productId}
          />
        )
      case 4:
        return <DeliveryTab />
      default:
        return null
    }
  }

  return (
    <div className="mb-7">
      <div className="mb-10">
        <div className="border-1 scroll-bar-row scroll-bar-row--mini flex items-center gap-5 overflow-x-auto overflow-y-hidden border-b border-grayColor">
          {captions.map((caption, index) => (
            <button
              key={caption}
              className={`font-lg relative cursor-pointer whitespace-nowrap px-1 py-5 text-xl md:px-4 md:py-5 md:font-medium ${
                index === currentTab ? 'text-accentBlue' : ''
              }`}
              onClick={() => handleTabClick(index)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              type="button"
              tabIndex={0}
            >
              {caption}
            </button>
          ))}
        </div>
      </div>
      <div className="">{renderTabContent()}</div>
    </div>
  )
}
