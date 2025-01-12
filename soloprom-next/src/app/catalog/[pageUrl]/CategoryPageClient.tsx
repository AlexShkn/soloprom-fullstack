'use client'
import React, { useState, useEffect, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { HeroBlock } from '@/components/CategoryPageHero/HeroBlock/HeroBlock'
import { CategoryPageHero } from '@/components/CategoryPageHero/CategoryPageHero'
import { SidePanel } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { ProductsFilterList } from '@/components/GroupList/ProductsFilterList'
import { PageArticle } from '@/components/PageArticle/PageArticle'
import { ProductsSlider } from '@/components/ProductsSlider/ProductsSlider'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { PageDataTypes } from './server'
import { cardDataProps } from '@/types/products.types'

interface ProductsResponse {
  products: cardDataProps[]
  totalCount: number
  currentPage: number
  totalPages: number
}

const CategoryPageClient: React.FC<{ pageData: PageDataTypes }> = ({
  pageData,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<cardDataProps[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isPending, startTransition] = useTransition()
  const page = Number(searchParams.get('page')) || 1
  const limit = 10
  const filters = searchParams.get('filters')
  const sort = searchParams.get('sort')
  const search = searchParams.get('search')

  useEffect(() => {
    const fetchProducts = async () => {
      startTransition(async () => {
        try {
          const params = {
            categoryName: pageData.name,
            page: page,
            limit,
            filters,
            sort,
            search,
          }

          console.log(params)

          const response = await axios.get<ProductsResponse>(
            `/api/routes/products`,
            {
              params,
            },
          )
          setProducts(response.data.products)
          setTotalProducts(response.data.totalCount)
          setCurrentPage(response.data.currentPage)
          setTotalPages(response.data.totalPages)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      })
    }

    fetchProducts()
  }, [pageData.name, page, filters, sort, search, startTransition])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))

    const queryString = params.toString()

    let url = `/catalog/${pageData.name}`

    if (queryString) {
      url += `?${queryString}`
    }
    console.log('Navigating to:', url)
    router.push(url)
  }

  return (
    <>
      <PageWrapper>
        <BreadCrumbs />
        {pageData.pageType === 'category' && (
          <HeroBlock>
            <SidePanel pageData={pageData} />
            <CategoryPageHero
              categoryTitle={pageData.title}
              categoryImage={pageData.img}
              categoryAlt={pageData.alt}
            />
          </HeroBlock>
        )}

        <ProductsFilterList
          categoryName={pageData.name}
          setProducts={setProducts}
          data={products}
        />
        <div className="pagination flex justify-center gap-5">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Назад
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Вперед
          </button>
        </div>

        <ProductsSlider title={'Похожие товары'} categoryName={pageData.name} />
        <PageArticle articleName={pageData.name} />
        <Callback />
      </PageWrapper>
    </>
  )
}

export default CategoryPageClient
