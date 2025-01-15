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

  // Debug: Log the API Response to inspect
  // console.log('API response from getAllProducts:', response);
  if (!response || response.status !== 200) {
    console.log(
      `API request failed with status: ${response?.status}, returning empty array for static params`,
    )
    return []
  }
  // Проверяем, есть ли data и products
  if (!response?.data || !Array.isArray(response?.data)) {
    console.log(
      'Response data is not an array, returning empty array for static params',
    )
    return []
  }
  const products = response.data as cardDataProps[]
  // Проверка, что у каждого продукта есть productId
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
          <ProductPageTabs
            category={productData.categoryName}
            productId={productData.productId}
          />
          <ProductPageBenefits />
        </div>
      </section>

      <Callback />
    </PageWrapper>
  )
}
