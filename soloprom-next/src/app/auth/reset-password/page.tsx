import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/features/auth/components'
import AuthWrapper from '@/app/AuthWrapper'

export const metadata: Metadata = {
  title: 'Сброс пароля',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
