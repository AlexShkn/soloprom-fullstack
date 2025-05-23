'use client'
import React, { useRef } from 'react'
import PageWrapper from '@/app/PageWrapper'
import { RecommendSlider } from '@/components/RecommendSlider'
import { ViewedSlider } from '@/components/ViewedSlider'
import { ProductPageCard } from '@/components/ProductPage/ProductPageCard'
import { ProductPageTabs } from '@/components/ProductPage/ProductPageTabs'
import { CardDataProps, ProductDetailsResponse } from '@/types/products.types'
import { Callback } from '@/components/Callback'
import BreadCrumbs from '@/components/BreadCrumbs'
import { SubHero } from '@/components/SubHero'

import { ReviewsTypes } from '../../../api/reviews'
import { ProductPageNav } from '@/components/ProductPage/ProductPageNav'

interface Props {
  productData: ProductDetailsResponse
  recommendList: CardDataProps[]
  relatedProducts: CardDataProps[]
  reviewData: ReviewsTypes[]
  productId: string
}

export const ProductPageClient: React.FC<Props> = ({
  productData,
  reviewData,
  productId,
  recommendList,
  relatedProducts,
}) => {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const characteristicsRef = useRef<HTMLDivElement>(null)
  const compatibilityRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const deliveryRef = useRef<HTMLDivElement>(null)

  const refs = [
    descriptionRef,
    characteristicsRef,
    compatibilityRef,
    deliveryRef,
    reviewsRef,
  ]

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offset = 100
      const elementPosition = ref.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <PageWrapper className="#f8fafc">
      <BreadCrumbs
        category={productData.categoryName}
        subcategory={productData.subcategoryName}
      />

      <section className="product-page">
        <div className="page-container">
          <div className="mb-7 flex flex-col gap-3 xl:flex-row">
            <ProductPageNav
              reviewData={reviewData}
              productDescr={productData.productDescr}
              scrollToRef={scrollToRef}
              refs={refs}
            />
            <ProductPageCard
              cardData={productData}
              relatedProducts={relatedProducts}
              reviewData={reviewData}
            />
          </div>
          <ProductPageTabs
            productDescr={productData.productDescr}
            reviewData={reviewData}
            productId={productId}
            descriptionRef={descriptionRef}
            characteristicsRef={characteristicsRef}
            compatibilityRef={compatibilityRef}
            reviewsRef={reviewsRef}
            deliveryRef={deliveryRef}
          />

          <RecommendSlider data={recommendList} />
          <SubHero />

          <ViewedSlider productId={productId} />
        </div>
      </section>
      <Callback />
    </PageWrapper>
  )
}
