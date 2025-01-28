import { type Metadata } from 'next'

import { ProfileSettingsForm } from '@/features/user/components/ProfileSettingsForm'
import AuthWrapper from '@/app/AuthWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'

export const metadata: Metadata = {
  title: 'Настройки профиля',
}

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <TransitionWrapper>
        <ProfileSettingsForm />
      </TransitionWrapper>
    </AuthWrapper>
  )
}
