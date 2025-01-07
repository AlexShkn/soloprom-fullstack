import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'
import AuthWrapper from '@/app/AuthWrapper'

export const metadata: Metadata = {
  title: 'Войти в аккаунт',
}

export default function LoginPage() {
  return <LoginForm siteKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string} />
}
