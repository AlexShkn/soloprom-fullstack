import { Metadata } from 'next'
import { findPagesData, generateFilterData, pagesData } from '../server'
import {
  fetchProducts,
  getProductsAnyCategories,
  getTotalProductCount,
} from '@/utils/api/products'
import { redirect } from 'next/navigation'
import { FilterData } from '@/types/products.types'
import CategoryPageClient from '../CategoryPageClient'

export type Params = {
  pageUrl: string
  page: string
}

export type ParamsPromise = Promise<Params>

interface CatalogPageProps {
  params: ParamsPromise
}

export async function generateStaticParams() {
  const params: Params[] = []
  const limit = 10 // Количество товаров на странице

  for (const pageItem in pagesData) {
    const pageData = pagesData[pageItem]

    const pageUrl =
      pageData.pageType === 'model' && pageData.subUrl
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
        // Начинаем со 2 страницы
        params.push({ pageUrl, page: currentPage.toString() })
      }
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { pageUrl, page } = await params
  const categoryData = pagesData[pageUrl]

  const currentPage = parseInt(page || '1', 10)

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  const title = `${categoryData.title} - Страница ${currentPage}`

  const description = `${categoryData.description} - Страница ${currentPage}`

  const canonicalUrl = `/catalog/${pageUrl}/${currentPage}`

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://soloprom.ru${canonicalUrl}`,
      images: [
        {
          url: `https://soloprom.ru/catalog/${categoryData.name}/category.png`,
          alt: categoryData.title || 'Категория',
        },
      ],
    },
    alternates: { canonical: canonicalUrl },
  }
}

const CatalogPaginationPage: React.FC<CatalogPageProps> = async ({
  params,
}) => {
  const { pageUrl, page } = await params
  const pageData = await findPagesData(pageUrl)
  const currentPage = parseInt(page || '1', 10)

  if (currentPage === 1) {
    redirect(`/catalog/${pageUrl}`)
  }

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const initialProducts = await fetchProducts({
    categoryName: pageData.subUrl ? pageData.subUrl : pageData.name,
    page: currentPage,
    limit: 12,
  })

  const interUrl =
    pageData.pageType === 'model' && pageData.subUrl
      ? pageData.subUrl
      : pageData.url

  const categoryData = await getProductsAnyCategories(
    pageData.pageType,
    interUrl,
  )

  if (!initialProducts) {
    return <div>Ошибка получения списка продуктов страницы</div>
  }

  if (!categoryData) {
    console.log('Ошибка получения продуктов категории')
  }

  const filterData: FilterData = generateFilterData(categoryData)

  return (
    <CategoryPageClient
      pageData={pageData}
      currentPage={currentPage}
      initialProducts={initialProducts.products}
      totalCount={initialProducts.totalCount}
      categoryData={filterData}
    />
  )
}

export default CatalogPaginationPage
