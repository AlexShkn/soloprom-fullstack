import { Metadata } from 'next'
import { Callback } from '@/components/Callback/Callback'
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
import PageWrapper from '@/app/PageWrapper'

export interface Subcategory {
  slug: string
  title: string
  description: string
}

export interface Category {
  slug: string
  title: string
  description: string
  subcategories: Subcategory[]
}

export const categoriesList: Category[] = [
  {
    slug: 'tires',
    title: 'Шины',
    description: '',
    subcategories: [
      { slug: 'shini-celnolitie', title: 'Шины цельнолитые', description: '' },
      // ... другие подкатегории шин
    ],
  },
  {
    slug: 'battery',
    title: 'Аккумуляторы',
    description: '',
    subcategories: [], // пока пусто
  },
  {
    slug: 'oils',
    title: 'Масла',
    description: '',
    subcategories: [], // пока пусто
  },
]

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const { category } = await params // Destructure here for clarity
  const categoryName = categoriesList.find((doc) => doc.slug === category)

  if (!categoryName) {
    return {
      title: 'Категория не найдена',
      description: 'К сожалению, информация об этой категории отсутствует.',
    }
  }

  return {
    title: `${categoryName.title} Категория`,
    description: categoryName.description || 'Описание категории отсутствует',
    openGraph: {
      title: `${categoryName.title} Категория`,
      description: categoryName.description || 'Описание категории отсутствует',
      url: `https://soloprom.ru/catalog/${category}`,
      images: [
        {
          url: `https://soloprom.ru/catalog/${categoryName.slug}/category.png`,
          alt: categoryName.title || 'Категория',
        },
      ],
    },

    alternates: { canonical: `/catalog/${category}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = await params
  const categoryName = categoriesList.find((cat) => cat.slug === category)

  if (!categoryName) {
    return (
      <div>
        <h1>Страница не найдена</h1>
      </div>
    )
  }

  return (
    <PageWrapper>
      <BreadCrumbs />
      <h1>{categoryName.title}</h1>
      <Callback />
    </PageWrapper>
  )
}
