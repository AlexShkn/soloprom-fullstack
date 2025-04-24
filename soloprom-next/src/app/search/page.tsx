import PageWrapper from '../PageWrapper'
import { Loading } from '@/ui'
import { SearchPageBlock } from '@/features/search/components/SearchPageBlock'
import React, { Suspense } from 'react'

export const metadata = {
  title: 'Поиск товаров',
  description: 'Поиск по каталогу товаров soloprom.ru',
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
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/search` },
}

export default function FavoritePage() {
  return (
    <PageWrapper>
      <Suspense fallback={<Loading />}>
        <SearchPageBlock />
      </Suspense>
    </PageWrapper>
  )
}
