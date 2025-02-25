import { NewVerificationForm } from '@/features/auth/components'

export const metadata = {
  title: 'Сброс парроля пользователя',
  description: 'Сброс парроля аккаунта пользователя soloprom.ru',
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
  alternates: { canonical: 'https://soloprom.ru/auth/reset-password' },
}

export default function NewVerificationPage() {
  return <NewVerificationForm />
}
