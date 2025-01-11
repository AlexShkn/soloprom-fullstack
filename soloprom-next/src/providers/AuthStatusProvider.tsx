'use client'

import { useProfile } from '@/hooks/useProfile'
import { changeAuthStatus, setUserData } from '@/redux/slices/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function AuthStatusProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()

  const { user, isLoading } = useProfile()

  useEffect(() => {
    if (!isLoading) {
      dispatch(changeAuthStatus(!!user))
      dispatch(setUserData(user))
    }
  }, [user, isLoading])

  return <>{children}</>
}
