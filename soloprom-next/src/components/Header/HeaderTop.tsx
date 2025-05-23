'use client'

import React from 'react'

import HeaderMenu from './HeaderMenu'

import Link from 'next/link'

import { Loading } from '@/components/ui'
import { UserButton } from '@/features/user/components/UserButton'
import { LocateBlock } from './Locate/LocateBlock'
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
                    <svg
                      className="icon fill-accentColor h-3 w-3 transition-colors group-hover:fill-darkGreenColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 6.3499999 6.3500002"
                    >
                      <g id="layer1" transform="translate(0 -290.65)">
                        <path
                          id="circle2843"
                          d="m3.1321086 290.90437c-.9238127 0-1.6800008.75619-1.6800008 1.68 0 .5649.2838452 1.06511.714685 1.36943-1.0028623.402-1.71462423 1.38278-1.71462404 2.52697a.26464842.26464842 0 0 0 .52916664 0c-.0000002-1.21445.9792098-2.19315 2.1936648-2.19315 1.2144547 0 2.1931479.9787 2.1931477 2.19315a.2648417.2648417 0 0 0 .5296834 0c.0000002-1.16586-.7395261-2.1611-1.7725015-2.54816.4140187-.30607.6841958-.79604.6841958-1.34824 0-.92381-.7536042-1.68-1.677417-1.68zm0 .52968c.63783 0 1.1482504.51249 1.1482504 1.15032s-.5104204 1.14825-1.1482504 1.14825c-.6378298 0-1.1503174-.51042-1.1503174-1.14825.0000001-.63783.5124876-1.15032 1.1503174-1.15032z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <span className="text-[10px] leading-none transition-colors group-hover:text-darkGreenColor">
                    Войти
                  </span>
                </div>
              ) : (
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-transparent">
                  <Loading classNames="text-accentBlue" spinClasses="h-6 w-6" />
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
