import { RegisterForm } from '@/features/auth/components'

export const metadata = {
  title: 'Регистрация нового пользователя',
  description: 'Регистрация аккаунта нового пользователя soloprom.ru',
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
  alternates: { canonical: 'https://soloprom.ru/auth/register' },
}

export default function RegisterPage() {
  return <RegisterForm />
}
