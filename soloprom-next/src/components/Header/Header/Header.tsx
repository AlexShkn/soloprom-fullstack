'use client'
import React, { useEffect } from 'react'

import { getStateFromLocalStorage } from '@/utils/getCartFromLocalStorage'

import { HeaderTop } from '../HeaderTop/HeaderTop'
import HeaderBody from '../HeaderBody/HeaderBody'
import HeaderBottom from '../HeaderBottom/HeaderBottom'

import './Header.scss'
import { useCartStore } from '@/zustand/cartStore'
import { useFavoriteStore } from '@/zustand/favoriteStore'

export const Header: React.FC = () => {
  const setCart = useCartStore((state) => state.setCart)
  const setFavorite = useFavoriteStore((state) => state.setFavorite)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')

      setCart(initialCart)
      setFavorite(initialFavorite)
    }
  }, [])

  return (
    <header className="header relative w-full bg-white transition-all">
      <div className="header__wrapper relative z-[23] bg-white pb-10 shadow-custom">
        <HeaderTop />
        <div className="header__container">
          <HeaderBody />
          <HeaderBottom />
        </div>
      </div>
    </header>
  )
}
