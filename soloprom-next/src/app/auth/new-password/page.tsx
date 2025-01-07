import type { Metadata } from 'next'

import { NewPasswordForm } from '@/features/auth/components'
import AuthWrapper from '@/app/AuthWrapper'

export const metadata: Metadata = {
  title: 'Новый пароль',
}

export default function NewPasswordPage() {
  return (
    <NewPasswordForm
      siteKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
    />
  )
}
