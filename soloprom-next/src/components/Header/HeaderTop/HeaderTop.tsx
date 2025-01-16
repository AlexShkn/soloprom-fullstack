'use client'

import React from 'react'

import HeaderMenu from '../HeaderMenu'

import './HeaderTop.scss'
import Link from 'next/link'

import { Loading } from '@/components/ui'
import { UserButton } from '@/features/user/components/UserButton'
import { LocateBlock } from '../Header/LocateBlock'
import { useAuthStore } from '@/zustand/authStore'

export const HeaderTop: React.FC = () => {
  const { isAuth, userState, isLoading } = useAuthStore((state) => state)

  return (
    <div className="header-top bg-darkBlue py-2.5 text-white">
      <div className="header-top__container flex items-center justify-between">
        <LocateBlock />
        <div className="flex items-center gap-7">
          <HeaderMenu />

          {isAuth && userState && isLoading ? (
            <UserButton />
          ) : (
            <Link
              href={'/auth/login'}
              className="header-top__auth-button -margin-2.5 relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center outline outline-1 outline-accentBlue transition-colors"
            >
              {!isLoading ? (
                <Loading classNames="absolute right-[-5px] h-8 w-8" />
              ) : (
                <svg className="icon ttall absolute h-5 w-5 fill-white transition-colors">
                  <use xlinkHref="/img/sprite.svg#lc"></use>
                </svg>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
