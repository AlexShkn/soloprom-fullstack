import React, { useState, memo, useCallback } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { useFavoriteCount } from '@/store/useFavoriteStore'
import { useCompareStore } from '@/store/useCompareStore'
import { CallbackMethodsDrop } from '../CallbackMethodsDrop'
import { NavItem } from './NavItem'
import { CartNavItem } from './CartNavItem'

export const ICON_SPRITE_PATH = '/img/sprite.svg#'

const MobileNav = memo(() => {
  const { cartCount } = useCartStore()
  const favoriteCount = useFavoriteCount()
  const { totalComparedItemsCount } = useCompareStore()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div className="mobile-nav fixed bottom-0 left-0 flex w-full items-center justify-center gap-1 border-t border-white bg-darkBlue px-[5px] py-[2px] text-sm font-medium xs:gap-2 md:static md:flex md:justify-end md:rounded md:border-none md:bg-transparent">
      <NavItem
        href="/catalog"
        icon="catalog-menu"
        label="Каталог"
        className="md:hidden"
      />
      <NavItem
        href="/compare"
        icon="scales"
        label="Сравнение"
        count={totalComparedItemsCount}
        id={'compare'}
      />

      <NavItem
        href="/favorite"
        icon="heart"
        label="Избранное"
        count={favoriteCount}
        id={'favorite'}
      />

      <CartNavItem
        href="/cart"
        icon="cart"
        label="Корзина"
        count={cartCount}
        id={'cart'}
      />

      <div className="mobile-nav__item relative inline-flex cursor-pointer justify-center rounded-lg text-white transition-colors md:hidden md:h-11 md:bg-accentBlue md:bg-none lg:h-12">
        <button
          onClick={toggleOpen}
          className={`relative flex flex-col items-center gap-1 rounded p-2.5 px-2.5 text-center text-[10px] font-medium xs:py-1 md:justify-center md:text-ss lg:flex-row lg:justify-start lg:text-base ${isOpen && 'active'}`}
          aria-expanded={isOpen}
        >
          <span className="relative px-[5px]">
            <svg className="icon h-6 w-6 fill-white transition-colors md:fill-white">
              <use xlinkHref={`${ICON_SPRITE_PATH}messages`}></use>
            </svg>
          </span>
          <span className="leading-none">Связь</span>
        </button>

        <CallbackMethodsDrop isOpen={isOpen} />
      </div>
    </div>
  )
})

export default MobileNav
