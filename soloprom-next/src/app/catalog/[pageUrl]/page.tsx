import { Metadata } from 'next'
import CategoryPageClient from './CategoryPageClient'
import { findPagesData, generateFilterData, pagesData } from './server'
import { fetchProducts, getProductsAnyCategories } from '@/utils/api/products'
import { FilterData } from '@/types/products.types'

export type Params = {
  pageUrl: string
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
  const { pageUrl } = await params

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

export async function generateStaticParams() {
  const params: Params[] = []

  for (const page in pagesData) {
    const pageData = pagesData[page]

    const pageUrl =
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
      params.push({ pageUrl })
    }
  }
  return params
}

const CatalogPage: React.FC<CatalogPageProps> = async ({ params }) => {
  const { pageUrl } = await params

  const pageData = await findPagesData(pageUrl)

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const currentPage = 1

  const initialProducts = await fetchProducts({
    categoryName: pageData.subUrl ? pageData.subUrl : pageData.name,
    page: currentPage,
    limit: 12,
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

  if (!initialProducts) {
    return <div>Ошибка получения списка продуктов страницы</div>
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

export default CatalogPage
