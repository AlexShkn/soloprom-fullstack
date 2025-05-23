import AuthWrapper from '@/app/AuthWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'
import { ProfileDashboard } from '@/features/user/components/ProfileDashboard'
import BreadCrumbs from '@/components/BreadCrumbs'

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
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Реквизиты',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/profile` },
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
