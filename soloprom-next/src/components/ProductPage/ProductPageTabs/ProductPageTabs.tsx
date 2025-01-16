'use client'
import React, { useState, useCallback, useMemo } from 'react'
import './ProductPageTabs.scss'

// Типы
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
  productDescr: ProductDescription
}

type CurrentTabType = number

const DescriptionTab = React.memo(({ text }: { text: string }) => (
  <div className="product-page-tabs__description">{text}</div>
))

const CharacteristicsTab = React.memo(
  ({ options }: { options: [string, string][] }) => (
    <div className="product-page-tabs__description">
      {options.length ? (
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
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {row[0]}
                </td>
                <td className="px-6 py-4">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="product-page-tabs__reviews-not">Нет характеристик</div>
      )}
    </div>
  ),
)

const CompatibilityTab = React.memo(({ models }: { models: string[] }) => (
  <div className="product-page-card__table-info">
    {models.length > 0 ? (
      <ul className="product-page-card__table-list">
        {models.map((model, index) => (
          <li key={index} className="product-page-card__table-item">
            {model}
          </li>
        ))}
      </ul>
    ) : (
      <div className="product-page-tabs__reviews-not">Список пуст</div>
    )}
  </div>
))

const ReviewsTab = React.memo(
  ({
    productDescr,
    reviews,
  }: {
    productDescr: ProductDescription
    reviews: Review[]
  }) => (
    <div className="product-page-tabs__reviews">
      {reviews.length > 0 ? (
        <>
          <h2 className="section-title product-page-tabs__reviews-title">
            {productDescr.name}
          </h2>
          <ul className="product-page-tabs__reviews-list">
            {reviews.map((review, index) => (
              <li key={index} className="product-page-tabs__reviews-item">
                <div className="product-page-tabs__reviews-head">
                  <div className="product-page-tabs__reviews-profile">
                    <div className="product-page-tabs__reviews-avatar">
                      <img src="/img/icons/profile.svg" alt="" />
                    </div>
                    <div className="product-page-tabs__reviews-name">
                      {review.name}
                    </div>
                  </div>
                  <div className="product-page-tabs__reviews-stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <img
                        key={starIndex}
                        src="/img/icons/star.svg"
                        alt=""
                        style={{
                          opacity: starIndex + 1 <= review.rating ? 1 : 0.3,
                        }}
                      />
                    ))}

                    <span>{review.rating}</span>
                  </div>
                </div>
                <div className="product-page-tabs__reviews-body">
                  <div className="product-page-tabs__reviews-point">
                    <div className="product-page-tabs__reviews-point-title">
                      Достоинства
                    </div>
                    <div className="product-page-tabs__reviews-point-text">
                      {review.positive}
                    </div>
                  </div>
                  <div className="product-page-tabs__reviews-point">
                    <div className="product-page-tabs__reviews-point-title">
                      Недостатки
                    </div>
                    <div className="product-page-tabs__reviews-point-text">
                      {review.negative}
                    </div>
                  </div>
                  <div className="product-page-tabs__reviews-point">
                    <div className="product-page-tabs__reviews-point-title">
                      Комментарий
                    </div>
                    <div className="product-page-tabs__reviews-point-text">
                      {review.comment}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="product-page-tabs__reviews-not">Нет отзывов</div>
      )}
    </div>
  ),
)

const DeliveryTab = React.memo(() => (
  <div className="product-page-tabs__delivery">
    <div className="product-page-tabs__delivery-block">
      <div className="product-page-tabs__delivery-title">
        Доставка осуществляется в интервалах:
      </div>
      <div className="product-page-tabs__delivery-text">
        - Буди: 9:00 до 18:00
      </div>
      <div className="product-page-tabs__delivery-text">
        - В выходные дни: - с 10:00 до 15:00
      </div>
    </div>
    <div className="product-page-tabs__delivery-block">
      <div className="product-page-tabs__delivery-text">
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

  if (!productDescr) {
    return <div>Product not found</div>
  }

  const { models = [], reviews = [], options = [], text, name } = productDescr
  const captions = useMemo(
    () => [
      'Описание товара',
      'Характеристики',
      'Совместимость',
      `Отзывы (${reviews.length})`,
      'Доставка',
    ],
    [reviews.length],
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
    <div className="product-page-tabs">
      <div className="product-page-tabs__caption-wrapper">
        <div className="product-page-tabs__caption-list">
          {captions.map((caption, index) => (
            <div
              key={caption}
              className={`product-page-tabs__caption ${
                index === currentTab && 'active'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {caption}
            </div>
          ))}
        </div>
        <div className="product-page-tabs__caption-scrollbar">
          <div className="product-page-tabs__caption-scrollbar-drag"></div>
        </div>
      </div>
      <div className="product-page-tabs__content">{renderTabContent()}</div>
    </div>
  )
}
