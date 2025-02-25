import { Callback } from '@/components/Callback/Callback'
import { Favorite } from '@/components/Favorite/Favorite'
import PageWrapper from '../PageWrapper'

export const metadata = {
  title: 'Избранные товары',
  description: 'Избранные товары пользователя soloprom.ru',
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
  alternates: { canonical: 'https://soloprom.ru/auth/favorite' },
}

export default function FavoritePage() {
  return (
    <PageWrapper>
      <Favorite />
      <Callback />
    </PageWrapper>
  )
}
