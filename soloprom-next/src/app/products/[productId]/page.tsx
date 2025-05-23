import { Metadata } from 'next'
import { CardDataProps, ProductDetailsResponse } from '@/types/products.types'
const fs = require('fs')
const IS_PROD = process.env.NEXT_PUBLIC_CLIENT_URL === 'production'

import {
  getProductById,
  getAllProducts,
  getProductFullInfoById,
  getRecommendProducts,
  getProductSizes,
} from '../../../api/products'
import { ProductPageClient } from './ProductPageClient'
import { generateYmlFeed } from '@/supports/feed-generator'
import { redirect } from 'next/navigation'
import { getReviewsByProductId } from '@/api/reviews'

type WordsAdapt = {
  category: {
    [key in CardDataProps['categoryName']]: string
  }
}

export type Params = {
  productId: string
}

export type ParamsPromise = Promise<Params>

interface ProductPageProps {
  params: ParamsPromise
}

const wordsAdapt: WordsAdapt = {
  category: {
    tires: 'Шина',
    battery: 'Аккумулятор',
    oils: 'Масло',
  },
}

const productsTypes = {
  oils: 'Масло',
  tires: 'Шина специальная',
  battery: 'Аккумулятор',
}

export async function generateStaticParams() {
  const productsList = await getAllProducts()

  if (!productsList.length) {
    console.log(`Массив товаров пуст`)
    return []
  }

  // if (IS_PROD) {
  const urlList = productsList.map(
    (product) => `${process.env.NEXT_PUBLIC_CLIENT_URL}${product.url}`,
  )

  fs.writeFileSync(
    'public/products-list.json',
    JSON.stringify(urlList, null, 2),
  )

  if (!productsList || !Array.isArray(productsList)) {
    console.log(
      'Данные ответа не являются массивом и возвращают пустой массив для статических параметров',
    )
    return []
  }

  if (productsList.some((product) => !product.productId)) {
    console.log(
      'В некоторых продуктах отсутствует идентификатор продукта, пропускается',
    )
    return []
  }

  try {
    const ymlFeed = await generateYmlFeed(productsList)

    // Сохранение YML фида в файл
    fs.writeFileSync('public/yandex-market.xml', ymlFeed) //Сохраняем в корень public, чтобы был доступен по URL

    console.log(
      'YML фид успешно сгенерирован и сохранен в public/yandex-market.xml',
    )
  } catch (error) {
    console.error('Ошибка при генерации YML фида:', error)
    // Обработайте ошибку, например, верните пустой массив или бросьте исключение
    return []
  }
  // }

  return productsList.map((product: CardDataProps) => ({
    productId: String(product.productId),
  }))
}

const getProductMetaData = (product: ProductDetailsResponse): string => {
  const {
    descr,
    categoryName,
    productType,
    models,
    defaultPrice,
    defaultSize,
  } = product

  return `${descr} ${['battery', 'oils'].includes(categoryName) ? defaultSize : ''} ${productType.toLowerCase()} ${models?.length ? `для ${models[0]}` : ''} за ${defaultPrice} руб. купить в СОЛОПРОМ. +7 (903) 656-93-93`
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { productId } = await params
  const product = await getProductById(productId)

  if (!product) {
    return {
      title: 'Страница товара не найдена',
      description: 'К сожалению, информация о этом товаре отсутствует.',
    }
  }

  const productType = product.productType

  return {
    title: `${product.descr} ${['battery', 'oils'].includes(product.categoryName) ? product.defaultSize : ''} купить в Солопром`,
    description: getProductMetaData(product) || 'Описание товара отсутствует',
    openGraph: {
      title: `Купить ${product.name} в soloprom.ru `,
      description: getProductMetaData(product) || 'Описание товара отсутствует',
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${product.productId}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${product.img || 'not-found'}.webp`,
          alt: `${product.name}`,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${product.productId}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params

  // const { productData, relatedProducts, productReviews, recommendProducts } =
  //   await getProductFullInfoById(productId)

  const productData = await getProductById(productId)
  const productSizes = await getProductSizes(productId)
  const reviewData = await getReviewsByProductId(productId)
  const recommendList = await getRecommendProducts(productId, 10)
  const relatedProducts = productSizes.filter(
    (product) => product.productId !== productId,
  )

  // const productSizes = relatedProducts.filter(
  //   (product) => product.productId !== productId,
  // )

  if (!productData) {
    redirect(`/not-found?productId=${productId}`)
  }

  return (
    <ProductPageClient
      productData={productData}
      reviewData={reviewData}
      productId={productId}
      recommendList={recommendList || []}
      relatedProducts={relatedProducts}
    />
  )
}
