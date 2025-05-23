'use client'
import React, { useEffect, useState } from 'react'

import { CardDataProps } from '@/types/products.types'
import { getViewProductsByIds } from '@/api/products'
import { ProductListSlider } from './ProductListSlider/ProductListSlider'

interface Props {
  productId?: string
}

export const ViewedSlider: React.FC<Props> = ({ productId }) => {
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

    if (productId) {
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

      localStorage.setItem(
        'view-products',
        JSON.stringify(updatedProductsArray),
      )
    } else {
      getProductsList(productsArray)
    }
  }, [])

  return (
    <>
      {productsData?.length ? (
        <section className="section-offset">
          <div className="list__container">
            <h2 className="section-title">Просмотренные</h2>
            <ProductListSlider listData={productsData} mod={'grid'} />
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}
