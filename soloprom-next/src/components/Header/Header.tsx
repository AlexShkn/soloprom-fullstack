'use client'
import React, { useEffect } from 'react'

import { getStateFromLocalStorage } from '@/utils/localStorage/getStateFromLocalStorage'

import { HeaderTop } from './HeaderTop/HeaderTop'
import HeaderBody from './HeaderBody/HeaderBody'
import HeaderBottom from './HeaderBottom/HeaderBottom'

import './Header.scss'
import { useCartStore } from '@/store/cartStore'
import { useFavoriteStore } from '@/store/favoriteStore'
import { useCompareStore } from '@/store/compareStore'
import { getCompareLocalStorage } from '@/utils/localStorage/getCompareLocalStorage'

export const Header: React.FC = () => {
  const setCart = useCartStore((state) => state.setCart)
  const setFavorite = useFavoriteStore((state) => state.setFavorite)
  const setComparedItems = useCompareStore((state) => state.setComparedItems)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')
      const initialCompare = getCompareLocalStorage('comparedItems')
      console.log(initialCompare)

      setComparedItems(initialCompare)
      setCart(initialCart)
      setFavorite(initialFavorite)
    }
  }, [])

  return (
    <header className="header relative w-full bg-white transition-all">
      <div className="header__wrapper relative z-[31] bg-white pb-10 shadow-custom">
        <HeaderTop />
        <div className="header__container">
          <HeaderBody />
          <HeaderBottom />
        </div>
      </div>
    </header>
  )
}
