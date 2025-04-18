import { api } from '@/utils/fetch/instance.api'
import { CardDataProps } from '@/types/products.types'

interface ProductsRequest {
  categoryName?: string
  page?: number
  limit?: number
  sort?: string
  filters?: Record<string, string | string[]>
  search?: string
}

export interface fetchProductsProps {
  products: CardDataProps[]
  totalCount: number
  currentPage: number
  totalPages: number
}

export async function getTotalProductCount(categoryName: string) {
  const response = await api.get<{ totalCount: number }>(
    `products/get-products`,
    {
      params: { categoryName, limit: 1 },
    },
  )
  return response.totalCount
}

export async function getProductsCounts() {
  try {
    const response = await api.get<Record<string, number>>(`statistics/counts`)
    return response
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error)
    return []
  }
}

export async function getProductsAnyCategories(type: string, name: string) {
  try {
    const response = await api.get<any>(`products/${type}/${name}`) // Указать тип данных если известен.

    return response
  } catch (error) {
    console.error(`Ошибка получения ${type} ${name}`, error)
    return null
  }
}

export const fetchProducts = async (
  params: ProductsRequest,
): Promise<fetchProductsProps | null> => {
  try {
    const { filters, ...otherParams } = params

    const response = await api.get<fetchProductsProps>(
      `products/get-products`,
      {
        params: {
          ...otherParams,
          filters: filters ? JSON.stringify(filters) : undefined,
        },
      },
    )

    return response
  } catch (error) {
    console.error('Ошибка получения продуктов по фильтрам', error)
    return null
  }
}

export async function getPopularProducts() {
  const response = await api.get<any>(`products/popular/get`)
  return response
}

export async function getAllProducts() {
  const response = await api.get<CardDataProps[]>(`products`)
  return response
}

export async function searchProducts(field: string, value: string) {
  const response = await api.get<any>(`products/search/product`, {
    params: { [field]: value },
  })
  return response
}
export async function searchPages(field: string, value: string) {
  const response = await api.get<any>(`products/search/pages`, {
    params: { [field]: value },
  })
  return response
}

export async function getProductById(id: string) {
  try {
    const response = await api.get<any>(`products/${id}`)
    return response
  } catch (error) {
    console.error(`Ошибка получения продукта: ${id}`, error)
    return []
  }
}

export async function getProducts(p0: {
  categoryName: string
  page: number
  limit: number
}) {
  try {
    const response = await api.get<any>('products', { params: p0 })
    return response
  } catch (error) {
    console.error(`Ошибка получения продуктов: ${p0.categoryName}`, error)
    return []
  }
}

export async function getProductsByCategory(category: string) {
  const response = await api.get<any>(`products/category/${category}`)
  return response
}

export async function getProductsBySubcategory(
  subcategory: string,
): Promise<{ data: CardDataProps[]; count: number } | null> {
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

export async function getProductsByGroup(
  group: string,
): Promise<{ data: CardDataProps[]; count: number } | null> {
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
