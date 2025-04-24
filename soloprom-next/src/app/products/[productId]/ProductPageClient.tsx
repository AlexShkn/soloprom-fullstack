'use client'
import React, { useEffect, useState } from 'react'
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
import { getViewProductsByIds } from '@/api/products'

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
  const [productsData, setProductsData] = useState<CardDataProps[]>([])

  const getProductsList = async (ids: string[]) => {
    const response = await getViewProductsByIds(ids)
    const filteredList = response.filter((card) => card.productId !== productId)
    setProductsData(filteredList)
  }

  useEffect(() => {
    const products = localStorage.getItem('view-products')
    const productsArray = products !== null ? JSON.parse(products) : []

    let updatedProductsArray

    if (productsArray.length) {
      const alreadyExists = productsArray.some(
        (item: string) => item === productId,
      )

      if (alreadyExists) {
        updatedProductsArray = productsArray
      } else {
        updatedProductsArray = [...productsArray, productId]

        if (updatedProductsArray.length > 10) {
          updatedProductsArray = updatedProductsArray.slice(1)
        }
      }

      getProductsList(updatedProductsArray)
    } else {
      updatedProductsArray = [productId]
    }

    localStorage.setItem('view-products', JSON.stringify(updatedProductsArray))
  }, [productId])

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

          <ViewedSlider data={productsData} />
        </div>
      </section>
      <Callback />
    </PageWrapper>
  )
}
