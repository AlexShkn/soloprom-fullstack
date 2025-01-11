import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'
import AuthWrapper from '@/app/AuthWrapper'

export const metadata: Metadata = {
  title: 'Создать аккаунт',
}

export default function RegisterPage() {
  return <RegisterForm />
}
