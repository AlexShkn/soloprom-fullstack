'use client'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getStateFromLocalStorage } from '@/utils/getCartFromLocalStorage'
import { setCart } from '@/redux/slices/cartSlice'
import { setFavorite } from '@/redux/slices/favoriteSlice'

import { HeaderTop } from '../HeaderTop/HeaderTop'
import HeaderBody from '../HeaderBody/HeaderBody'
import HeaderBottom from '../HeaderBottom/HeaderBottom'

import './Header.scss'

export const Header: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')
      dispatch(setCart(initialCart))
      dispatch(setFavorite(initialFavorite))
    }
  }, [dispatch])
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
