import { type Metadata } from 'next'

import { SettingsForm } from '@/features/user/components/SettingsForm'
import PageWrapper from '@/app/PageWrapper'
import ClientProvider from '@/providers/ClientProvider'
import AuthWrapper from '@/app/AuthWrapper'

export const metadata: Metadata = {
  title: 'Настройки профиля',
}

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <SettingsForm />
    </AuthWrapper>
  )
}
