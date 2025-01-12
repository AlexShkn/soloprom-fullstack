import React from 'react'
import { findPagesData } from './server'
import CategoryPageClient from './CategoryPageClient'

interface PageProps {
  params: { pageUrl: string }
}

const CatalogPage: React.FC<PageProps> = async ({ params }) => {
  const { pageUrl } = await params

  const pageData = await findPagesData(pageUrl)

  if (!pageData) {
    return <h1>Страница не найдена</h1>
  }

  return <CategoryPageClient pageData={pageData} />
}

export default CatalogPage
