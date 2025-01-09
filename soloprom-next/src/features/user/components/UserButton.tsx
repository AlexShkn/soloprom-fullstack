// src/features/user/components/UserButton.tsx
'use client'
import { useEffect, useState } from 'react'

import { LuLogOut, LuMenu } from 'react-icons/lu'
import { IUser } from '@/features/auth/types'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import { changeAuthStatus } from '@/redux/slices/authSlice'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Loading,
  Skeleton,
} from '@/components/ui'

import { useLogoutMutation } from '../hooks'
import { RootState } from '@/redux/store'

export function UserButton() {
  const dispatch = useDispatch()
  const { logout, isLoadingLogout } = useLogoutMutation()
  const { userState } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    logout()
    dispatch(changeAuthStatus(false))
  }

  if (!userState) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Link
          href={'/auth/login'}
          className={`header-top__auth-button -margin-2.5 relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] p-2.5 text-center outline outline-1 outline-accentBlue transition-colors`}
        >
          <Avatar>
            <AvatarImage src={userState.picture} />
            <AvatarFallback>{userState.displayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white" align="end">
        <Link
          href={'/dashboard/settings'}
          className="link-hover flex items-center px-2 py-1.5"
        >
          <LuMenu className="mr-2 size-4" />
          Кабинет
        </Link>
        <DropdownMenuItem
          className="link-hover cursor-pointer"
          disabled={isLoadingLogout}
          onClick={handleLogout}
        >
          <LuLogOut className="mr-2 size-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserButtonLoading() {
  return <Skeleton className="h-10 w-10 rounded-full" />
}
