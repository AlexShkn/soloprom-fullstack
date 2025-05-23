const fs = require('fs')

import { Metadata } from 'next'
import CategoryPageClient from './CategoryPageClient'
import { findPagesData, generateFilterData, pagesData } from './server'
import { fetchProducts, getProductsAnyCategories } from '../../../api/products'
import { FilterData } from '@/types/products.types'
const IS_PROD = process.env.NEXT_PUBLIC_CLIENT_URL === 'production'

export type Params = {
  categoryUrl: string
}
export type ParamsPromise = Promise<Params>

interface CatalogPageProps {
  params: ParamsPromise
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { categoryUrl } = await params

  const categoryData = pagesData[categoryUrl]

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  const title = `${categoryData.title}`

  const description = `${categoryData.description}`

  const canonicalUrl = `/catalog/${categoryUrl}`

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${canonicalUrl}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/catalog/${categoryData.name}/category.png`,
          alt: categoryData.title || 'Категория',
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}${canonicalUrl}`,
    },
  }
}

export async function generateStaticParams() {
  const params: Params[] = []
  const pagesList = []

  for (const page in pagesData) {
    const pageData = pagesData[page]

    const categoryUrl =
      (pageData.pageType === 'model' || pageData.pageType === 'brands') &&
      pageData.subUrl
        ? pageData.subUrl
        : page

    if (
      pageData.pageType === 'category' ||
      pageData.pageType === 'subcategory' ||
      pageData.pageType === 'group' ||
      pageData.pageType === 'brands' ||
      pageData.pageType === 'model'
    ) {
      params.push({ categoryUrl })
    }

    // if (IS_PROD) {
    pagesList.push(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/catalog/${pageData.url}`,
    )
    // }
  }

  // if (IS_PROD) {
  fs.writeFileSync('public/catalog.json', JSON.stringify(pagesList, null, 2))
  // }

  return params
}

const CatalogPage: React.FC<CatalogPageProps> = async ({ params }) => {
  const { categoryUrl } = await params

  console.log(categoryUrl)

  const pageData = await findPagesData(categoryUrl)

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const currentPage = 1

  const initialCatalogData = await fetchProducts({
    categoryName: pageData.subUrl ?? pageData.name,
    page: currentPage,
    limit: 12,
  })

  const interUrl =
    (pageData.pageType === 'model' || pageData.pageType === 'brands') &&
    pageData.subUrl
      ? pageData.subUrl
      : pageData.url

  console.log(interUrl)

  const categoryData = await getProductsAnyCategories(
    pageData.pageType,
    interUrl,
  )

  if (!initialCatalogData) {
    return <div>Ошибка получения списка продуктов страницы</div>
  }

  const filterData: FilterData = generateFilterData(categoryData)

  return (
    <CategoryPageClient
      fullData={initialCatalogData}
      pageData={pageData}
      categoryData={filterData}
    />
  )
}

export default CatalogPage
