import { api } from '@/components/shared/instance.api'
import { cardDataProps } from '@/types/products.types'

interface ProductsRequest {
  categoryName?: string
  page?: number
  limit?: number
  sort?: string
  filters?: Record<string, string | string[]>
  search?: string
}

export interface fetchProductsProps {
  products: cardDataProps[]
  totalCount: number
  currentPage: number
  totalPages: number
}

const BASE_URL = `products` // Обновлено

export async function getTotalProductCount(categoryName: string) {
  const response = await api.get<{ totalCount: number }>(
    `${BASE_URL}/get-products`,
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
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductsAnyCategories(type: string, name: string) {
  try {
    const response = await api.get<any>(`${BASE_URL}/${type}/${name}`) // Указать тип данных если известен.

    return response
  } catch (error) {
    console.error('Ошибка получения', error)
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
    console.error('Error fetching products', error)
    return null
  }
}

export async function getPopularProducts() {
  const response = await api.get<any>(`${BASE_URL}/popular/get`)
  return response
}

export async function getAllProducts() {
  const response = await api.get<any>(`${BASE_URL}`)
  return response
}

export async function searchProducts(field: string, value: string) {
  const response = await api.get<any>(`${BASE_URL}/search/product`, {
    params: { [field]: value },
  })
  return response
}

export async function getProductById(id: string) {
  try {
    const response = await api.get<any>(`${BASE_URL}/${id}`)
    return response
  } catch (error) {
    console.error('Error fetching product:', error)
    return []
  }
}

export async function getProducts(p0: {
  categoryName: string
  page: number
  limit: number
}) {
  try {
    const response = await api.get<any>(BASE_URL, { params: p0 })
    return response
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductsByCategory(category: string) {
  const response = await api.get<any>(`${BASE_URL}/category/${category}`)
  return response
}

export async function getProductsBySubcategory(
  subcategory: string,
): Promise<{ data: cardDataProps[]; count: number } | null> {
  try {
    const response = await api.get<{ data: cardDataProps[]; count: number }>(
      `${BASE_URL}/subcategory/${subcategory}`,
    )

    return response
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export async function getProductsByGroup(
  group: string,
): Promise<{ data: cardDataProps[]; count: number } | null> {
  try {
    const response = await api.get<{ data: cardDataProps[]; count: number }>(
      `${BASE_URL}/group/${group}`,
    )
    return response
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}
