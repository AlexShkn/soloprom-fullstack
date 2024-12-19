'use client'
import React from 'react'

import { HeaderTop } from '../HeaderTop/HeaderTop'
import HeaderBody from '../HeaderBody/HeaderBody'
import HeaderBottom from '../HeaderBottom/HeaderBottom'

import './Header.scss'

export const Header: React.FC = () => {
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
