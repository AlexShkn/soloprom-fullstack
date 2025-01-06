import type { Metadata } from 'next'

import { NewPasswordForm } from '@/features/auth/components'

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
