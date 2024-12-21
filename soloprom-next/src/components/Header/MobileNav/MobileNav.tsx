import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import './MobileNav.scss'
import Link from 'next/link'

type Props = {}

const MobileNav = (props: Props) => {
  const cartState = useSelector((state: RootState) => state.cart.cartState)
  const favoriteState = useSelector(
    (state: RootState) => state.favorite.favoriteState,
  )

  return (
    <div className="mobile-nav flex items-center justify-end gap-1 rounded text-sm font-medium">
      <div
        data-current-page="index"
        className="mobile-nav__item border-1 relative inline-flex h-[60px] cursor-pointer justify-center rounded border border-accentBlue bg-accentBlue transition-colors"
      >
        <a
          href="/"
          className="mobile-nav__item-link relative flex items-center rounded p-2.5 text-center font-medium"
        >
          <div className="mobile-nav__item-icon relative px-[5px]">
            <svg className="icon h-7 w-7 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#home"></use>
            </svg>
          </div>
          <span>Главная</span>
        </a>
      </div>
      <div
        data-current-page="catalog"
        className="mobile-nav__item border-1 relative inline-flex h-[60px] cursor-pointer justify-center rounded border border-accentBlue bg-accentBlue transition-colors"
      >
        <a
          href=" /catalog"
          className="mobile-nav__item-link relative flex items-center rounded p-2.5 text-center font-medium"
        >
          <div className="mobile-nav__item-icon relative px-[5px]">
            <svg className="icon h-7 w-7 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#catalog-menu"></use>
            </svg>
          </div>
          <span>Каталог</span>
        </a>
      </div>
      <div className="mobile-nav__item border-1 relative inline-flex h-[60px] cursor-pointer justify-center rounded border border-accentBlue bg-accentBlue transition-colors">
        <Link
          href=" /favorite"
          className="mobile-nav__item-link relative flex items-center rounded p-2.5 text-center font-medium"
        >
          <div
            data-favorite-count={favoriteState.length}
            className={`mobile-nav__item-icon relative px-[5px] ${favoriteState.length && 'added'}`}
          >
            <svg className="icon h-7 w-7 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#heart"></use>
            </svg>
          </div>
          <span>Избранное</span>
        </Link>
      </div>
      <div className="mobile-nav__item border-1 relative inline-flex h-[60px] cursor-pointer justify-center rounded border border-accentBlue bg-accentBlue transition-colors">
        <Link
          href="/cart"
          className="mobile-nav__item-link relative flex items-center rounded p-2.5 text-center font-medium"
        >
          <div
            data-cart-count={cartState.length}
            className={`mobile-nav__item-icon relative px-[5px] ${cartState.length && 'added'}`}
          >
            <svg className="icon h-7 w-7 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#cart"></use>
            </svg>
          </div>
          <span>Корзина</span>
        </Link>
      </div>

      <div className="mobile-nav__item border-1 relative inline-flex h-[60px] cursor-pointer justify-center rounded border border-accentBlue bg-accentBlue transition-colors">
        <button
          data-methods-callback
          className="mobile-nav__item-link relative flex items-center rounded p-2.5 text-center font-medium"
        >
          <span className="mobile-nav__item-icon relative px-[5px]">
            <svg className="icon h-7 w-7 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#messages"></use>
            </svg>
          </span>
          <span>Связь</span>
        </button>

        <ul className="mobile-nav__callback-list">
          <li className="rounded p-[5px] shadow-custom">
            <button
              data-btn-callback
              type="button"
              className="flex flex-col items-center gap-[5px] text-ss text-darkBlue"
            >
              <img src="/img/icons/callback1.svg" className="h-7 w-7" alt="" />
              Заказать звонок
            </button>
          </li>
          <li className="rounded p-[5px] shadow-custom">
            <a
              href="tel:+79036569393"
              className="flex flex-col items-center gap-[5px] text-ss text-darkBlue"
            >
              <img src="/img/icons/tel.svg" className="h-7 w-7" alt="" />
              Телефон
            </a>
          </li>
          <li className="rounded p-[5px] shadow-custom">
            <a
              href="https://wa.me/79036569393"
              className="flex flex-col items-center gap-[5px] text-ss text-darkBlue"
            >
              <img
                src="/img/icons/social/whatsapp.svg"
                className="h-7 w-7"
                alt=""
              />
              Whatsapp
            </a>
          </li>
          <li className="rounded p-[5px] shadow-custom">
            <a
              href="https://t.me/+79036569393"
              className="flex flex-col items-center gap-[5px] text-ss text-darkBlue"
            >
              <img
                src="/img/icons/social/telegram.svg"
                className="h-7 w-7"
                alt=""
              />
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobileNav
