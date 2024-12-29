import { Metadata } from 'next'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { ProductsSlider } from '@/components/ProductsSlider/ProductsSlider'
import pagesDataImport from '@/data/products/pagesData.json'
import { HeroBlock } from '@/components/CategoryPageHero/HeroBlock/HeroBlock'
import { CategoryPageHero } from '@/components/CategoryPageHero/CategoryPageHero'
import { SidePanel } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { GroupList } from '@/components/GroupList/GroupList'
import { PageArticle } from '@/components/PageArticle/PageArticle'

export interface Subcategory {
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb: string
}

export interface Group {
  title: string
  description: string
  headGroupTitle?: string
  img: string
  alt: string
  url: string
  crumb: string
}

export interface Brand {
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb: string
}

export interface CategoryData {
  name: string
  title: string
  description: string
  img: string
  alt: string
  subcategories?: Subcategory[]
  group?: Group[]
  brands?: Brand[]
}

export interface Categories {
  [key: string]: CategoryData
}

export const pagesData = pagesDataImport as Categories

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const { category } = await params
  const categoryData = pagesData[category]

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  return {
    title: `${categoryData.title} Категория`,
    description: categoryData.description || 'Описание категории отсутствует', // Use || for default
    openGraph: {
      title: `${categoryData.title} Категория`,
      description: categoryData.description || 'Описание категории отсутствует',
      url: `https://soloprom.ru/catalog/${category}`,
      images: [
        {
          url: `https://soloprom.ru/catalog/${categoryData.name}/category.png`,
          alt: categoryData.title || 'Категория',
        },
      ],
    },
    alternates: { canonical: `/catalog/${category}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = await params
  const categoryData = pagesData[category]

  if (!categoryData) {
    return (
      <div>
        <h1>Страница не найдена</h1>
      </div>
    )
  }

  return (
    <PageWrapper>
      <BreadCrumbs />
      <HeroBlock>
        <SidePanel categoryData={categoryData} />
        <CategoryPageHero
          categoryTitle={categoryData.title}
          categoryImage={categoryData.img}
          categoryAlt={categoryData.alt}
        />
      </HeroBlock>
      <GroupList categoryName={categoryData.name} />
      <ProductsSlider
        title={'Популярные товары'}
        categoryName={categoryData.name}
      />
      <ProductsSlider
        title={'Похожие товары'}
        categoryName={categoryData.name}
      />
      <PageArticle articleName={categoryData.name} />
      <Callback />
    </PageWrapper>
  )
}
