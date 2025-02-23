'use client'
import React, { useState, useCallback, useMemo } from 'react'

type Review = {
  name: string
  rating: number
  positive: string
  negative: string
  comment: string
}

type ProductDescription = {
  name: string
  text: string
  reviews?: Review[]
  rating?: string
  models?: string[]
  options?: [string, string][]
}

interface Props {
  productDescr?: ProductDescription
}

type CurrentTabType = number

const DescriptionTab = React.memo(({ text }: { text: string }) => (
  <div className="text-base">{text}</div>
))

const CharacteristicsTab = React.memo(
  ({ options }: { options: [string, string][] | undefined }) => (
    <div className="text-base">
      {options && options?.length ? (
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

const ReviewsTab = React.memo(
  ({
    productDescr,
    reviews,
  }: {
    productDescr?: ProductDescription
    reviews: Review[] | undefined
  }) => (
    <div className="product-page-tabs__reviews">
      {reviews && reviews?.length > 0 ? (
        <>
          <h2 className="mb-7 text-xl font-bold lg:text-3xl">
            {productDescr?.name || 'Имя продукта'}
          </h2>
          <ul className="product-page-tabs__reviews-list">
            {reviews.map((review, index) => (
              <li key={index} className="mb-6 rounded bg-[#fafafa] p-4 md:p-7">
                <div className="border-1 mb-5 flex items-center justify-between gap-7 border-b border-[#f1eff2] pb-4">
                  <div className="flex items-center">
                    <div className="mr-2.5 flex h-10 w-10 items-center rounded-br-full bg-[#d9dde7] pb-1 pl-1">
                      <img
                        className="h-6 w-6"
                        src="/img/icons/profile.svg"
                        alt=""
                      />
                    </div>
                    <div className="text-lg font-medium">{review.name}</div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <img
                        key={starIndex}
                        src="/img/icons/star.svg"
                        className="h-5 w-5"
                        alt=""
                        style={{
                          opacity: starIndex + 1 <= review.rating ? 1 : 0.3,
                        }}
                      />
                    ))}

                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>
                <div className="product-page-tabs__reviews-body">
                  <div className="mb-5">
                    <div className="mb-4 text-lg font-medium">Достоинства</div>
                    <div className="text-base">{review.positive}</div>
                  </div>
                  <div className="mb-5">
                    <div className="mb-4 text-lg font-medium">Недостатки</div>
                    <div className="text-base">{review.negative}</div>
                  </div>
                  <div className="mb-5">
                    <div className="mb-4 text-lg font-medium">Комментарий</div>
                    <div className="text-base">{review.comment}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="my-12 text-center text-3xl font-bold">Нет отзывов</div>
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

export const ProductPageTabs: React.FC<Props> = ({ productDescr }) => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(0)

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
      `Отзывы (${(reviews || []).length})`,
      'Доставка',
    ],
    [reviews?.length],
  )

  const handleTabClick = useCallback((index: CurrentTabType) => {
    setCurrentTab(index)
  }, [])

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <DescriptionTab text={text} />
      case 1:
        return <CharacteristicsTab options={options} />
      case 2:
        return <CompatibilityTab models={models} />
      case 3:
        return <ReviewsTab productDescr={productDescr} reviews={reviews} />
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
            <div
              key={caption}
              className={`font-lg relative cursor-pointer whitespace-nowrap px-1 py-5 text-xl md:px-4 md:py-5 md:font-medium ${
                index === currentTab && 'text-accentBlue'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {caption}
            </div>
          ))}
        </div>
      </div>
      <div className="">{renderTabContent()}</div>
    </div>
  )
}
