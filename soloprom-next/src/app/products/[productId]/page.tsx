import { Metadata } from 'next'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { CardDataProps } from '@/types/products.types'
import { ProductPageCard } from '@/components/ProductPage/ProductPageCard'
import { ProductPageTabs } from '@/components/ProductPage/ProductPageTabs'
import { ProductPageBenefits } from '@/components/ProductPage/ProductPageBenefits'
import { getProductById, getAllProducts } from '@/utils/api/products'

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

  console.log(productsList.length)

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

const getProductMetaData = (product: MetaTypes): string => {
  const { name, categoryName, productType, models, defaultPrice } = product

  return `${name} ${productsTypes[categoryName]} ${productType.toLowerCase()} ${models.length ? `для ${models[0]}` : ''} за ${defaultPrice} руб. купить в СОЛОПРОМ. +7 (903) 656-93-93`
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
      url: `https://soloprom.ru/products/${product.productId}`,
      images: [
        {
          url: `https://soloprom.ru/img/catalog/${product.img || 'not-found'}.webp`,
          alt: `${product.title} Категория`,
        },
      ],
    },
    alternates: { canonical: `/products/${product.productId}` },
  }
}

interface ProductPageProps {
  params: ParamsPromise
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  const productData = await getProductById(productId)

  if (!productData) {
    return (
      <div>
        <h1>{`Страница ${productId} не найдена`}</h1>
      </div>
    )
  }

  return (
    <PageWrapper>
      <BreadCrumbs
        category={productData.categoryName}
        subcategory={productData.subcategoryName}
        name={productData.name}
        url={`/products/${productData.productId}`}
      />

      <section className="product-page">
        <div className="product-page__container">
          <ProductPageCard cardData={productData} />
          <ProductPageTabs productDescr={productData.productDescr} />
          <ProductPageBenefits />
        </div>
      </section>

      <Callback />
    </PageWrapper>
  )
}
