import { ProfileSettingsForm } from '@/features/user/components/ProfileSettingsForm'
import AuthWrapper from '@/app/AuthWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'

export const metadata = {
  title: 'Профиль пользователя',
  description: 'Профиль пользователя soloprom.ru',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Реквизиты',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru/dashboard/settings' },
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
