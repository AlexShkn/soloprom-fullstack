// CategoryPageClient.tsx
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

const CategoryPageClient: React.FC<{
  pageData: PageDataTypes
  currentPage: number
}> = ({ pageData, currentPage }) => {
  const router = useRouter()

  const [products, setProducts] = useState<cardDataProps[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (newPage: number) => {
    router.push(`/catalog/${pageData.name}/${newPage}`)
  }

  return (
    <PageWrapper>
      <BreadCrumbs
        category={pageData.category}
        subcategory={pageData.title}
        name={pageData.crumb}
        url={pageData.url}
      />
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
        data={products}
        currentPage={currentPage}
        onChangePage={handlePageChange}
      />

      <ProductsSlider title={'Похожие товары'} categoryName={pageData.name} />
      <PageArticle articleName={pageData.name} />
      <Callback />
    </PageWrapper>
  )
}

export default CategoryPageClient
