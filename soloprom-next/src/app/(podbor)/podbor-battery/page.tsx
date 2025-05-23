import {
  CategoriesData,
  CategoriesSliders,
} from '@/components/CategoriesSliders/CategoriesSliders'
import { SubHero } from '@/components/SubHero'
import { Callback } from '@/components/Callback'
import { FilteredBlockDataList } from '@/types/products.types'
import { ProductsFilter } from '@/components/ProductsFilter/ProductsFilter'
import { getProductsAnyCategories } from '@/api/products'
import { generateFilterData } from '@/app/catalog/[categoryUrl]/server'
import PageWrapper from '@/app/PageWrapper'
import initialCategoriesData from '@/data/products/categoriesData.json'
import BreadCrumbs from '@/components/BreadCrumbs'

export const metadata = {
  title:
    'Подбор тяговых аккумуляторов для спецтехники по характеристикам. Доставка по всей России.',
  description:
    'Подберите аккумуляторы для спецтехники по размеру, типу техники, производителю и другим характеристикам. Широкий выбор промышленных шин в интернет-магазине Солопром. Доставка по всей России.',
  openGraph: {
    title: 'Подбор акб для спецтехники по характеристикам | Солопром.ru',
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
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/pordbor-battery`,
  },
}

export default async function PodborBattery() {
  const filterMethods = {
    battery: [
      { label: 'По характеристикам', value: 'batteryByCharacteristics' },
      { label: 'По технике', value: 'batteryByCar' },
    ],
  }

  const tabsCategories = [
    {
      label: 'Аккумуляторы',
      value: 'battery',
      icon: '/img/sprite.svg#catalog-battery',
    },
  ]

  const CATEGORY_NAME = 'battery'

  const categoryData = await getProductsAnyCategories('category', CATEGORY_NAME)
  const categoryFilters = categoryData
    ? generateFilterData(categoryData)
    : { brands: [], countries: [], sizes: [], types: [], radiuses: [] }

  const filteredList: FilteredBlockDataList = {
    battery: {
      brands: categoryFilters.brands || [],
      container: categoryFilters.container || [],
      plates: categoryFilters.plates || [],
      countries: categoryFilters.countries || [],
      models: categoryFilters.models || [],
      sizes: categoryFilters.sizes || [],
      types: categoryFilters.types || [],
      voltage: categoryFilters.voltage || [],
    },
  }

  const categoriesData = initialCategoriesData as CategoriesData
  const tiresCategoryData: CategoriesData = { tires: categoriesData.tires }

  return (
    <PageWrapper>
      <BreadCrumbs category={CATEGORY_NAME} name={'Подбор аккумуляторов'} />
      <h1 className="page-container mb-5 text-2xl font-medium">
        Подбор аккумуляторов для спецтехники
      </h1>
      <ProductsFilter
        initialFilteredList={filteredList}
        filterMethods={filterMethods}
        initActiveCategory={CATEGORY_NAME}
        tabsCategories={tabsCategories}
        mode={'list'}
      />
      <CategoriesSliders categoriesData={tiresCategoryData} />
      <SubHero />
      <Callback />
    </PageWrapper>
  )
}
