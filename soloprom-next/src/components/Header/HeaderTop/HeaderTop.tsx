'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderMenu from '../HeaderMenu'

import './HeaderTop.scss'
import Link from 'next/link'
import { useProfile } from '@/hooks/useProfile'

import { Loading } from '@/components/ui'
import { UserButton } from '@/features/user/components/UserButton'
import { RootState } from '@/redux/store'
import { changeAuthStatus, setUserData } from '@/redux/slices/authSlice'
import { LocateBlock } from '../Header/LocateBlock'

export const HeaderTop: React.FC = () => {
  const dispatch = useDispatch()
  const { isAuth, userState, isLoading } = useSelector(
    (state: RootState) => state.auth,
  )

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

// 'use client'

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import HeaderMenu from '../HeaderMenu'

// import './HeaderTop.scss'
// import Link from 'next/link'

// import { UserButton } from '@/features/user/components/UserButton'
// import { RootState } from '@/redux/store'
// import { LocateBlock } from '../Header/LocateBlock'

// export const HeaderTop: React.FC = () => {
//   const { isAuth, userState } = useSelector((state: RootState) => state.auth)

//   return (
//     <div className="header-top bg-darkBlue py-2.5 text-white">
//       <div className="header-top__container flex items-center justify-between">
//         <LocateBlock />
//         <div className="flex items-center gap-7">
//           <HeaderMenu />

//           {isAuth && userState ? (
//             <UserButton />
//           ) : (
//             <Link
//               href={'/auth/login'}
//               className="header-top__auth-button -margin-2.5 relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center outline outline-1 outline-accentBlue transition-colors"
//             >
//               <svg className="icon ttall absolute h-5 w-5 fill-white transition-colors">
//                 <use xlinkHref="/img/sprite.svg#lc"></use>
//               </svg>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
