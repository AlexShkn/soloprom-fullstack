import { Metadata } from 'next'
import { CardDataProps, ProductDetailsResponse } from '@/types/products.types'

import {
  getProductById,
  getAllProducts,
  getRecommendProducts,
} from '@/utils/api/products'
import { getReviewsByProductId, getReviewsByUserId } from '@/utils/api/reviews'
import { ProductPageClient } from './ProductPageClient'

type WordsAdapt = {
  category: {
    [key in CardDataProps['categoryName']]: string
  }
}

const wordsAdapt: WordsAdapt = {
  category: {
    tires: 'Шина',
    battery: 'Аккумулятор',
    oils: 'Масло',
  },
}

export type Params = {
  productId: string
}
export type ParamsPromise = Promise<Params>

export async function generateStaticParams() {
  const productsList = await getAllProducts()

  if (!productsList.length) {
    console.log(`Массив товаров пуст`)
    return []
  }

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
  return productsList.map((product: CardDataProps) => ({
    productId: String(product.productId),
  }))
}

interface MetaTypes {
  name: string
  categoryName: 'oils' | 'tires' | 'battery' // Enforce allowed category names
  productType: string
  models: string[]
  defaultPrice: number
}

const productsTypes = {
  oils: 'Масло',
  tires: 'Шина специальная',
  battery: 'Аккумулятор',
}

const getProductMetaData = (product: ProductDetailsResponse): string => {
  const { name, categoryName, productType, models, defaultPrice } = product

  return `${name} ${categoryName === 'oils' || categoryName === 'tires' || (categoryName === 'battery' && productsTypes[categoryName])} ${productType.toLowerCase()} ${models?.length ? `для ${models[0]}` : ''} за ${defaultPrice} руб. купить в СОЛОПРОМ. +7 (903) 656-93-93`
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

  return {
    title: `${wordsAdapt.category[product.categoryName]} ${product.productType.toLowerCase()} ${product.name} купить в Солопром`,
    description: getProductMetaData(product) || 'Описание товара отсутствует',
    openGraph: {
      title: `Купить ${product.name} `,
      description: getProductMetaData(product) || 'Описание товара отсутствует',
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${product.productId}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${product.img || 'not-found'}.webp`,
          alt: `${product.name} Категория`,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products/${product.productId}`,
    },
  }
}

interface ProductPageProps {
  params: ParamsPromise
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  const productData = await getProductById(productId)
  const reviewData = await getReviewsByProductId(productId)
  const recommendList = await getRecommendProducts(productId, 10)
  console.log(productData)

  if (!productData) {
    return (
      <div>
        <h1>{`Страница ${productId} не найдена`}</h1>
      </div>
    )
  }

  return (
    <ProductPageClient
      productData={productData}
      reviewData={reviewData}
      productId={productId}
      recommendList={recommendList || []}
    />
  )
}
