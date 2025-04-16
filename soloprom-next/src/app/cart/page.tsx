import { Callback } from '@/components/Callback/Callback'
import { Cart } from '@/components/Cart/Cart'
import PageWrapper from '../PageWrapper'
import TransitionWrapper from '@/providers/TransitionWrapper'

export const metadata = {
  title: 'Корзина товаров',
  description: 'Корзина товаров пользователя soloprom.ru',
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
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cart` },
}

export default function CartPage() {
  return (
    <TransitionWrapper>
      <PageWrapper>
        <Cart />
        <Callback />
      </PageWrapper>
    </TransitionWrapper>
  )
}
