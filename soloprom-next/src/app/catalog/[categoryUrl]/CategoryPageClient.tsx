'use client'
import React, { Suspense } from 'react'
import { HeroBlock } from '@/components/CategoryPageHero/HeroBlock'
import { CategoryPageHero } from '@/components/CategoryPageHero/CategoryPageHero'
import { SidePanel } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { ProductsFilterBlock } from '@/components/GroupList/ProductsFilterBlock'
import PageArticle from '@/components/PageArticle/PageArticle'
import { Callback } from '@/components/Callback'
import BreadCrumbs from '@/components/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { FilterData, PageDataTypes } from '@/types/products.types'
import { Loading } from '@/components/ui'
import CategoryPageParams from './CategoryPageParams'
import { PageBenefits } from '@/components/PageBenefits'
import { BrandsTabs } from '@/components/BrandsTabs'
import { ViewedSlider } from '@/components/ViewedSlider'
import { OtherCategorySlider } from '@/components/OtherCategorySlider/OtherCategorySlider'
import { FetchProductsProps } from '@/api/products'
import { SizesTable } from '@/components/SizesTable'

interface CategoryPageClientProps {
  pageData: PageDataTypes
  categoryData: FilterData
  fullData: FetchProductsProps
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  fullData,
  pageData,
  categoryData,
}) => {
  const { products, totalCount, totalPages, currentPage } = fullData
  const { category, title, crumb, url, img, alt, subUrl, name } = pageData

  return (
    <PageWrapper>
      <BreadCrumbs
        category={category}
        subcategory={title}
        name={crumb}
        url={url}
      />
      {currentPage < 2 ? (
        <HeroBlock>
          <SidePanel pageData={pageData} />
          <CategoryPageHero
            categoryTitle={crumb}
            categoryImage={img}
            categoryAlt={alt}
          />
        </HeroBlock>
      ) : (
        <h1 className="page-container mb-5 text-2xl font-medium">
          {crumb} — страница {currentPage}
        </h1>
      )}

      <Suspense fallback={<Loading />}>
        <CategoryPageParams />
      </Suspense>

      <ProductsFilterBlock
        productsType={category}
        categoryName={subUrl ?? name}
        pageName={name}
        initialProducts={products}
        categoryData={categoryData}
        initTotalCount={totalCount}
        initTotalPages={totalPages}
        currentPage={currentPage}
      />
      <PageBenefits pageData={pageData} />

      {category !== 'oils' ? (
        <BrandsTabs category={category} subcategory={url} />
      ) : (
        ''
      )}

      {category === 'tires' ? <SizesTable /> : ''}

      <OtherCategorySlider category={category} />
      <ViewedSlider />
      <Callback />
    </PageWrapper>
  )
}

export default CategoryPageClient
