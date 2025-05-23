import { Callback } from '@/components/Callback'
import { CatalogMain } from '@/components/CatalogMain'
import BreadCrumbs from '@/components/BreadCrumbs'
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
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Реквизиты',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/catalog` },
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
