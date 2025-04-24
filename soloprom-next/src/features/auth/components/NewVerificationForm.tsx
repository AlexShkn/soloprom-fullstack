'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

import { Loading } from '@/ui'
import { useVerificationMutation } from '@/hooks/auth/useVerificationMutation'
import { AuthWrapper } from './AuthWrapper'

export function NewVerificationForm() {
  return (
    <AuthWrapper heading="Подтверждение почты">
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <VerificationContent />
      </Suspense>
    </AuthWrapper>
  )
}
function VerificationContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { verification } = useVerificationMutation()

  useEffect(() => {
    if (token) {
      verification(token)
    }
  }, [token, verification])

  return <div></div>
}
