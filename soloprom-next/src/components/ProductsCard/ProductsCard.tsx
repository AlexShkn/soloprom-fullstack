'use client'
import React from 'react'
import { getDigFormat } from '../../supports/index.js'
import './ProductsCard.scss'
import { ProductsCardProps } from '../ProductList/ProductList'

interface SettingSet {
  new: string
  recommend: string
  selected: string
  discount?: string | undefined
}

const settings: { [key: string]: SettingSet } = {
  regalia: {
    new: 'Новинка',
    recommend: 'Рекомендуем',
    selected: 'Выбор покупателей',
    discount: '',
  },
}

export const ProductsCard: React.FC<ProductsCardProps> = ({ cardData }) => {
  const {
    id,
    url,
    name,
    descr,
    img,
    group,
    delivery,
    type,
    brand,
    country,
    regalia = [],
    sizes,
    defaultPrice,
    volumes,
    discount,
  } = cardData

  console.log(cardData)

  const formattedDiscountPrice = cardData.discount
    ? `${getDigFormat(Math.floor(defaultPrice * (1 - cardData.discount / 100)))} ₽`
    : ''

  return (
    <div data-product-card className="product-list__card product-card">
      {regalia.length > 0 && (
        <ul className="product-card__feature-list">
          {regalia.map((item) => (
            <li key={item} className="product-card__feature-item">
              <img src={`/img/icons/${item}.svg`} alt={`${item} icon`} />

              {item === 'discount' && discount ? (
                <span>-${discount}%</span>
              ) : (
                <b>{settings.regalia[item]}</b>
              )}
            </li>
          ))}
        </ul>
      )}

      <a href={url || '/'} className="product-card__link">
        <img
          className="product-card__image lazy-image"
          src={
            (img && `/img/catalog/${img}.webp`) || '/img/catalog/not-found.jpg'
          }
          alt={name || 'Product Image'}
        />
        <span className="product-card__more">Подробнее</span>
      </a>
      <div data-product-title className="product-card__title">
        {name || 'Product Name'}
      </div>
      <div className="product-card__descr-list">
        <div className="product-card__descr-item">
          <div className="product-card__descr-item-name">Бренд</div>
          <div className="product-card__descr-item-value">{brand || 'N/A'}</div>
        </div>
        <div className="product-card__descr-item">
          <div className="product-card__descr-item-name">Производитель</div>
          <div className="product-card__descr-item-value">
            {country || 'N/A'}
          </div>
        </div>
        <div className="product-card__descr-item">
          <div className="product-card__descr-item-name">Размерность</div>
          <div data-sizes className="product-card__descr-item-value">
            {/* {sizes || 'N/A'} */}
          </div>
        </div>
        <div className="product-card__descr-item">
          <div className="product-card__descr-item-name">Тип шины</div>
          <div className="product-card__descr-item-value">{type || 'N/A'}</div>
        </div>
      </div>
      <div className="product-card__bottom">
        <div className="product-card__options">
          <div data-price className="product-card__price">
            {formattedDiscountPrice && (
              <>
                <span>{getDigFormat(defaultPrice)} </span>
                <b className="product-card__price-discount">
                  {getDigFormat(formattedDiscountPrice)}
                </b>
              </>
            )}
            {!formattedDiscountPrice && (
              <span>{getDigFormat(defaultPrice)} </span>
            )}
            ₽
          </div>
        </div>
        <div className="product-card__added">
          <button
            type="button"
            data-btn-fast-order
            className="product-card__click"
          >
            Купить в 1 клик
          </button>
        </div>
        <div data-add-buttons className="product-card__buttons">
          <button
            type="button"
            data-favorite-btn
            className="product-card__favorite"
          >
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#heart" />
            </svg>
          </button>
          <button
            type="button"
            data-cart-btn
            className="button product-card__button"
          >
            <span>
              <img src="/img/icons/availability.svg" alt="Availability" />
            </span>
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#cart" />
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
