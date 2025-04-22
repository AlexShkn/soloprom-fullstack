'use client'

import { useProfile } from '@/hooks/useProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'

export default function AuthStatusProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoading } = useProfile()

  const { changeAuthStatus, setUserLoading, setUserData } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      setUserLoading(isLoading)

      if (user) {
        setUserData(user)
      }
      changeAuthStatus(!!user)
    }
  }, [user, isLoading, changeAuthStatus, setUserData])

  return <>{children}</>
}
