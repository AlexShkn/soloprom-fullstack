import { SearchPageBlock } from '@/components/Search/SearchPageBlock'
import PageWrapper from '../PageWrapper'

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
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Реквизиты',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru/search' },
}

export default function FavoritePage() {
  return (
    <PageWrapper>
      <SearchPageBlock />
    </PageWrapper>
  )
}
