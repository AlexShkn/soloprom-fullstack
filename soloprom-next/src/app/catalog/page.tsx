import { Callback } from '@/components/Callback/Callback'
import { CatalogMain } from '@/components/CatalogMain/CatalogMain'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import PageWrapper from '../PageWrapper'

export const metadata = {
  title: 'Каталог товаров',
  description: 'Каталог товаров soloprom.ru',
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
  alternates: { canonical: 'https://soloprom.ru/catalog' },
}

export default function CatalogPage() {
  return (
    <PageWrapper>
      <BreadCrumbs />
      <CatalogMain />
      <Callback />
    </PageWrapper>
  )
}
