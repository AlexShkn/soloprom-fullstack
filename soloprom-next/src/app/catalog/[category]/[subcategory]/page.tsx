import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'

import pagesDataImport from '@/data/products/pagesData.json'
import PageWrapper from '@/app/PageWrapper'
import { pagesData } from '../page'

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory?: string }
}) {
  const { category, subcategory } = await params

  const subcategoryData = pagesData[category].subcategories?.find(
    (item) => item.url === subcategory,
  )

  if (!subcategoryData) {
    return {
      title: 'Подкатегория не найдена',
      description: 'К сожалению, информация об этой подкатегории отсутствует.',
    }
  }

  const pageTitle = subcategoryData.title
  const pageDescription = subcategoryData.description

  return {
    title: `${pageTitle} | Категория`,
    description: pageDescription || 'Описание категории отсутствует',
    openGraph: {
      title: `${pageTitle} | Категория`,
      description: pageDescription || 'Описание категории отсутствует',
      url: `https://soloprom.ru/catalog/${category}${subcategory ? `/${subcategory}` : ''}`,
      images: [
        {
          url: `https://soloprom.ru/catalog/${category}/${subcategory || category}/category.png`,
          alt: pageTitle || 'Категория',
        },
      ],
    },
    alternates: {
      canonical: `https://soloprom.ru/catalog/${category}${subcategory ? `/${subcategory}` : ''}`,
    },
  }
}

export default async function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const { category, subcategory } = await params

  const subcategoryData = pagesData[category].subcategories?.find(
    (item) => item.url === subcategory,
  )

  if (!subcategoryData) {
    return <h1>Подкатегория не найдена</h1>
  }

  return (
    <PageWrapper>
      <BreadCrumbs
        category={category}
        subcategory={subcategoryData.title}
        name={subcategoryData.crumb}
        url={subcategoryData.url}
      />
      <h1>{subcategoryData.title}</h1>
      <p>{subcategoryData.description}</p>
      <Callback />
    </PageWrapper>
  )
}
