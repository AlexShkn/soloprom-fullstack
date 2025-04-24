'use client'
import React from 'react'
import PageWrapper from '@/app/PageWrapper'
import { RecommendSlider } from '@/components/RecommendSlider/RecommendSlider'
import { ViewedSlider } from '@/components/ViewedSlider/ViewedSlider'
import { ProductPageCard } from '@/components/ProductPage/ProductPageCard'
import { ProductPageTabs } from '@/components/ProductPage/ProductPageTabs'
import { ProductPageBenefits } from '@/components/ProductPage/ProductPageBenefits'
import { CardDataProps, ProductDetailsResponse } from '@/types/products.types'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import { SubHero } from '@/components/SubHero/SubHero'

import { ReviewsTypes } from '../../../api/reviews'

interface Props {
  productData: ProductDetailsResponse
  recommendList: CardDataProps[]
  reviewData: ReviewsTypes[]
  productId: string
}

export const ProductPageClient: React.FC<Props> = ({
  productData,
  reviewData,
  productId,
  recommendList,
}) => {
  return (
    <PageWrapper>
      <BreadCrumbs
        category={productData.categoryName}
        subcategory={productData.subcategoryName}
      />

      <section className="product-page">
        <div className="page-container">
          <ProductPageCard cardData={productData} />
          <ProductPageTabs
            productDescr={productData.productDescr}
            reviewData={reviewData}
            productId={productId}
          />

          <RecommendSlider data={recommendList} />
          <SubHero />
          {/* <ViewedSlider data={data}/> */}
        </div>
      </section>
      <Callback />
    </PageWrapper>
  )
}
