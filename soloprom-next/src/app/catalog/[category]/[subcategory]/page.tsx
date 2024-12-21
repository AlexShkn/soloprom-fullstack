import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'

import { categoriesList } from '../page'

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory?: string }
}) {
  const { category, subcategory } = await params
  const categoryData = categoriesList.find((cat) => cat.slug === category)

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  const subcategoryData = subcategory
    ? categoryData.subcategories.find((sub) => sub.slug === subcategory)
    : undefined

  const pageTitle = subcategoryData ? subcategoryData.title : categoryData.title
  const pageDescription = subcategoryData
    ? subcategoryData.description
    : categoryData.description

  return {
    title: `${pageTitle} | Категория`,
    description: pageDescription || 'Описание категории отсутствует',
    openGraph: {
      title: `${pageTitle} | Категория`,
      description: pageDescription || 'Описание категории отсутствует',
      url: `https://soloprom.ru/catalog/${category}${subcategory ? `/${subcategory}` : ''}`,
      images: [
        {
          url: `https://soloprom.ru/catalog/${category}/${subcategory || category}/category.png`,
          alt: pageTitle || 'Категория',
        },
      ],
    },
    alternates: {
      canonical: `https://soloprom.ru/catalog/${category}${subcategory ? `/${subcategory}` : ''}`,
    },
  }
}

export default async function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const { category, subcategory } = await params

  const categoryData = categoriesList.find((cat) => cat.slug === category)

  if (!categoryData) {
    return <h1>Категория не найдена</h1>
  }

  const subcategoryData = categoryData.subcategories.find(
    (sub) => sub.slug === subcategory,
  )

  if (!subcategoryData) {
    return <h1>Подкатегория не найдена</h1>
  }

  return (
    <div>
      <BreadCrumbs />
      <h1>{subcategoryData.title}</h1>
      <p>{subcategoryData.description}</p>
      <Callback />
    </div>
  )
}
