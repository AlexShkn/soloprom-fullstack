import Hero from '@/components/Hero'
import {
  CategoriesData,
  CategoriesSliders,
} from '@/components/CategoriesSliders/CategoriesSliders'
import { SubHero } from '@/components/SubHero'
import { About } from '@/components/About/About'
import { Benefits } from '@/components/Benefits'
import { Callback } from '@/components/Callback'
import { PaymentDelivery } from '@/components/PaymentDelivery'
import { ContactsMap } from '@/components/ContactsMap/ContactsMap'
import PageWrapper from './PageWrapper'
import { FavoriteTabs } from '@/components/FavoriteTabs/FavoriteTabs'
import { getPopularProducts, getProductsAnyCategories } from '../api/products'
import {
  CardDataProps,
  FavoriteList,
  FilterData,
  FilteredBlockDataList,
} from '@/types/products.types'
import { ProductsFilter } from '@/components/ProductsFilter/ProductsFilter'
import ForkliftTireComparison from '@/components/Blog/articles/ForkliftTireComparison'
import { generateFilterData } from './catalog/[categoryUrl]/server'
import initialCategoriesData from '@/data/products/categoriesData.json'

export const metadata = {
  title:
    'Солопром - Интернет магазин аккумуляторов, шин и масел для специальной техники в Воронеже. Доставка по всей России.',
  description:
    '🔧 Интернет-магазин спецтехники Солопром: поиск и подбор запчастей по характеристикам и марке техники. ⚒️ Большой выбор промышленных шин, дисков, масел, и аккумуляторов. Узнать стоимость автозапчастей онлайн. Удобная доставка заказа по всей России. Самовывоз из магазина в Воронеже.',
  openGraph: {
    title:
      'Запчасти для специальной и сельскохозяйственной техники Солопром.ru',
    siteName:
      'ООО «Соло» - запчасти для сельскохозяйственной и специальной техники',
    description:
      'Тяговые аккумуляторы, промышленные шины, колесные опоры из наличия и на заказ',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.jpg`,
        alt: 'Главная страница',
      },
    ],
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}` },
}

export default async function Home() {
  const categoriesData = initialCategoriesData as CategoriesData

  const filterMethods = {
    tires: [
      { label: 'По характеристикам', value: 'tiresByCharacteristics' },
      // { label: 'По спецтехнике', value: 'tiresBySpecialEquipment' },
    ],
    battery: [
      { label: 'По характеристикам', value: 'batteryByCharacteristics' },
      { label: 'По технике', value: 'batteryByCar' },
    ],
  }
  const tabsCategories = [
    { label: 'Шины', value: 'tires', icon: '/img/sprite.svg#catalog-tires' },
    {
      label: 'Аккумуляторы',
      value: 'battery',
      icon: '/img/sprite.svg#catalog-battery',
    },
  ]

  const tiresData = await getProductsAnyCategories('category', 'tires')
  const batteryData = await getProductsAnyCategories('category', 'battery')

  const tiresFilters = tiresData
    ? generateFilterData(tiresData)
    : { brands: [], countries: [], sizes: [], types: [], radiuses: [] }
  const batteryFilters = batteryData
    ? generateFilterData(batteryData)
    : {
        brands: [],
        container: [],
        countries: [],
        models: [],
        sizes: [],
        types: [],
        voltage: [],
      }

  const filteredList: FilteredBlockDataList = {
    tires: {
      brands: tiresFilters.brands || [],
      countries: tiresFilters.countries || [],
      sizes: tiresFilters.sizes || [],
      types: tiresFilters.types || [],
      radiuses: tiresFilters.radiuses || [],
    },
    battery: {
      brands: batteryFilters.brands || [],
      container: batteryFilters.container || [],
      plates: batteryFilters.plates || [],
      countries: batteryFilters.countries || [],
      models: batteryFilters.models || [],
      sizes: batteryFilters.sizes || [],
      types: batteryFilters.types || [],
      voltage: batteryFilters.voltage || [],
    },
  }

  const response = await getPopularProducts()

  const popularList: FavoriteList = {
    tires: [],
    battery: [],
    oils: [],
  }
  if (response) {
    popularList.tires = response.filter(
      (product: CardDataProps) => product.categoryName === 'tires',
    )

    popularList.battery = response.filter(
      (product: CardDataProps) => product.categoryName === 'battery',
    )
    popularList.oils = response.filter(
      (product: CardDataProps) => product.categoryName === 'oils',
    )
  }

  return (
    <PageWrapper>
      <Hero />
      <ProductsFilter
        initialFilteredList={filteredList}
        filterMethods={filterMethods}
        initActiveCategory={'tires'}
        tabsCategories={tabsCategories}
        mode={'link'}
      />
      <CategoriesSliders categoriesData={categoriesData} />
      <SubHero />
      {response.length ? <FavoriteTabs initialData={popularList} /> : ''}
      <About />
      <Benefits />
      <Callback />
      <PaymentDelivery level={'h2'} />
      <ContactsMap />
    </PageWrapper>
  )
}
