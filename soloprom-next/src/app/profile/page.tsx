import AuthWrapper from '@/app/AuthWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'
import { ProfileDashboard } from '@/features/user/components/ProfileDashboard'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'

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
  alternates: { canonical: 'https://soloprom.ru/profile' },
}

export default function ProfilePage() {
  return (
    <AuthWrapper>
      <TransitionWrapper>
        <BreadCrumbs />
        <ProfileDashboard />
      </TransitionWrapper>
    </AuthWrapper>
  )
}
