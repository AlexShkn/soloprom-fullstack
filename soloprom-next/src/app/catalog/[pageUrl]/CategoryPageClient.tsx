'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { HeroBlock } from '@/components/CategoryPageHero/HeroBlock'
import { CategoryPageHero } from '@/components/CategoryPageHero/CategoryPageHero'
import { SidePanel } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { ProductsFilterBlock } from '@/components/GroupList/ProductsFilterBlock/ProductsFilterBlock'
import PageArticle from '@/components/PageArticle/PageArticle'
import { ProductsSlider } from '@/components/ProductsSlider/ProductsSlider'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { Loading } from '@/components/ui'
import {
  FilterData,
  CardDataProps,
  PageDataTypes,
} from '@/types/products.types'
import { CategoryPageSlider } from '@/components/CategoryPageSlider/CategoryPageSlider'

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
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    const newPath = `/catalog/${pageData.name}`

    if (newPage > 1) {
      router.push(`${newPath}/${newPage}`)
    } else {
      router.push(newPath)
    }
  }

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
            categoryTitle={pageData.title}
            categoryImage={pageData.img}
            categoryAlt={pageData.alt}
          />
        </HeroBlock>
      ) : (
        <h1 className="page-container mb-5 text-2xl font-medium">
          {pageData.title} — страница {currentPage}
        </h1>
      )}

      <Suspense fallback={<Loading />}>
        <ProductsFilterBlock
          productsType={pageData.category}
          categoryName={pageData.subUrl ? pageData.subUrl : pageData.name}
          currentPage={currentPage}
          onChangePage={handlePageChange}
          initialProducts={initialProducts}
          categoryData={categoryData}
          totalCount={totalCount}
        />
      </Suspense>
      <PageArticle category={pageData.category} articleName={pageData.name} />
      <CategoryPageSlider category={pageData.category} />
      <Callback />
    </PageWrapper>
  )
}

export default CategoryPageClient
