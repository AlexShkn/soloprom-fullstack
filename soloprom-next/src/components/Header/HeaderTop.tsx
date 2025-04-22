'use client'

import React from 'react'

import HeaderMenu from './HeaderMenu'

import Link from 'next/link'

import { Loading } from '@/components/ui'
import { UserButton } from '@/features/user/components/UserButton'
import { LocateBlock } from './LocateBlock'
import { useAuthStore } from '@/store/useAuthStore'

export const HeaderTop: React.FC = () => {
  const { isAuth, userState, isLoading } = useAuthStore()

  return (
    <div className="header-top relative z-20 bg-darkBlue py-1.5 text-white">
      <div className="header-top__container flex items-center justify-between gap-4">
        <LocateBlock />
        <div className="flex items-center gap-2 md:gap-7">
          <HeaderMenu />

          {isAuth && userState && !isLoading ? (
            <UserButton />
          ) : (
            <Link
              href={'/auth/login'}
              className="header-top__auth-button group relative inline-flex items-center justify-center rounded-[50%] text-center transition-colors"
            >
              {!isLoading && !isAuth ? (
                <div className="flex flex-col items-center gap-[1px]">
                  <div className="flex h-[20px] w-[20px] flex-col items-center justify-center rounded-full border border-white bg-white p-1 text-[10px] transition-colors group-hover:border-darkGreenColor">
                    <svg className="icon fill-accentColor h-3 w-3 transition-colors group-hover:fill-darkGreenColor">
                      <use xlinkHref="/img/sprite.svg#lc"></use>
                    </svg>
                  </div>
                  <span className="text-[10px] leading-none transition-colors group-hover:text-darkGreenColor">
                    Войти
                  </span>
                </div>
              ) : (
                <Loading classNames="absolute right-[-5px] h-8 w-8" />
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
