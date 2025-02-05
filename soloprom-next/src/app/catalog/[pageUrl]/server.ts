import {
  cardDataProps,
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
  categoryInitialList: cardDataProps[] | null,
): FilterData {
  if (!categoryInitialList || categoryInitialList.length === 0) {
    return {
      brands: [],
      types: [],
      prices: null,
      volumes: [],
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

  let allTypes: string[] = []
  let allBrands: string[] = []
  let minPrice = Infinity
  let maxPrice = -Infinity
  let allVolumes: string[] = []
  let allSizes: string[] = []
  let allPlates: (string | null)[] = []
  let allVoltage: (string | null)[] = []
  let allViscosity: string[] = []
  let allContainer: (string | null)[] = []
  let allModels: string[] = []
  let allCountries: (string | null)[] = []
  let allRadiuses: (string | null)[] = []

  categoryInitialList.forEach((item) => {
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

    // Volumes
    if (item.volumes) {
      allVolumes.push(...Object.keys(item.volumes))
    }

    // Sizes
    if (item.sizes) {
      Object.keys(item.sizes).forEach((size) => {
        if (size !== '') {
          allSizes.push(size)
        } else {
          console.log(item)
        }
      })
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
  const uniqueVolumes = [...new Set(allVolumes)].sort(
    (a, b) => parseInt(a) - parseInt(b),
  )

  const parsedVoltage = [...new Set(allVoltage)]
    .filter(Boolean)
    .map((v) => parseInt(v as string, 10))
    .filter((v) => !isNaN(v))
    .sort((a, b) => a - b)
  const parsedViscosity = [...new Set(allViscosity)].sort(
    (a, b) => parseInt(a) - parseInt(b),
  )

  const parsedContainer = [...new Set(allContainer)]
    .filter(Boolean)
    .map((c) => parseInt(c as string, 10))
    .filter((c) => !isNaN(c))
    .sort((a, b) => a - b)

  return {
    brands: uniqueBrands,
    types: uniqueTypes,
    prices:
      minPrice !== Infinity && maxPrice !== -Infinity
        ? { min: minPrice, max: maxPrice }
        : null,
    volumes: uniqueVolumes,
    sizes: uniqueSizes,
    plates: parserPlates,
    voltage: parsedVoltage,
    viscosity: parsedViscosity,
    container: parsedContainer,
    models: parserModels,
    countries: uniqueCountries,
    radiuses: parserRadiuses,
  }
}
