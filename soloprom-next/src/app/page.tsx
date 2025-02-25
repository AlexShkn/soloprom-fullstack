import Hero from '@/components/Hero/Hero'
import { CategoryProductsSlider } from '@/components/CategoryProductsSlider/CategoryProductsSlider'
import { SubHero } from '@/components/SubHero/SubHero'
import { About } from '@/components/About/About'
import { Benefits } from '@/components/Benefits/Benefits'
import { Callback } from '@/components/Callback/Callback'
import { PaymentDelivery } from '@/components/PaymentDelivery/PaymentDelivery'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import PageWrapper from './PageWrapper'
import { FavoriteTabs } from '@/components/FavoriteTabs/FavoriteTabs'
import { getPopularProducts } from '@/utils/api/products'
import { cardDataProps, FavoriteList } from '@/types/products.types'
import TransitionWrapper from '@/providers/TransitionWrapper'

export const metadata = {
  title: 'Аккумуляторы, шины и масла для специальной техники',
  description:
    'Запчасти для погрузчиков, экскаваторов и другой специальной техники. Аккумуляторы и шины, колеса и колесные опоры. Toyota, Komatsu, Jungheinrich и др. Доставка по всей России. Опт и розница',
  openGraph: {
    title: 'Запчасти для специальной и сельскохозяйственной техники',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: 'https://soloprom.ru/preview.jpg',
        alt: 'Главная страница',
      },
    ],
    url: 'https://soloprom.ru',
  },
  alternates: { canonical: 'https://soloprom.ru' },
}

export default async function Home() {
  const response = await getPopularProducts()

  const formattedProducts: FavoriteList = {
    tires: response.filter(
      (product: cardDataProps) => product.categoryName === 'tires',
    ),
    battery: response.filter(
      (product: cardDataProps) => product.categoryName === 'battery',
    ),
    oils: response.filter(
      (product: cardDataProps) => product.categoryName === 'oils',
    ),
  }
  return (
    <TransitionWrapper>
      <PageWrapper>
        <Hero />
        <SubHero />
        <CategoryProductsSlider />
        <FavoriteTabs initialData={formattedProducts} />
        <About />
        <Benefits />
        <Callback />
        <PaymentDelivery level={'h2'} />
        <ContactsMap />
      </PageWrapper>
    </TransitionWrapper>
  )
}
