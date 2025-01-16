import { Metadata } from 'next'
import CategoryPageClient from '../CategoryPageClient'
import { findPagesData, pagesData } from '../server'
import {
  fetchProducts,
  getProductsAnyCategories,
  getTotalProductCount,
} from '@/utils/api/products'

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

  for (const pageUrl in pagesData) {
    const pageData = pagesData[pageUrl]

    if (
      pageData.pageType === 'category' ||
      pageData.pageType === 'subcategory' ||
      pageData.pageType === 'group' ||
      pageData.pageType === 'brands'
    ) {
      const totalCount = await getTotalProductCount(pageData.name)
      const totalPages = Math.ceil(totalCount / limit)

      for (let page = 1; page <= totalPages; page++) {
        params.push({ pageUrl, page: page.toString() })
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

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const currentPage = parseInt(page || '1', 10) // Вычисляем номер страницы из URL

  const initialProducts = await fetchProducts({
    categoryName: pageData.name,
    page: currentPage,
    limit: 10,
  })

  const categoryData = await getProductsAnyCategories(
    pageData.pageType,
    pageData.url,
  )

  if (!initialProducts) {
    return <div>Ошибка получения списка продуктов страницы</div>
  }

  if (!categoryData) {
    console.log('Ошибка получения продуктов категории')
  }

  return (
    <CategoryPageClient
      pageData={pageData}
      currentPage={currentPage}
      initialProducts={initialProducts.products}
      totalCount={initialProducts.totalCount}
      categoryData={categoryData}
    />
  )
}

export default CatalogPaginationPage
