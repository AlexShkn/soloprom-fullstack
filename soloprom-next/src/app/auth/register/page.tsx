import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'
import AuthWrapper from '@/app/products/[productId]/AuthWrapper'

export const metadata: Metadata = {
  title: 'Создать аккаунт',
}

export default function RegisterPage() {
  return <RegisterForm />
}
