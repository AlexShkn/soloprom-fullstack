// /app/api/routes/products/route.ts

import { cardDataProps } from '@/types/products.types'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

interface ProductsRequest {
  categoryName?: string
  page?: number
  limit?: number
  sort?: string
  filters?: Record<string, string | string[]>
  search?: string
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

    const response = await axios.get<cardDataProps>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`,
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
