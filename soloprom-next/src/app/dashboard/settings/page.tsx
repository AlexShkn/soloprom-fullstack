import { type Metadata } from 'next'

import { SettingsForm } from '@/features/user/components/SettingsForm'
import AuthWrapper from '@/app/AuthWrapper'
import { CallbackPanel } from '@/components/ui/CallbackPanel/CallbackPanel'

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
