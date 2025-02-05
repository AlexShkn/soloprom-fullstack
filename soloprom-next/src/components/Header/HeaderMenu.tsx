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
    <nav ref={menuRef} className="header-top__menu mds:relative">
      <div
        onClick={() => setIsOpenMenu((prev) => !prev)}
        className="-m-1 inline-flex items-center p-1 sm:hidden"
      >
        Еще
        <svg className="icon ml-1 h-4 w-4 fill-white">
          <use xlinkHref="/img/sprite-default.svg#arrow-drop"></use>
        </svg>
      </div>
      <ul
        className={`header-top__menu-list mds:w-auto mds:top-[23px] invisible absolute left-0 top-12 z-10 flex w-screen min-w-36 flex-col items-center justify-center bg-white px-2.5 text-black opacity-0 shadow-custom transition-all sm:visible sm:static sm:flex-row sm:gap-4 sm:rounded sm:bg-transparent sm:text-white sm:opacity-100 sm:shadow-none ${isOpenMenu && 'showing'}`}
      >
        {menuList.map((link, index) => (
          <li key={index} className="w-full whitespace-nowrap sm:w-auto">
            <Link
              href={link.href}
              className="link-hover inline-block w-full py-2.5 text-center text-lg sm:w-auto sm:p-0 sm:text-left sm:text-sm md:text-base"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderMenu
