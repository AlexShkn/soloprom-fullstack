'use client'

import { LuLogOut, LuMenu } from 'react-icons/lu'
import Link from 'next/link'

import { useAuthStore } from '@/store/useAuthStore'

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

export function UserButton() {
  const { logout, isLoadingLogout } = useLogoutMutation()

  const { userState, changeAuthStatus } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  if (!userState) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Link
          href={'/auth/login'}
          className={`header-top__auth-button -margin-2.5 group relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 text-center outline outline-1 outline-accentBlue transition-colors hover:bg-white`}
        >
          <Avatar>
            <AvatarImage src={userState.picture} />
            <AvatarFallback>{userState.displayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white" align="end">
        <Link
          href={'/profile'}
          className="flex items-center px-2 py-1.5 transition-colors hover:text-accentBlue"
        >
          <LuMenu className="mr-2 size-4" />
          Кабинет
        </Link>
        <DropdownMenuItem
          className="cursor-pointer px-2 py-1.5"
          disabled={isLoadingLogout}
          onClick={handleLogout}
        >
          <span className="flex items-center transition-colors hover:text-accentBlue">
            <LuLogOut className="mr-2 size-4" />
            Выйти
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserButtonLoading() {
  return <Skeleton className="h-10 w-10 rounded-full" />
}
