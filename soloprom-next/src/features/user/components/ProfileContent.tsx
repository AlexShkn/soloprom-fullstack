'use client'
import React from 'react'

import { CardHeader, CardTitle } from '@/components/ui'
import { OrderList } from './OrderList'
import { IUser } from '@/features/auth/types'
import { ProfileEditForm } from './ProfileEditForm'
import { ProfileFavorite } from './ProfileFavorite'
import { ProfileCart } from './ProfileCart'
import { ProfileReviews } from './ProfileReviews'

interface ProfileContentProps {
  tabId: string
  user: IUser
  isLoading: boolean
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  tabId,
  user,
  isLoading,
}) => {
  switch (tabId) {
    case 'profile':
      return (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Настройки профиля</CardTitle>
          </CardHeader>
          <ProfileEditForm user={user} />
        </>
      )
    case 'favorites':
      return (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Отложенные товары</CardTitle>
          </CardHeader>
          <ProfileFavorite />
        </>
      )
    case 'cart':
      return (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Корзина товаров</CardTitle>
          </CardHeader>
          <ProfileCart />
        </>
      )
    case 'orders':
      return (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>История заказов</CardTitle>
          </CardHeader>
          {!isLoading && user && <OrderList user={user} />}
        </>
      )
    case 'reviews':
      return (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ваши отзывы</CardTitle>
          </CardHeader>
          {!isLoading && user && <ProfileReviews user={user} />}
        </>
      )
    default:
      return <div>Выберите раздел</div>
  }
}
