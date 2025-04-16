import { Suspense } from 'react'
import { NewPasswordForm } from '@/features/auth/components'

export const metadata = {
  title: 'Новый пароль для пользователя',
  description: 'Подтверждение нового пароля аккаунта пользователя soloprom.ru',
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
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/new-password`,
  },
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <NewPasswordForm />
    </Suspense>
  )
}
