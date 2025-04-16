import { ResetPasswordForm } from '@/features/auth/components'

export const metadata = {
  title: 'Сброс пароля аккаунта',
  description: 'Сброс пароля пользователя ',
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
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/reset-password`,
  },
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
