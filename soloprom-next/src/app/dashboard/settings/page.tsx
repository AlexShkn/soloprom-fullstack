import { type Metadata } from 'next'

import { ProfileSettingsForm } from '@/features/user/components/ProfileSettingsForm'
import AuthWrapper from '@/app/products/[productId]/AuthWrapper'

export const metadata: Metadata = {
  title: 'Настройки профиля',
}

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <ProfileSettingsForm />
    </AuthWrapper>
  )
}
