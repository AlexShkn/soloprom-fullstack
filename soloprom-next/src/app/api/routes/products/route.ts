import { cardDataProps } from '@/types/products.types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`

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
