'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  increaseProductCount,
  decreaseProductCount,
  removeCartProduct,
} from '@/redux/slices/cartSlice'

import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { CartResult } from '@/components/Cart/CartResult'

import './Cart.scss'
import { getDigFormat } from '@/supports'

const sizeNameAdaptive: { [key: string]: string } = {
  tires: 'Размер',
  battery: 'ДхШхВ, мм',
  oils: 'Объём',
}
const typeNameAdaptive: { [key: string]: string } = {
  tires: 'Тип шины',
  battery: 'Тип аккумулятора',
  oils: 'Тип жидкости',
}

export const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { cartState, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  )

  return (
    <>
      <div className="cart__inner-container">
        <BreadCrumbs />
        <div className="cart__head">
          <h1 className="cart__title">Моя корзина</h1>
          <Link href="/" className="cart__back-link">
            <svg className="icon">
              <use xlinkHref="/img/sprite.svg#back-arrow"></use>
            </svg>
            Вернуться к покупкам
          </Link>
        </div>
        <div className="cart__list">
          {cartState.length ? (
            cartState.map((product) => (
              <div
                key={product.productId + product.variant}
                className="cart__item"
              >
                <div className="cart__item-left">
                  <Link href={product.url} className="cart__item-link"></Link>
                  <div className="cart__item-image">
                    <Link href={product.url} className="cart__item-link">
                      <Image
                        src={
                          product.img
                            ? `/img/catalog/${product.img}.webp`
                            : '/img/catalog/not-found.jpg'
                        }
                        width={150}
                        height={150}
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="cart__item-description">
                    <div className="cart__item-title">
                      <b>{product.name}</b>
                    </div>
                    <div className="cart__item-sizes">
                      {sizeNameAdaptive[product.categoryName]}:
                      <b>{product.variant}</b>
                    </div>
                    <div className="cart__item-type">
                      {typeNameAdaptive[product.categoryName]}:{' '}
                      <b>{product.productType}</b>
                    </div>
                  </div>
                </div>
                <div className="cart__item-row">
                  <div className="cart__item-counter">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseProductCount({
                            productId: product.productId,
                            variant: product.variant,
                          }),
                        )
                      }
                      disabled={product.count === 1}
                      type="button"
                      className="cart__item-count"
                    >
                      <svg className="icon">
                        <use xlinkHref="/img/sprite.svg#minus"></use>
                      </svg>
                    </button>
                    <div className="cart__item-count-value">
                      {product.count}
                    </div>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseProductCount({
                            productId: product.productId,
                            variant: product.variant,
                          }),
                        )
                      }
                      type="button"
                      className="cart__item-count"
                    >
                      <svg className="icon">
                        <use xlinkHref="/img/sprite.svg#plus"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="cart__item-right">
                    <div className="cart__item-price">
                      <span>
                        {getDigFormat(product.price * product.count)}₽
                      </span>
                    </div>

                    <div className="cart__item-buttons">
                      <button
                        onClick={() =>
                          dispatch(
                            removeCartProduct({
                              productId: product.productId,
                              variant: product.variant,
                            }),
                          )
                        }
                        data-cart-remove=""
                        className="cart__item-button"
                      >
                        <svg className="icon">
                          <use xlinkHref="/img/sprite.svg#remove"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart__item cart__item--empty">Корзина пуста</div>
          )}
        </div>
      </div>
      <div className="cart__container">
        {cartState.length > 0 && (
          <CartResult cartLength={cartState.length} totalAmount={totalAmount} />
        )}
      </div>
    </>
  )
}
