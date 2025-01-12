import CategoryPageClient from '../CategoryPageClient'
import { findPagesData } from '../server'

interface PageProps {
  params: { pageUrl: string; page?: string }
}

const CatalogPage: React.FC<PageProps> = async ({ params }) => {
  const { pageUrl, page } = params

  const pageData = await findPagesData(pageUrl)

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  const currentPage = parseInt(page || '1', 10)

  return <CategoryPageClient pageData={pageData} currentPage={currentPage} />
}

export default CatalogPage
