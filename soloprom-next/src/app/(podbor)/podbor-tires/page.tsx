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
    'Подбор шин для спецтехники по характеристикам. Доставка по всей России.',
  description:
    'Подберите шины для спецтехники по размеру, типу техники, производителю и другим характеристикам. Широкий выбор промышленных шин в интернет-магазине Солопром. Доставка по всей России.',
  openGraph: {
    title: 'Подбор шин для спецтехники по характеристикам | Солопром.ru',
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
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/pordbor-tires`,
  },
}

const CATEGORY_NAME = 'tires'

export default async function PodborTires() {
  const filterMethods = {
    tires: [
      { label: 'По характеристикам', value: 'tiresByCharacteristics' },
      // { label: 'По спецтехнике', value: 'tiresBySpecialEquipment' },
    ],
  }

  const tabsCategories = [
    { label: 'Шины', value: 'tires', icon: '/img/sprite.svg#catalog-tires' },
  ]

  const categoryData = await getProductsAnyCategories('category', 'tires')
  const categoryFilters = categoryData
    ? generateFilterData(categoryData)
    : { brands: [], countries: [], sizes: [], types: [], radiuses: [] }

  const filteredList: FilteredBlockDataList = {
    tires: {
      brands: categoryFilters.brands || [],
      countries: categoryFilters.countries || [],
      sizes: categoryFilters.sizes || [],
      types: categoryFilters.types || [],
      radiuses: categoryFilters.radiuses || [],
    },
  }

  const categoriesData = initialCategoriesData as CategoriesData
  const tiresCategoryData: CategoriesData = { tires: categoriesData.tires }

  return (
    <PageWrapper>
      <BreadCrumbs category={CATEGORY_NAME} name={'Подбор шин и камер'} />
      <h1 className="page-container mb-5 text-2xl font-medium">
        Подбор шин и камер для спецтехники
      </h1>
      <ProductsFilter
        initialFilteredList={filteredList}
        filterMethods={filterMethods}
        initActiveCategory={'tires'}
        tabsCategories={tabsCategories}
        mode={'list'}
      />
      <CategoriesSliders categoriesData={tiresCategoryData} />
      <SubHero />
      <Callback />
    </PageWrapper>
  )
}
