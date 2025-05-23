'use client'
import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardDataProps, ProductsCardPropTypes } from '@/types/products.types'
import { ProductPageCardDescription } from './ProductPageCardDescription'
import { RegaliaList } from '@/components/ProductsCard/RegaliaList'
import { ProductsPageOffers } from './ProductsPageOffers'
import { ProductPageSideBlock } from './ProductPageSideBlock'
import initialCategoriesData from '../../data/products/categoriesData.json'
import { CategoriesData } from '../CategoriesSliders/CategoriesSliders'
import { ReviewsTypes } from '@/api/reviews'
import { getProductById } from '@/api/products'
const categoriesData = initialCategoriesData as CategoriesData

interface Props extends ProductsCardPropTypes {
  relatedProducts: CardDataProps[]
  reviewData: ReviewsTypes[]
}

export const ProductPageCard: React.FC<Props> = ({
  cardData,
  relatedProducts,
  reviewData,
}) => {
  const {
    productId,
    name,
    img,
    descr,
    categoryName,
    regalia = [],
    defaultPrice,
    defaultSize,
    discount = 0,
    images,
    rating,
    groupsList,
    stock,
  } = cardData

  const [mainImage, setMainImage] = useState(img)
  const [updatePrice, setUpdatePrice] = useState(defaultPrice)
  const [updateStock, setUpdateStock] = useState(stock)
  const [updateRating, setUpdateRating] = useState(rating)
  const [updateDiscount, setUpdateDiscount] = useState(discount)
  const [updateRegalia, setUpdateRegalia] = useState(regalia)

  const schemaOrgJSONLD = useMemo(() => {
    const price = defaultPrice
    const imageUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${mainImage}.webp`
    const availability =
      stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'

    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: name,
      image: [imageUrl],
      description: descr,
      sku: defaultSize,
      mpn: productId,
      brand: {
        '@type': 'Brand',
        name: cardData.brandName,
      },
      review: reviewData.map((review) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.userName },
        datePublished: review.createdAt,
        reviewBody: review.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.estimation,
          bestRating: '5',
        },
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewData.length,
      },
      offers: {
        '@type': 'Offer',
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${productId}`,
        priceCurrency: 'RUB',
        price: price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: availability,
        seller: {
          '@type': 'Organization',
          name: 'Солопром',
        },
      },
    }
  }, [
    name,
    img,
    descr,
    defaultSize,
    productId,
    cardData.brandName,
    defaultPrice,
    rating,
    mainImage,
    reviewData,
  ])

  useEffect(() => {
    const updateProductDetails = async () => {
      const product = await getProductById(productId)

      try {
        setUpdatePrice(product.defaultPrice)
        setUpdateStock(product.stock)
        setUpdateRating(product.rating)
        setUpdateDiscount(product.discount ?? 0)
        setUpdateRegalia(product.regalia ?? [])
      } catch (error) {
        console.warn(`ошибка получения продукта по id:${productId}`, error)
      }
    }

    updateProductDetails()
  }, [])

  return (
    <div className="product-page-card w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />

      <h1 className="mb-7 text-[clamp(1.5rem,1.3022rem+0.6593vw,1.875rem)] font-bold">
        {name} {['oils', 'battery'].includes(categoryName) ? defaultSize : ''}
      </h1>
      <div className="rounded-custom bg-white shadow-full md:p-5">
        <ul className="flex flex-wrap items-center gap-2">
          {groupsList.map((group) => {
            const item = categoriesData[categoryName].items.find(
              (el) => el.id === group.name,
            )

            return item ? (
              <li key={group.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-custom bg-accentBlue px-2.5 py-1 text-ss font-medium text-white"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <div className="flex flex-col gap-1 leading-none">
                    <span className="text-[10px] text-gray-300">
                      {categoriesData[categoryName].abbreviated}
                    </span>
                    <span className="font-medium">{item.short}</span>
                  </div>
                </Link>
              </li>
            ) : (
              ''
            )
          })}
        </ul>

        <div className={`product-page-card__wrapper mb-5`}>
          <div className="relative mb-5 grid items-start lg:grid-cols-[1fr,350px] lg:gap-10">
            <div
              className={`relative mb-5 flex max-w-[900px] flex-col gap-5 lg:flex-row`}
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`relative inline-flex justify-center gap-2 pt-10`}
                >
                  {updateRegalia.length > 0 && (
                    <RegaliaList regalia={updateRegalia} discount={discount} />
                  )}

                  <div
                    className={`relative flex flex-auto justify-center lg:justify-start`}
                  >
                    <Image
                      className="product-page-card__image aspect-square h-60 w-60 object-contain xl:h-56 xl:w-56"
                      src={
                        (img && `/img/catalog/${mainImage}.webp`) ||
                        `/img/catalog/image-null/${categoryName}.webp`
                      }
                      alt={defaultSize}
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
                <ProductPageCardDescription
                  cardData={cardData}
                  rating={updateRating}
                />
                {relatedProducts.length ? (
                  <ProductsPageOffers
                    cardData={cardData}
                    relatedProducts={relatedProducts}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>

            <ProductPageSideBlock
              cardData={cardData}
              defaultPrice={updatePrice}
              discount={updateDiscount}
              stock={updateStock}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
