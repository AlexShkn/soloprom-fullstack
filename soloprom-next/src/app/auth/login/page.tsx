import { LoginForm } from '@/features/auth/components'

export const metadata = {
  title: 'Войти в аккаунт',
  description: 'Авториазция пользователя ',
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
  alternates: { canonical: 'https://soloprom.ru/auth/login' },
}

export default function LoginPage() {
  return <LoginForm />
}
