'use client'
import React, { useEffect, useCallback } from 'react'

import { getStateFromLocalStorage } from '@/utils/localStorage/getStateFromLocalStorage'
import { getCompareLocalStorage } from '@/utils/localStorage/getCompareLocalStorage'

import { HeaderTop } from './HeaderTop'
import HeaderBody from './HeaderBody'

import { useCartStore } from '@/store/useCartStore'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { useCompareStore } from '@/store/useCompareStore'
import { HeaderLinks } from './HeaderLinks'

export const Header: React.FC = () => {
  const { setCart } = useCartStore()
  const { setFavorite } = useFavoriteStore()
  const { setComparedItems } = useCompareStore()

  // Using useCallback to memoize the effect's dependency array
  const initializeState = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')
      const initialCompare = getCompareLocalStorage('comparedItems')

      setComparedItems(initialCompare)
      setCart(initialCart)
      setFavorite(initialFavorite)
    }
  }, [setCart, setFavorite, setComparedItems])

  useEffect(() => {
    initializeState()
  }, [initializeState]) // initializeState is now the stable dependency

  return (
    <header className="header relative w-full bg-darkBlue transition-all">
      <div className="relative z-[31] bg-white shadow-sm">
        <HeaderTop />
        <div className="header__container">
          <HeaderBody />
        </div>
        <HeaderLinks />
      </div>
    </header>
  )
}
