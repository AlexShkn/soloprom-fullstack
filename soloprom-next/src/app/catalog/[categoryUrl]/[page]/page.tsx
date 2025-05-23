const fs = require('fs')

import { Metadata } from 'next'
import { findPagesData, generateFilterData, pagesData } from '../server'
import {
  fetchProducts,
  getProductsAnyCategories,
  getTotalProductCount,
} from '../../../../api/products'
import { redirect } from 'next/navigation'
import { FilterData } from '@/types/products.types'
import CategoryPageClient from '../CategoryPageClient'

export type Params = {
  categoryUrl: string
  page: string
  categoryName: string
}

export type ParamsPromise = Promise<Params>

interface CatalogPageProps {
  params: ParamsPromise
}

const BASE_URI = process.env.NEXT_PUBLIC_CLIENT_URL as string
const IS_PROD = process.env.NEXT_PUBLIC_CLIENT_URL === 'production'

const limit = 12 // Количество товаров на странице

export async function generateStaticParams() {
  const params: Params[] = []
  const pagesList = []

  for (const pageItem in pagesData) {
    const pageData = pagesData[pageItem]

    const categoryUrl =
      (pageData.pageType === 'model' || pageData.pageType === 'brands') &&
      pageData.subUrl
        ? pageData.subUrl
        : pageItem

    if (
      pageData.pageType === 'category' ||
      pageData.pageType === 'subcategory' ||
      pageData.pageType === 'group' ||
      pageData.pageType === 'brands' ||
      pageData.pageType === 'model'
    ) {
      const totalCount = await getTotalProductCount(pageData.name)

      const totalPages = Math.ceil(totalCount / limit)

      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        // if (IS_PROD) {
        pagesList.push(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/catalog/${pageData.url}/${currentPage}`,
        )
        // }

        // Начинаем со 2 страницы
        const param = {
          categoryUrl,
          page: currentPage.toString(),
          categoryName: pageData.name,
        }
        params.push(param)
      }
    }
  }

  // if (IS_PROD) {
  fs.writeFileSync(
    'public/catalog-pagination.json',
    JSON.stringify(pagesList, null, 2),
  )
  // }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { categoryUrl, page, categoryName } = await params
  const categoryData = pagesData[categoryUrl]

  const currentPage = parseInt(page || '1', 10)

  const totalCount = await getTotalProductCount(categoryName)
  const totalPages = Math.ceil(totalCount / limit)

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  const title = `${categoryData.title} - Страница ${currentPage}`

  const description = `${categoryData.description} - Страница ${currentPage}`

  const canonicalUrl = `/catalog/${categoryUrl}/${currentPage}`

  const prevPage =
    currentPage > 1 ? `/catalog/${categoryUrl}/${currentPage - 1}` : undefined
  const nextPage =
    currentPage < totalPages
      ? `/catalog/${categoryUrl}/${currentPage + 1}`
      : undefined

  const alternates: {
    canonical: string
    prev?: { url: string; relativeUrl: boolean }
    next?: { url: string; relativeUrl: boolean }
  } = {
    canonical: canonicalUrl,
  }

  if (prevPage) {
    alternates.prev = {
      url: prevPage,
      relativeUrl: true,
    }
  }

  if (nextPage) {
    alternates.next = {
      url: nextPage,
      relativeUrl: true,
    }
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${BASE_URI}${canonicalUrl}`,
      images: [
        {
          url: `${BASE_URI}/catalog/${categoryData.name}/category.png`,
          alt: categoryData.title || 'Категория',
        },
      ],
    },
    alternates: alternates,
    metadataBase: new URL(BASE_URI),
  }
}

const CatalogPaginationPage: React.FC<CatalogPageProps> = async ({
  params,
}) => {
  const { categoryUrl, page } = await params
  const pageData = await findPagesData(categoryUrl)

  let currentPage = 1

  if (page && /^\d+$/.test(page)) {
    currentPage = parseInt(page, 10)
  }

  if (currentPage === 1) {
    redirect(`/catalog/${categoryUrl}`)
  }

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const initialCatalogData = await fetchProducts({
    categoryName: pageData.subUrl ?? pageData.name,
    page: currentPage,
    limit: limit,
  })

  const interUrl =
    (pageData.pageType === 'model' || pageData.pageType === 'brands') &&
    pageData.subUrl
      ? pageData.subUrl
      : pageData.url

  const categoryData = await getProductsAnyCategories(
    pageData.pageType,
    interUrl,
  )

  if (!initialCatalogData) {
    return <div>Ошибка получения списка продуктов страницы</div>
  }

  if (!categoryData) {
    console.log('Ошибка получения продуктов категории')
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

export default CatalogPaginationPage
