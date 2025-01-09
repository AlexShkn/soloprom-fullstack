// src/features/user/components/UserButton.tsx
'use client'
import { useEffect, useState } from 'react'

import { LuLogOut, LuMenu } from 'react-icons/lu'
import { IUser } from '@/features/auth/types'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

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

interface UserButtonProps {
  user: IUser
  isLoading?: boolean
}

export function UserButton({ user, isLoading }: UserButtonProps) {
  const dispatch = useDispatch()
  const { logout, isLoadingLogout } = useLogoutMutation()

  const handleLogout = () => {
    logout()
    dispatch(changeAuthStatus(false))
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Link
          href={'/auth/login'}
          className={`header-top__auth-button -margin-2.5 relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] p-2.5 text-center outline outline-1 outline-accentBlue transition-colors`}
        >
          {isLoading ? (
            <Loading classNames="absolute right-[-5px] h-8 w-8" />
          ) : (
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.displayName.slice(0, 1)}</AvatarFallback>
            </Avatar>
          )}
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white" align="end">
        <DropdownMenuItem className="link-hover cursor-pointer">
          <LuMenu className="mr-2 size-4" />
          <Link href={'/dashboard/settings'}>Кабинет</Link>
        </DropdownMenuItem>
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
