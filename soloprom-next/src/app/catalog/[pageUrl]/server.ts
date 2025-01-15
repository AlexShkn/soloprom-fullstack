// server.ts
export interface PageDataTypes {
  pageType: 'category' | 'subcategory' | 'group' | 'brands'
  category: string
  name: string
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb?: string
  headGroupTitle?: string
}

interface PagesData {
  [key: string]: PageDataTypes
}

const pagesDataRaw = require('@/data/products/pagesData.json')
const flatPagesData: PagesData = {}

for (const categoryKey in pagesDataRaw) {
  const categoryData = pagesDataRaw[categoryKey]
  flatPagesData[categoryKey] = {
    ...categoryData,
    pageType: 'category',
    url: categoryKey,
    name: categoryKey,
  }
}

export const pagesData = flatPagesData

export async function findPagesData(
  pageUrl: string,
): Promise<PageDataTypes | undefined> {
  return pagesData[pageUrl]
}
