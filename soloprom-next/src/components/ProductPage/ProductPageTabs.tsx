'use client'
import { ReviewsTypes } from '../../api/reviews'
import React from 'react'
import { ReviewsTab } from './Tabs/ReviewsTab'
import { ProductDescription } from '@/types/products.types'

interface Props {
  productDescr?: ProductDescription
  reviewData: ReviewsTypes[]
  productId: string
  descriptionRef: React.RefObject<HTMLDivElement>
  characteristicsRef: React.RefObject<HTMLDivElement>
  compatibilityRef: React.RefObject<HTMLDivElement>
  reviewsRef: React.RefObject<HTMLDivElement>
  deliveryRef: React.RefObject<HTMLDivElement>
}

const DescriptionTab = React.memo(({ text }: { text: string }) => (
  <div className="">
    <h3 className="mb-4 text-xl font-medium">Описание товара</h3>
    {text ? (
      <div className="text-base">{text}</div>
    ) : (
      <div className="text-xl text-[#666a70]">Нет описания</div>
    )}
  </div>
))

export const CharacteristicsTab = React.memo(
  ({ options }: { options: [string, string][] | undefined }) => (
    <div className="overflow-x-auto">
      <h3 className="mb-4 text-xl font-medium">Характеристики</h3>
      <div className="text-base">
        {options?.length ? (
          <table className="w-full border-collapse overflow-hidden rounded text-left text-sm text-gray-500">
            <thead className="bg-accentBlue text-xs uppercase text-white">
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
                  <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 mds:px-6">
                    {row[0]}
                  </td>
                  <td className="px-6 py-2">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-xl text-[#666a70]">Нет характеристик</div>
        )}
      </div>
    </div>
  ),
)

const CompatibilityTab = React.memo(
  ({ models }: { models: string[] | undefined }) => (
    <div className="">
      <h3 className="mb-4 text-xl font-medium">Совместимость</h3>
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
        <div className="text-xl text-[#666a70]">Список пуст</div>
      )}
    </div>
  ),
)

const DeliveryTab = React.memo(() => (
  <div className="product-page-tabs__delivery">
    <h3 className="mb-4 text-xl font-medium">Доставка</h3>
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
  descriptionRef,
  characteristicsRef,
  compatibilityRef,
  reviewsRef,
  deliveryRef,
}) => {
  const { models = [], options = [], text = '', name = '' } = productDescr || {}

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className="mb-3 rounded-custom px-2 py-4 shadow-full md:py-7 md:pl-7 md:pr-5"
          ref={descriptionRef}
        >
          <DescriptionTab text={text} />
        </div>

        {options.length ? (
          <div
            className="mb-3 rounded-custom px-2 py-4 shadow-full md:py-7 md:pl-7 md:pr-5"
            ref={characteristicsRef}
          >
            <CharacteristicsTab options={options} />
          </div>
        ) : (
          ''
        )}
        {models.length ? (
          <div
            className="mb-3 rounded-custom px-2 py-4 shadow-full md:py-7 md:pl-7 md:pr-5"
            ref={compatibilityRef}
          >
            <CompatibilityTab models={models} />
          </div>
        ) : (
          ''
        )}

        <div
          className="mb-3 rounded-custom px-2 py-4 shadow-full md:py-7 md:pl-7 md:pr-5"
          ref={deliveryRef}
        >
          <DeliveryTab />
        </div>
      </div>

      <div className="py-7 pl-7 pr-5" ref={reviewsRef}>
        <ReviewsTab
          productDescr={productDescr}
          reviews={reviewData}
          productId={productId}
        />
      </div>
    </div>
  )
}
