import { Metadata } from 'next'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { cardDataProps } from '@/types/products.types'
import { ProductPageCard } from '@/components/ProductPage/ProductPageCard/ProductPageCard'
import { ProductPageTabs } from '@/components/ProductPage/ProductPageTabs/ProductPageTabs'
import { ProductPageBenefits } from '@/components/ProductPage/ProductPageBenefits/ProductPageBenefits'
import { getProductById, getAllProducts } from '@/utils/api/products'

type WordsAdapt = {
  category: {
    [key in cardDataProps['categoryName']]: string
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
  const response = await getAllProducts()

  if (!response || response.status !== 200) {
    console.log(
      `API request failed with status: ${response?.status}, returning empty array for static params`,
    )
    return []
  }
  if (!response || !Array.isArray(response)) {
    console.log(
      'Данные ответа не являются массивом и возвращают пустой массив для статических параметров',
    )
    return []
  }
  const products = response as cardDataProps[]
  if (products.some((product) => !product.productId)) {
    console.log('Some products missing productId, skipping')
    return []
  }
  return products.map((product: cardDataProps) => ({
    productId: String(product.productId),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise
}): Promise<Metadata> {
  const { productId } = await params
  const product = await getProductById(productId)

  console.log(`${product.productId}: `, product.productType)

  if (!product) {
    return {
      title: 'Страница товара не найдена',
      description: 'К сожалению, информация о этом товаре отсутствует.',
    }
  }

  return {
    title: `${wordsAdapt.category[product.categoryName]} ${product.productType.toLowerCase()} ${product.name}`,
    description: product.description || 'Описание товара отсутствует',
    openGraph: {
      title: `${product.name} `,
      description: product.description || 'Описание товара отсутствует',
      url: `https://soloprom.ru/products/${product.productId}`,
      images: [
        {
          url: `https://soloprom.ru/products/${product.productId}/category.png`,
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
