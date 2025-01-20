import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'
import AuthWrapper from '@/app/products/[productId]/AuthWrapper'

export const metadata: Metadata = {
  title: 'Войти в аккаунт',
}

export default function LoginPage() {
  return <LoginForm />
}
