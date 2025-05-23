import { ApiResponse } from '@/types/products.types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface FetchProductsParams {
  categoryName: string
  page: number
  limit: number
  filters?: string | null
  sort?: string | null
}

export const fetchProductsApi = async (
  params: FetchProductsParams,
): Promise<ApiResponse> => {
  const url = `${API_BASE_URL}/products/get-products`
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value))
    }
  })

  try {
    const response = await fetch(`${url}?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw error
  }
}
