'use client'
import { CardDataProps } from '@/types/products.types'
import React from 'react'

interface Props {
  cardData: CardDataProps
}

export const ProductsCardSchemaOrg: React.FC<Props> = ({ cardData }) => {
  const {
    productId,
    url,
    name,
    img,
    defaultPrice,
    stock,
    rating,
    brandName,
    descr,
  } = cardData

  const schemaMarkup = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: name,
    image: `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${img}.webp`,
    description: descr || 'Описание отсутствует',
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    sku: productId,
    mpn: productId,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${url}`,
      priceCurrency: 'RUB',
      price: defaultPrice,
      availability: stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    review: rating
      ? {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: rating,
            bestRating: '5',
          },
          name: 'Product Review',
          author: { '@type': 'Person', name: 'Покупатель' },
        }
      : undefined,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaMarkup),
      }}
    />
  )
}
