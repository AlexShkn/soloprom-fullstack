import { cardDataProps } from '@/types/products.types'
import axios from 'axios'

export async function getProducts() {
  try {
    const response = await axios.get('http://localhost:3001/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(`http://localhost:3001/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return []
  }
}

export async function getProductsByCategory(category: string) {
  const response = await axios.get(
    `http://localhost:3001/products/category/${category}`,
  )
  return response
}

export async function getProductsBySubcategory(
  subcategory: string,
): Promise<{ data: cardDataProps[]; count: number } | null> {
  try {
    const response = await axios.get(
      `http://localhost:3001/products/subcategory/${subcategory}`,
    )

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
    const response = await axios.get(
      `http://localhost:3001/products/group/${group}`,
    )

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
  const response = await axios.get('http://localhost:3001/products/popular/get')
  return response
}

export async function searchProducts(field: string, value: string) {
  const response = await axios.get(
    `http://localhost:3001/products/search/product?${field}=${value}`,
  )
  return response
}
