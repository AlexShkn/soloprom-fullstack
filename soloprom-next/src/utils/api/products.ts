import { cardDataProps } from '@/types/products.types'
import axios from 'axios'

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

export const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`

export async function getTotalProductCount(categoryName: string) {
  const response = await axios.get(`${BASE_URL}/get-products`, {
    params: { categoryName, limit: 1 },
  })
  return response.data.totalCount
}

export async function getProductsCounts() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/statistics/counts`,
    )
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductsAnyCategories(type: string, name: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${name}`)

    if (response.status !== 200) {
      console.error('Ошибка при получении продуктов категории', response)
      return null
    }

    return response.data
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

    const response = await axios.get<fetchProductsProps>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`,
      {
        params: {
          ...otherParams,
          filters: filters ? JSON.stringify(filters) : undefined,
        },
      },
    )

    if (response.status !== 200) {
      console.error('Failed to fetch products', response)
      return null
    }

    return response.data
  } catch (error) {
    console.error('Error fetching products', error)
    return null
  }
}

export async function getPopularProducts() {
  const response = await axios.get(`${BASE_URL}/popular/get`)
  return response
}
export async function getAllProducts() {
  const response = await axios.get(`${BASE_URL}`)
  return response
}

export async function searchProducts(field: string, value: string) {
  const response = await axios.get(
    `${BASE_URL}/search/product?${field}=${value}`,
  )
  return response
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return []
  }
}

// export async function getProducts(p0: {
//   categoryName: string
//   page: number
//   limit: number
// }) {
//   try {
//     const response = await axios.get(BASE_URL)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     return []
//   }
// }

// export async function getProductsByCategory(category: string) {
//   const response = await axios.get(`${BASE_URL}/category/${category}`)
//   return response
// }

// export async function getProductsBySubcategory(
//   subcategory: string,
// ): Promise<{ data: cardDataProps[]; count: number } | null> {
//   try {
//     const response = await axios.get(`${BASE_URL}/subcategory/${subcategory}`)

//     if (response.status === 200 && Array.isArray(response.data)) {
//       return { data: response.data, count: response.data.length }
//     }

//     return null
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     return null
//   }
// }

// export async function getProductsByGroup(
//   group: string,
// ): Promise<{ data: cardDataProps[]; count: number } | null> {
//   try {
//     const response = await axios.get(`${BASE_URL}/group/${group}`)

//     if (response.status === 200 && Array.isArray(response.data)) {
//       return { data: response.data, count: response.data.length }
//     }

//     return null
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     return null
//   }
// }
