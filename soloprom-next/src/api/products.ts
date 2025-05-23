import { api } from '@/utils/fetch/instance.api'
import {
  CardDataProps,
  ProductDetailsResponse,
  ProductFullInfoResponse,
} from '@/types/products.types'
// import { unstable_noStore as noStore } from 'next/cache'

interface ProductsRequest {
  categoryName?: string
  page?: number
  limit?: number
  sort?: string
  filters?: Record<string, string | string[]>
  search?: string
}

export interface FetchProductsProps {
  products: CardDataProps[]
  totalCount: number
  currentPage: number
  totalPages: number
}

interface SearchProductsTypes {
  items: CardDataProps[]
  total: number
}

export interface SearchPagesTypes {
  url: string
  img: string
  title: string
  type: string
  description: string
}

export interface BatteriesOptionsTypes {
  vehicleType?: string[]
  brand?: string[]
  model?: string[]
  voltage?: string[]
  defaultSize?: string[]
  plates?: string[]
  container?: string[]
}

interface BatteriesResponseOptions {
  options: BatteriesOptionsTypes
  totalCount: number
}

export interface FilterParams {
  vehicleType?: string
  brand?: string
  model?: string
  voltage?: string
  defaultSize?: string
  plates?: string
  container?: string
  [key: string]: any
}

interface VehicleTypes {
  vehicleType: string
  brand: string
  model: string
}

interface BatteryWithVehicles extends BatteriesOptionsTypes {
  compatibleVehicles: VehicleTypes[]
}

export const getTotalProductCount = async (categoryName: string) => {
  const response = await api.get<{ totalCount: number }>(
    `products/get-products`,
    {
      params: { categoryName, limit: 1 },
      // cache: 'no-store',
    },
  )
  return response.totalCount
}

export const getProductsCounts = async () => {
  try {
    const response = await api.get<Record<string, number>>(`statistics/counts`)
    return response
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error)
    return []
  }
}

export const getProductsAnyCategories = async (type: string, name: string) => {
  try {
    const response = await api.get<CardDataProps[]>(`products/${type}/${name}`)

    return response
  } catch (error) {
    console.error(`Ошибка получения ${type} ${name}`, error)
    return null
  }
}

export const fetchProducts = async (
  params: ProductsRequest,
): Promise<FetchProductsProps | null> => {
  try {
    const { filters, ...otherParams } = params

    const response = await api.get<FetchProductsProps>(
      `products/get-products`,
      {
        params: {
          ...otherParams,
          filters: filters ? JSON.stringify(filters) : undefined,
          // cache: 'no-store',
        },
      },
    )
    return response
  } catch (error) {
    console.error('Ошибка получения продуктов по фильтрам', error)
    return null
  }
}

export const getBatteriesOptions = async (
  filter?: FilterParams,
): Promise<BatteriesResponseOptions> => {
  try {
    const response = await api.get<BatteriesResponseOptions>(
      `batteries/options`,
      {
        params: filter,
      },
    )

    return response
  } catch (error) {
    console.error('Ошибка при получении options:', error)

    return {
      options: {},
      totalCount: 0,
    }
  }
}

export const getFilteredBatteries = async (
  filter?: FilterParams,
): Promise<BatteryWithVehicles[]> => {
  try {
    const response = await api.get<BatteryWithVehicles[]>(`batteries`, {
      params: filter,
    })

    return response
  } catch (error) {
    console.error('Ошибка при получении отфильтрованных батарей:', error)
    return []
  }
}

export const getPopularProducts = async () => {
  try {
    const response = await api.get<CardDataProps[]>(`products/popular/get`)
    return response
  } catch (error) {
    console.error('Ошибка при получении популярных продуктов:', error)
    return []
  }
}

export const getAllProducts = async () => {
  const response = await api.get<CardDataProps[]>(`products`)
  return response
}

export const searchAllProducts = async (fields: string[], value: string) => {
  const response = await api.get<CardDataProps[]>('search/product-all', {
    params: { fields: fields.join(','), value },
  })
  return response
}

export const searchProducts = async (
  fields: string[],
  value: string,
  page: number = 1,
  limit: number = 20,
) => {
  const response = await api.get<SearchProductsTypes>('search/product', {
    params: { fields: fields.join(','), value, page, limit },
  })
  return response
}

export const searchPages = async (field: string, value: string) => {
  const response = await api.get<SearchPagesTypes[]>(`search/pages`, {
    params: { [field]: value },
  })
  return response
}

export const getProductById = async (id: string) => {
  // noStore()

  try {
    const response = await api.get<ProductDetailsResponse>(`products/${id}`)
    return response
  } catch (error) {
    console.error(`Ошибка получения продукта по ID: ${id}`, error)
    throw error
  }
}

export const getProductFullInfoById = async (id: string) => {
  try {
    const response = await api.get<ProductFullInfoResponse>(
      `products/details/${id}`,
    )
    return response
  } catch (error) {
    console.error(
      `Ошибка получения полного описания продукта по ID: ${id}`,
      error,
    )
    throw error
  }
}

export const getProductSizes = async (id: string) => {
  try {
    const response = await api.get<CardDataProps[]>(`search/find-sizes/${id}`)
    return response
  } catch (error) {
    console.error(`Ошибка получения продуктов по размеру: ${id}`, error)
    throw error
  }
}
export const findNotFoundId = async (id: string) => {
  try {
    const response = await api.get<CardDataProps[]>(
      `search/find-not-found/${id}`,
    )
    return response
  } catch (error) {
    console.error(`Ошибка получения продукта: ${id}`, error)
    throw error
  }
}

export const getViewProductsByIds = async (
  ids: string[],
): Promise<CardDataProps[]> => {
  try {
    const response = await api.post<CardDataProps[]>('products/view', {
      ids: ids,
    })
    return response
  } catch (error) {
    console.error('Ошибка при создании заказа:', error)
    return []
  }
}

export const getRecommendProducts = async (id: string, limit: number) => {
  try {
    const response = await api.get<CardDataProps[]>(
      `search/recommended/${id}?limit=${limit}`,
    )
    return response
  } catch (error) {
    console.error(`Ошибка получения рекомендованных продуктов: ${id}`, error)
  }
}

export const getProducts = async (p0: {
  categoryName: string
  page: number
  limit: number
}) => {
  try {
    const response = await api.get<CardDataProps[]>('products', { params: p0 })
    return response
  } catch (error) {
    console.error(`Ошибка получения продуктов: ${p0.categoryName}`, error)
    return []
  }
}

export const getProductsByCategory = async (category: string) => {
  const response = await api.get<CardDataProps[]>(
    `products/category/${category}`,
  )
  return response
}

export const getProductsBySubcategory = async (
  subcategory: string,
): Promise<{ data: CardDataProps[]; count: number } | null> => {
  try {
    const response = await api.get<{ data: CardDataProps[]; count: number }>(
      `products/subcategory/${subcategory}`,
    )

    return response
  } catch (error) {
    console.error(`Ошибка получения продуктов: ${subcategory}`, error)
    return null
  }
}

export const getProductsByGroup = async (
  group: string,
): Promise<{ data: CardDataProps[]; count: number } | null> => {
  try {
    const response = await api.get<{ data: CardDataProps[]; count: number }>(
      `products/group/${group}`,
    )
    return response
  } catch (error) {
    console.error(`Ошибка получения продуктов: ${group}`, error)
    return null
  }
}
