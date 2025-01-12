import { cardDataProps } from '@/types/products.types'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`

interface ProductsRequest {
  categoryName?: string
  page?: number
  limit?: number
  sort?: string
  filters?: Record<string, string | string[]>
  search?: string
}

export async function getTotalProductCount(categoryName: string) {
  // Замените это на ваш реальный вызов API для подсчета продуктов
  const response = await axios.get(`${BASE_URL}/get-products`, {
    params: { categoryName, limit: 1 },
  })
  return response.data.totalCount
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const params: ProductsRequest = {}

    const categoryName = searchParams.get('categoryName')
    if (categoryName) params.categoryName = categoryName

    const page = searchParams.get('page')
    if (page) params.page = parseInt(page, 10)

    const limit = searchParams.get('limit')
    if (limit) params.limit = parseInt(limit, 10)

    const sort = searchParams.get('sort')
    if (sort) params.sort = sort

    const search = searchParams.get('search')
    if (search) params.search = search

    const filtersString = searchParams.get('filters')
    if (filtersString) params.filters = JSON.parse(filtersString)

    console.log(params)

    const response = await axios.get<cardDataProps>(
      `${BASE_URL}/get-products`,
      { params },
    )

    if (response.status !== 200) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 },
      )
    }
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
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

export async function getProducts() {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return []
  }
}

export async function getProductsByCategory(category: string) {
  const response = await axios.get(`${BASE_URL}/category/${category}`)
  return response
}

export async function getProductsBySubcategory(
  subcategory: string,
): Promise<{ data: cardDataProps[]; count: number } | null> {
  try {
    const response = await axios.get(`${BASE_URL}/subcategory/${subcategory}`)

    if (response.status === 200 && Array.isArray(response.data)) {
      return { data: response.data, count: response.data.length }
    }

    return null
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export async function getProductsByGroup(
  group: string,
): Promise<{ data: cardDataProps[]; count: number } | null> {
  try {
    const response = await axios.get(`${BASE_URL}/group/${group}`)

    if (response.status === 200 && Array.isArray(response.data)) {
      return { data: response.data, count: response.data.length }
    }

    return null
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export async function getPopularProducts() {
  const response = await axios.get(`${BASE_URL}/popular/get`)
  return response
}

export async function searchProducts(field: string, value: string) {
  const response = await axios.get(
    `${BASE_URL}/search/product?${field}=${value}`,
  )
  return response
}
