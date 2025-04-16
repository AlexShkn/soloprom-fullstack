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
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Реквизиты',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/favorite` },
}

export default function FavoritePage() {
  return (
    <PageWrapper>
      <Favorite />
      <Callback />
    </PageWrapper>
  )
}
