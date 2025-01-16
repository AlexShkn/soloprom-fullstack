'use client'

import { useProfile } from '@/hooks/useProfile'
import { useAuthStore } from '@/zustand/authStore'
import { useEffect } from 'react'

export default function AuthStatusProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useProfile()

  const { changeAuthStatus, setUserData } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      changeAuthStatus(!!user)
      if (user) {
        setUserData(user)
      }
    }
  }, [user, isLoading, changeAuthStatus, setUserData])

  return <>{children}</>
}
