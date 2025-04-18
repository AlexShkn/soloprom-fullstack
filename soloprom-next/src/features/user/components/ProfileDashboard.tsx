'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/useProfile'
import { useLogoutMutation } from '../hooks/useLogoutMutation'
import { useAuthStore } from '@/store/authStore'

import {
  UserCog,
  Heart,
  ShoppingCart,
  ListOrdered,
  LucideIcon,
  LogOut,
  MessagesSquare,
} from 'lucide-react'
import { Loading } from '@/components/ui'
import { ProfileContent } from './ProfileContent'
import { useCompareStore } from '@/store/compareStore'
import { useFavoriteStore } from '@/store/favoriteStore'
import { useCartStore } from '@/store/cartStore'
import { getStateFromLocalStorage } from '@/utils/localStorage/getStateFromLocalStorage'
import { getCompareLocalStorage } from '@/utils/localStorage/getCompareLocalStorage'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
}

const tabs: Tab[] = [
  { id: 'profile', label: 'Профиль', icon: UserCog },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'cart', label: 'Корзина', icon: ShoppingCart },
  { id: 'orders', label: 'Заказы', icon: ListOrdered },
  { id: 'reviews', label: 'Мои отзывы', icon: MessagesSquare },
]

export const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('profile')
  const { user, isLoading } = useProfile()
  const { logout, isLoadingLogout } = useLogoutMutation()
  const { userState, changeAuthStatus } = useAuthStore((state) => state)
  const { setCart } = useCartStore()
  const { setFavorite } = useFavoriteStore()
  const { setComparedItems } = useCompareStore()

  const router = useRouter()

  useEffect(() => {
    if (!user && !isLoading) {
      logout()
      changeAuthStatus(false)
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const initialCart = getStateFromLocalStorage('cart')
      const initialFavorite = getStateFromLocalStorage('favorite')
      const initialCompare = getCompareLocalStorage('comparedItems')
      console.log('set')

      setComparedItems(initialCompare)
      setCart(initialCart)
      setFavorite(initialFavorite)
    }
  }, [])

  if (isLoading) return <Loading classNames="mt-[50px] pt-[50px] pb-[50px]" />
  if (!user) return null

  return (
    <div className="container mx-auto min-h-96 py-10">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar (Tab Buttons) */}
        <div className="min-w-64 max-w-80 rounded-md bg-gray-100 px-1 py-2.5 shadow-custom md:w-64">
          <ul className="divide-y divide-gray-200">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`flex cursor-pointer items-center gap-2 rounded px-4 py-2.5 hover:bg-gray-200 ${
                  activeTab === tab.id
                    ? 'bg-accentBlue font-medium text-white'
                    : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </li>
            ))}
          </ul>
          <button
            onClick={() => logout()}
            className="flex cursor-pointer items-center gap-2 rounded px-4 py-2.5 transition-colors hover:bg-gray-200 hover:text-accentBlue"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 rounded-md bg-white p-6 shadow-custom">
          <ProfileContent tabId={activeTab} user={user} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
