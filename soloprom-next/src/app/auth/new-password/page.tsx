import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NewPasswordForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Новый пароль',
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <NewPasswordForm />
    </Suspense>
  )
}
