// import { Metadata } from 'next'
// import pagesDataImport from '@/data/products/pagesData.json'
// import { CategoryPageClient } from './client'

// export interface Subcategory {
//   title: string
//   description: string
//   img: string
//   alt: string
//   url: string
//   crumb: string
// }

// export interface Group {
//   title: string
//   description: string
//   headGroupTitle?: string
//   img: string
//   alt: string
//   url: string
//   crumb: string
// }

// export interface Brand {
//   title: string
//   description: string
//   img: string
//   alt: string
//   url: string
//   crumb: string
// }

// export interface CategoryData {
//   name: string
//   title: string
//   description: string
//   img: string
//   alt: string
//   subcategories?: Subcategory[]
//   group?: Group[]
//   brands?: Brand[]
// }

// export interface Categories {
//   [key: string]: CategoryData
// }

// export const pagesData = pagesDataImport as Categories

// export async function generateMetadata({
//   params,
// }: {
//   params: { category: string }
// }): Promise<Metadata> {
//   const { category } = await params
//   const categoryData = pagesData[category]

//   if (!categoryData) {
//     return {
//       title: 'Категория не найдена',
//       description: 'К сожалению, информация об этой категории отсутствует.',
//     }
//   }

//   return {
//     title: `${categoryData.title} Категория`,
//     description: categoryData.description || 'Описание категории отсутствует', // Use  for default
//     openGraph: {
//       title: `${categoryData.title} Категория`,
//       description: categoryData.description || 'Описание категории отсутствует',
//       url: `https://soloprom.ru/catalog/${category}`,
//       images: [
//         {
//           url: `https://soloprom.ru/catalog/${categoryData.name}/category.png`,
//           alt: categoryData.title || 'Категория',
//         },
//       ],
//     },
//     alternates: { canonical: `/catalog/${category}` },
//   }
// }
// // Для SSG нужно указать возможные значения параметров
// export async function generateStaticParams() {
//   return Object.keys(pagesData).map((category) => ({
//     category,
//   }))
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string }
// }) {
//   const { category } = await params
//   const categoryData = pagesData[category]
//   return <CategoryPageClient categoryData={categoryData} />
// }
