import React, { useState } from 'react'

import './MobileNav.scss'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { useCompareStore } from '@/store/useCompareStore'
import { useModalsStore } from '@/store/useModalsStore'

type Props = {}

const MobileNav = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { cartState } = useCartStore()
  const { favoriteState } = useFavoriteStore()
  const { modalCallbackStateChange } = useModalsStore()
  const { totalComparedItemsCount } = useCompareStore()

  return (
    <div className="mobile-nav fixed bottom-0 left-0 grid w-full grid-cols-5 items-center justify-around gap-1 rounded border-t border-grayColor bg-white px-[5px] py-[2px] text-sm font-medium md:static md:flex md:justify-end md:border-none">
      <div className="mobile-nav__item border-1 relative inline-flex h-[50px] cursor-pointer justify-center rounded-lg border bg-white transition-colors md:h-11 md:border-accentBlue md:bg-accentBlue md:bg-none lg:h-12">
        <a
          href=" /catalog"
          className="relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base"
        >
          <div className="mobile-nav__item-icon relative px-[5px]">
            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#catalog-menu"></use>
            </svg>
          </div>
          <span>Каталог</span>
        </a>
      </div>
      <div className="mobile-nav__item border-1 relative inline-flex h-[50px] cursor-pointer justify-center rounded-lg border bg-white transition-colors md:h-11 md:border-accentBlue md:bg-accentBlue md:bg-none lg:h-12">
        <Link
          href=" /compare"
          className="relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base"
        >
          <div
            data-compare-count={totalComparedItemsCount}
            className={`mobile-nav__item-icon relative px-[5px] ${totalComparedItemsCount && 'added'}`}
          >
            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#scales"></use>
            </svg>
          </div>
          <span>Сравнение</span>
        </Link>
      </div>
      <div className="mobile-nav__item border-1 relative inline-flex h-[50px] cursor-pointer justify-center rounded-lg border bg-white transition-colors md:h-11 md:border-accentBlue md:bg-accentBlue md:bg-none lg:h-12">
        <Link
          href=" /favorite"
          className="relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base"
        >
          <div
            data-favorite-count={favoriteState.length}
            className={`mobile-nav__item-icon relative px-[5px] ${favoriteState.length && 'added'}`}
          >
            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#heart"></use>
            </svg>
          </div>
          <span>Избранное</span>
        </Link>
      </div>
      <div className="mobile-nav__item border-1 relative inline-flex h-[50px] cursor-pointer justify-center rounded-lg border bg-white transition-colors md:h-11 md:border-accentBlue md:bg-accentBlue md:bg-none lg:h-12">
        <Link
          href="/cart"
          className="relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base"
        >
          <div
            data-cart-count={cartState.length}
            className={`mobile-nav__item-icon relative px-[5px] ${cartState.length && 'added'}`}
          >
            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#cart"></use>
            </svg>
          </div>
          <span>Корзина</span>
        </Link>
      </div>

      <div className="mobile-nav__item border-1 relative inline-flex h-[50px] cursor-pointer justify-center rounded-lg border bg-white transition-colors md:h-11 md:border-accentBlue md:bg-accentBlue md:bg-none lg:h-12">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base ${isOpen && 'active'}`}
        >
          <span className="mobile-nav__item-icon relative px-[5px]">
            <svg className="icon h-6 w-6 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#messages"></use>
            </svg>
          </span>
          <span>Связь</span>
        </button>

        <ul
          className={`mobile-nav__callback-list -r-4 invisible absolute bottom-[calc(100%+10px)] z-10 translate-x-[100px] flex-col gap-2.5 rounded bg-white opacity-0 shadow-custom transition-all md:hidden ${isOpen && 'show'}`}
        >
          <li className="rounded p-[5px] shadow-custom">
            <button
              onClick={() => modalCallbackStateChange(true)}
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
