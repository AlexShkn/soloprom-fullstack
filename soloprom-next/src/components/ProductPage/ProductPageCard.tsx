'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductsCardPropTypes } from '@/types/products.types'
import { ProductPageCardDescription } from './ProductPageCardDescription'
import { RegaliaList } from '@/components/ProductsCard/RegaliaList'
import { ProductsPageOffers } from './ProductsPageOffers'
import { ProductPageSideBlock } from './ProductPageSideBlock'

export const ProductPageCard: React.FC<ProductsCardPropTypes> = ({
  cardData,
}) => {
  const {
    productId,
    url,
    name,
    img,
    categoryName,
    regalia = [],
    sizes,
    defaultPrice,
    volumes,
    discount,
    images,
    productType,
    rating,
    stock,
  } = cardData

  const [mainImage, setMainImage] = useState(img)

  const sizesData = sizes || volumes
  const sizesIsLength = sizesData && Object.keys(sizesData).length > 1

  let defaultSize: string | undefined = undefined

  useEffect(() => {
    if (sizesData) {
      defaultSize = Object.keys(sizesData)?.[0]
    }
  }, [])

  return (
    <div className="product-page-card border-1 mb-7 border-b border-accentBlue">
      <div className="mb-7 text-[clamp(1.5rem,1.3022rem+0.6593vw,1.875rem)] font-bold">
        {name}
      </div>
      <div className={`product-page-card__wrapper mb-5`}>
        <div className="relative mb-5 grid items-start lg:grid-cols-[1fr,350px] lg:gap-10">
          <div
            className={`relative mb-5 flex max-w-[900px] flex-col gap-5 lg:flex-row ${!sizesIsLength && 'items-start'}`}
          >
            <div className="flex flex-col gap-4">
              <div
                className={`relative justify-center gap-2 pt-10 ${!sizesIsLength ? 'inline-flex' : 'flex'}`}
              >
                {rating > 1 && (
                  <div className="absolute right-2.5 top-2.5 z-10 flex justify-end text-2xl font-bold text-accentBlue">
                    {rating}
                    <img
                      className="mb-1 h-4 w-5"
                      src="/img/icons/star.svg"
                      alt=""
                    />
                  </div>
                )}
                {regalia.length > 0 && (
                  <RegaliaList regalia={regalia} discount={discount} />
                )}

                <div
                  className={`relative flex flex-auto ${!sizesIsLength ? '' : 'justify-center'}`}
                >
                  <Image
                    className="product-page-card__image aspect-square h-60 w-60 object-contain xl:h-56 xl:w-56"
                    src={
                      (img && `/img/catalog/${mainImage}.webp`) ||
                      `/img/catalog/image-null/${categoryName}.webp`
                    }
                    alt=""
                    width={240}
                    height={240}
                  />
                </div>
              </div>
              {images?.length ? (
                <div className="flex items-center justify-between gap-1">
                  <Image
                    src={
                      (img && `/img/catalog/${img}.webp`) ||
                      `/img/catalog/image-null/${categoryName}.webp`
                    }
                    onClick={() => setMainImage(img)}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 cursor-pointer object-contain"
                  />
                  {images.map((image) => (
                    <Image
                      key={image}
                      src={`/img/catalog/${categoryName}/${productId}/${productId}-${image}.jpg`}
                      onClick={() =>
                        setMainImage(
                          `${categoryName}/${productId}/${productId}-${image}`,
                        )
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 cursor-pointer object-contain"
                    />
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="flex w-full flex-col gap-5">
              <ProductPageCardDescription cardData={cardData} />
              {sizesIsLength && <ProductsPageOffers cardData={cardData} />}
            </div>
          </div>

          <ProductPageSideBlock cardData={cardData} />
        </div>
      </div>
      <div
        itemScope
        itemType="http://schema.org/Product"
        aria-hidden="true"
        className="hidden"
      >
        <meta itemProp="name" content={name} />
        <meta itemProp="description" content={name} />
        <meta itemProp="productID" content={productId} />
        <meta itemProp="sku" content={defaultSize} />

        <link
          itemProp="image"
          href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${img}.jpg`}
        />

        <div itemProp="offers" itemScope itemType="http://schema.org/Offer" />
        <meta itemProp="price" content={defaultPrice.toString()} />
        <link
          itemProp="url"
          href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${productId}`}
        />
        <meta itemProp="priceCurrency" content="RUR" />
        <link itemProp="availability" href="https://schema.org/InStock" />
      </div>
    </div>
  )
}
