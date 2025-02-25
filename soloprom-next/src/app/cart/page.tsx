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
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Реквизиты',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru/cart' },
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
