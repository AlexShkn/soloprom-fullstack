'use client'
import React, { useEffect } from 'react'

import { getStateFromLocalStorage } from '@/utils/localStorage/getStateFromLocalStorage'

import { HeaderTop } from './HeaderTop'
import HeaderBody from './HeaderBody'
import HeaderBottom from './HeaderBottom/HeaderBottom'

import { useCartStore } from '@/store/cartStore'
import { useFavoriteStore } from '@/store/favoriteStore'
import { useCompareStore } from '@/store/compareStore'
import { getCompareLocalStorage } from '@/utils/localStorage/getCompareLocalStorage'

export const Header: React.FC = () => {
  const { setCart } = useCartStore()
  const { setFavorite } = useFavoriteStore()
  const { setComparedItems } = useCompareStore()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')
      const initialCompare = getCompareLocalStorage('comparedItems')
      console.log('set')

      setComparedItems(initialCompare)
      setCart(initialCart)
      setFavorite(initialFavorite)
    }
  }, [])

  return (
    <header className="header relative w-full bg-white transition-all">
      <div className="relative z-[31] bg-white pb-7 shadow-custom">
        <HeaderTop />
        <div className="header__container">
          <HeaderBody />
          <HeaderBottom />
        </div>
      </div>
    </header>
  )
}
