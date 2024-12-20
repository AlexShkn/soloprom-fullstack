import axios from 'axios'

export async function getProducts() {
  const response = await axios.get('http://localhost:3000/products')
  return response
}

export async function getProductById(id: string) {
  const response = await axios.get(`http://localhost:3000/products/${id}`)
  return response
}

export async function getProductsByCategory(category: string) {
  const response = await axios.get(
    `http://localhost:3000/products/category/${category}`,
  )
  return response
}

export async function getProductsBySubcategory(subcategory: string) {
  const response = await axios.get(
    `http://localhost:3000/products/subcategory/${subcategory}`,
  )
  return response
}

export async function getPopularProducts() {
  const response = await axios.get('http://localhost:3000/products/popular')
  return response
}
