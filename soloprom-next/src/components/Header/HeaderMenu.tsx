'use client'

import React, { useState, useRef } from 'react'

import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'

const menuList = [
  { title: 'Оплата и Доставка', href: '/payment-delivery' },
  { title: 'Реквизиты', href: '/requisites' },
  { title: 'О магазине', href: '/#about' },
  { title: 'Контакты', href: '/#contacts' },
]

const HeaderMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const menuRef = useRef(null)

  useClickOutside(menuRef, () => {
    setIsOpenMenu(false)
  })
  return (
    <nav ref={menuRef} className="header-top__menu relative">
      <div
        onClick={() => setIsOpenMenu((prev) => !prev)}
        className="header-top__menu-drop hidden"
      >
        Еще
        <svg className="icon ml-1 h-4 w-4 fill-white">
          <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
        </svg>
      </div>
      <ul
        className={`header-top__menu-list flex items-center justify-center gap-4 ${isOpenMenu && 'show'}`}
      >
        {menuList.map((link, index) => (
          <li key={index} className="header-top__menu-item whitespace-nowrap">
            <Link href={link.href} className="link-hover header-top__menu-link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderMenu
