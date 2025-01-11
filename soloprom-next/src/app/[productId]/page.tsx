// app/catalog/[productId]/page.tsx
import { Metadata } from 'next'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'
import { getProducts } from '@/app/api/products/products' // Import Product type
import { cardDataProps } from '@/types/products.types'
import { cache } from 'react'
import { ProductPageCard } from '@/components/ProductPage/ProductPageCard/ProductPageCard'
import { ProductPageTabs } from '@/components/ProductPage/ProductPageTabs/ProductPageTabs'
import { ProductPageBenefits } from '@/components/ProductPage/ProductPageBenefits/ProductPageBenefits'

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

const getCachedProducts = cache(async () => {
  return await getProducts()
})

export async function generateMetadata({
  params,
}: {
  params: { productId: string }
}): Promise<Metadata> {
  const { productId } = await params
  const products = await getCachedProducts()
  const product = products.find((p: cardDataProps) => p.productId === productId)

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
      url: `https://soloprom.ru/${product.productId}`,
      images: [
        {
          url: `https://soloprom.ru/${product.productId}/category.png`,
          alt: `${product.title} Категория`,
        },
      ],
    },
    alternates: { canonical: `/${product.productId}` },
  }
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = await params
  const products = await getCachedProducts()

  const productData = products.find(
    (p: cardDataProps) => p.productId === productId,
  ) // Use Product type

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
        url={productData.url}
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
