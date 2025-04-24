'use client'
import React, { Suspense, useEffect } from 'react'
import { HeroBlock } from '@/components/CategoryPageHero/HeroBlock'
import { CategoryPageHero } from '@/components/CategoryPageHero/CategoryPageHero'
import { SidePanel } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { ProductsFilterBlock } from '@/components/GroupList/ProductsFilterBlock'
import PageArticle from '@/components/PageArticle/PageArticle'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import {
  FilterData,
  CardDataProps,
  PageDataTypes,
} from '@/types/products.types'
import { CategoryPageSlider } from '@/components/CategoryPageSlider/CategoryPageSlider'
import { Loading } from '@/components/ui'
import CategoryPageParams from './CategoryPageParams'
import useFilterStore from '@/store/useFilterStore'
import { PageBenefits } from '@/components/PageBenefits/PageBenefits'

interface CategoryPageClientProps {
  pageData: PageDataTypes
  currentPage: number
  initialProducts: CardDataProps[] | null
  categoryData: FilterData
  totalCount: number
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  pageData,
  currentPage,
  initialProducts,
  totalCount,
  categoryData,
}) => {
  const { setTotalPages, setTotalProductsCount } = useFilterStore()

  useEffect(() => {
    console.log(totalCount)
    setTotalProductsCount(totalCount)
    setTotalPages(totalCount)
  }, [])

  return (
    <PageWrapper>
      <BreadCrumbs
        category={pageData.category}
        subcategory={pageData.title}
        name={pageData.crumb}
        url={pageData.url}
      />
      {currentPage < 2 ? (
        <HeroBlock>
          <SidePanel pageData={pageData} />
          <CategoryPageHero
            categoryTitle={pageData.crumb}
            categoryImage={pageData.img}
            categoryAlt={pageData.alt}
          />
        </HeroBlock>
      ) : (
        <h1 className="page-container mb-5 text-2xl font-medium">
          {pageData.crumb} — страница {currentPage}
        </h1>
      )}

      <Suspense fallback={<Loading />}>
        <CategoryPageParams />
      </Suspense>

      <ProductsFilterBlock
        productsType={pageData.category}
        categoryName={pageData.subUrl ?? pageData.name}
        currentPage={currentPage}
        pageName={pageData.name}
        initialProducts={initialProducts}
        categoryData={categoryData}
        totalCount={totalCount}
      />
      <PageBenefits />
      {/* <PageArticle category={pageData.category} articleName={pageData.name} /> */}
      <CategoryPageSlider category={pageData.category} />
      <Callback />
    </PageWrapper>
  )
}

export default CategoryPageClient
