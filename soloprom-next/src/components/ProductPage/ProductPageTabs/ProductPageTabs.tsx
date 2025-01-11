'use client'
import React, { useState, useEffect } from 'react'
import { getProductById } from '@/app/api/routes/products/route'

import './ProductPageTabs.scss'

type ReviewDescription = {
  name: string
  positive: string
  negative: string
  comment: string
  rating: number
}

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
}

interface Props {
  category: string
  productId: string
}

export const ProductPageTabs: React.FC<Props> = ({ category, productId }) => {
  const [currentTab, setCurrentTab] = useState(0)
  const [product, setProduct] = useState<ProductDescription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const fetchedProduct = await getProductById(productId)
      setProduct(fetchedProduct?.productDescr)
      setLoading(false)
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const models = product?.models || []
  const reviews = product?.reviews || []

  const captions = [
    'Описание товара',
    'Совместимость',
    `Отзывы (${reviews.length})`,
    'Доставка',
  ]

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
              onClick={() => setCurrentTab(index)}
            >
              {caption}
            </div>
          ))}
        </div>
        <div className="product-page-tabs__caption-scrollbar">
          <div className="product-page-tabs__caption-scrollbar-drag"></div>
        </div>
      </div>
      <div className="product-page-tabs__content">
        <div
          className={`product-page-tabs__body ${currentTab === 0 && 'active'}`}
        >
          <div className="product-page-tabs__description">{product?.text}</div>
        </div>

        <div
          className={`product-page-tabs__body ${currentTab === 1 && 'active'}`}
        >
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
        </div>

        <div
          className={`product-page-tabs__body ${currentTab === 2 && 'active'}`}
        >
          <div className="product-page-tabs__reviews">
            {reviews.length > 0 ? (
              <>
                <h2 className="section-title product-page-tabs__reviews-title">
                  {product.name}
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
                                opacity:
                                  starIndex + 1 <= review.rating ? 1 : 0.3,
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
        </div>

        <div
          className={`product-page-tabs__body ${currentTab === 3 && 'active'}`}
        >
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
                Если Вы хотите уточнить сумму доставки, то после приема заказа
                по телефону или на нашем сайте, можете задать вопрос нашим
                менеджерам, и они быстро рассчитают Вам стоимость доставки
                товара по указанному Вами адресу.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
