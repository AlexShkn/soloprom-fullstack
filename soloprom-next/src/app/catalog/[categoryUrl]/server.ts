import {
  CardDataProps,
  FilterData,
  PageDataTypes,
} from '@/types/products.types'

export interface PagesData {
  [key: string]: PageDataTypes
}

const pagesDataRaw = require('@/data/products/pagesData.json')
const flatPagesData: PagesData = {}

for (const categoryKey in pagesDataRaw) {
  const categoryData = pagesDataRaw[categoryKey]
  flatPagesData[categoryKey] = {
    ...categoryData,
    pageType: categoryData.pageType,
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

export function generateFilterData(
  categoryInitialList: CardDataProps[] | null,
): FilterData {
  if (!categoryInitialList || categoryInitialList.length === 0) {
    return {
      categoryes: [],
      brands: [],
      types: [],
      prices: null,
      sizes: [],
      plates: [],
      voltage: [],
      container: [],
      models: [],
      countries: [],
      radiuses: [],
      viscosity: [],
    }
  }

  let allCategoryes: string[] = []
  let allTypes: string[] = []
  let allBrands: string[] = []
  let minPrice = Infinity
  let maxPrice = -Infinity
  let allSizes: string[] = []
  let allPlates: (string | null)[] = []
  let allVoltage: (string | null)[] = []
  let allViscosity: string[] = []
  let allContainer: string[] = []
  let allModels: string[] = []
  let allCountries: (string | null)[] = []
  let allRadiuses: (string | null)[] = []

  categoryInitialList.forEach((item) => {
    // Category
    if (item.categoryName) {
      allCategoryes.push(item.categoryName)
    }
    // Brands
    if (item.brandName) {
      allBrands.push(item.brandName)
    }
    if (item.productType) {
      allTypes.push(item.productType)
    }
    // Prices
    if (item.defaultPrice) {
      minPrice = Math.min(minPrice, item.defaultPrice)
      maxPrice = Math.max(maxPrice, item.defaultPrice)
    }

    // Sizes
    if (item.defaultSize) {
      allSizes.push(item.defaultSize)
    }

    // Plates
    if (item.plates) {
      allPlates.push(item.plates)
    }

    // voltage
    if (item.voltage) {
      allVoltage.push(item.voltage)
    }
    if (item.viscosity) {
      allViscosity.push(item.viscosity)
    }

    // container
    if (item.container) {
      allContainer.push(item.container)
    }

    // models
    if (item.models && item.models.length > 0) {
      allModels.push(...item.models)
    }
    // Countries
    if (item.country) {
      allCountries.push(item.country)
    }

    // Radiuses
    if (item.size) {
      allRadiuses.push(item.size)
    }
  })

  const uniqueCategoryes = [...new Set(allCategoryes)]
  const uniqueTypes = [...new Set(allTypes)]
  const uniqueBrands = [...new Set(allBrands)]
  const uniqueSizes = [
    ...new Set(
      allSizes.sort((a, b) => {
        const [aLength, aWidth, aHeight] = a.split(/x|х/).map(Number)
        const [bLength, bWidth, bHeight] = b.split(/x|х/).map(Number)

        if (aLength !== bLength) return aLength - bLength
        if (aWidth !== bWidth) return aWidth - bWidth
        return aHeight - bHeight
      }),
    ),
  ]
  const uniquePlates = [...new Set(allPlates)].filter(Boolean) as string[]
  const uniqueModels = [
    ...new Set(allModels.map((model) => model.toUpperCase())),
  ]
  const uniqueCountries = [...new Set(allCountries)].filter(Boolean) as string[]
  const uniqueRadiuses = [...new Set(allRadiuses)].filter(Boolean) as string[]

  const parserRadiuses = uniqueRadiuses.sort(
    (a, b) => parseInt(a) - parseInt(b),
  )
  const parserPlates = uniquePlates.sort((a, b) => parseInt(a) - parseInt(b))
  const parserModels = uniqueModels.sort((a, b) =>
    a[0].toLowerCase().localeCompare(b[0].toLowerCase()),
  )

  const parsedVoltage = [...new Set(allVoltage)].filter(Boolean) as string[]

  const sortedVoltage = parsedVoltage.sort((a, b) => {
    const aNum = parseInt(a, 10)
    const bNum = parseInt(b, 10)

    if (isNaN(aNum) && isNaN(bNum)) {
      return a.localeCompare(b)
    }
    if (isNaN(aNum)) {
      return 1
    }
    if (isNaN(bNum)) {
      return -1
    }
    return aNum - bNum
  })

  const parsedViscosity = [...new Set(allViscosity)].filter(Boolean)

  const parsedContainer = [...new Set(allContainer)].filter(Boolean)

  return {
    categoryes: uniqueCategoryes,
    brands: uniqueBrands,
    types: uniqueTypes,
    prices:
      minPrice !== Infinity && maxPrice !== -Infinity
        ? { min: minPrice, max: maxPrice }
        : null,
    sizes: uniqueSizes,
    plates: parserPlates,
    voltage: sortedVoltage,
    viscosity: parsedViscosity,
    container: parsedContainer,
    models: parserModels,
    countries: uniqueCountries,
    radiuses: parserRadiuses,
  }
}
