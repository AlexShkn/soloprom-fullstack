'use client'
import React, { useEffect, useCallback, useState } from 'react'

import { getStateFromLocalStorage } from '@/utils/localStorage/getStateFromLocalStorage'
import { getCompareLocalStorage } from '@/utils/localStorage/getCompareLocalStorage'

import { HeaderTop } from './HeaderTop'
import HeaderBody from './HeaderBody'

import { CartProductTypes, useCartStore } from '@/store/useCartStore'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { CompareState, useCompareStore } from '@/store/useCompareStore'
import { HeaderLinks } from './HeaderLinks'
import { ProductsArrays } from '@/supports/adaptiveDto'

export const Header: React.FC = () => {
  const { setCart } = useCartStore()
  const { setFavorite } = useFavoriteStore()
  const { setComparedItems } = useCompareStore()

  const [initialCart, setInitialCart] = useState<CartProductTypes[]>([])
  const [initialFavorite, setInitialFavorite] = useState<CartProductTypes[]>([])
  const [initialCompare, setInitialCompare] =
    useState<CompareState['comparedItems']>(ProductsArrays)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setInitialCart(getStateFromLocalStorage('cart'))
      setInitialFavorite(getStateFromLocalStorage('favorite'))
      setInitialCompare(getCompareLocalStorage('comparedItems'))
    }
  }, [])

  useEffect(() => {
    setCart(initialCart)
    setFavorite(initialFavorite)
    setComparedItems(initialCompare)
  }, [
    initialCart,
    initialFavorite,
    initialCompare,
    setCart,
    setFavorite,
    setComparedItems,
  ])

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
