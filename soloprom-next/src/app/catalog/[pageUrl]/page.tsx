import { Metadata } from 'next'
import CategoryPageClient from './CategoryPageClient'
import { findPagesData, pagesData } from './server'
import { cardDataProps } from '@/types/products.types'
import { fetchProducts } from '@/utils/api/products'

export type Params = {
  pageUrl: string
}
export type ParamsPromise = Promise<Params>

interface CatalogPageProps {
  params: ParamsPromise
}

export async function generateStaticParams() {
  const params: Params[] = []

  for (const pageUrl in pagesData) {
    const pageData = pagesData[pageUrl]

    if (
      pageData.pageType === 'category' ||
      pageData.pageType === 'subcategory' ||
      pageData.pageType === 'group' ||
      pageData.pageType === 'brands'
    ) {
      params.push({ pageUrl })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { pageUrl } = await params
  console.log(pageUrl)

  const categoryData = pagesData[pageUrl]

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  const title = `${categoryData.title}`

  const description = `${categoryData.description}`

  const canonicalUrl = `/catalog/${pageUrl}`

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

const CatalogPage: React.FC<CatalogPageProps> = async ({ params }) => {
  const { pageUrl } = await params
  const pageData = await findPagesData(pageUrl)

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const currentPage = 1 // Всегда 1 для основной страницы

  const initialProducts = await fetchProducts({
    categoryName: pageData.name,
    page: currentPage,
    limit: 12,
  })

  if (!initialProducts) {
    return <div>Error loading products</div>
  }

  return (
    <CategoryPageClient
      pageData={pageData}
      currentPage={currentPage}
      initialProducts={initialProducts.products}
      totalCount={initialProducts.totalCount}
    />
  )
}

export default CatalogPage
