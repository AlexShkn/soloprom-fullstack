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
  if (categoryData.subcategories) {
    categoryData.subcategories.forEach((subcat: any) => {
      flatPagesData[subcat.url] = {
        ...subcat,
        pageType: 'subcategory',
        category: categoryKey,
        name: subcat.url,
      }
    })
  }
  if (categoryData.group) {
    categoryData.group.forEach((group: any) => {
      flatPagesData[group.url] = {
        ...group,
        pageType: 'group',
        category: categoryKey,
        name: group.url,
      }
    })
  }
  if (categoryData.brands) {
    categoryData.brands.forEach((brand: any) => {
      flatPagesData[brand.url] = {
        ...brand,
        pageType: 'brands',
        category: categoryKey,
        name: brand.url,
      }
    })
  }
}

export const pagesData = flatPagesData

export async function findPagesData(
  pageUrl: string,
): Promise<PageDataTypes | undefined> {
  return pagesData[pageUrl]
}

export async function generateStaticParams() {
  return Object.keys(pagesData).map((pageUrl) => ({
    pageUrl,
  }))
}
