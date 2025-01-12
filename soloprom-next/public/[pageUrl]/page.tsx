// import { Callback } from '@/components/Callback/Callback'
// import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'
// import PageWrapper from '@/app/PageWrapper'
// import { pagesData } from '../[category]/page'

// type DataType = {
//   title: string
//   description?: string
//   crumb: string
//   url: string
//   [key: string]: any
// }

// type ParamsType = {
//   params: { category: string; filter: string }
// }

// async function findPagesData(
//   category: string,
//   filter: string,
// ): Promise<DataType | undefined> {
//   const categoryData = pagesData[category]
//   if (!categoryData) return undefined

//   const searchArrays: (DataType[] | undefined)[] = [
//     categoryData.subcategories,
//     categoryData.group,
//     categoryData.brands,
//   ]

//   for (const searchArray of searchArrays) {
//     if (searchArray) {
//       const foundData = searchArray.find((item) => item.url === filter)
//       if (foundData) {
//         return foundData
//       }
//     }
//   }
//   return undefined
// }

// export async function generateMetadata({ params }: ParamsType) {
//   const { category, filter } = params

//   const foundData = await findPagesData(category, filter)

//   if (!foundData) {
//     return {
//       title: `Раздел ${filter} не найден`,
//       description: 'К сожалению, информация об этом разделе отсутствует.',
//     }
//   }

//   const pageTitle = foundData.title
//   const pageDescription = foundData.description

//   return {
//     title: `${pageTitle} | Категория`,
//     description: pageDescription || 'Описание раздела отсутствует',
//     openGraph: {
//       title: `${pageTitle} | Категория`,
//       description: pageDescription || 'Описание раздела отсутствует',
//       url: `https://soloprom.ru/catalog/${category}${filter ? `/${filter}` : ''}`,
//       images: [
//         {
//           url: `https://soloprom.ru/catalog/${category}/${filter || category}/category.png`,
//           alt: pageTitle || 'Раздел',
//         },
//       ],
//     },
//     alternates: {
//       canonical: `https://soloprom.ru/catalog/${category}${filter ? `/${filter}` : ''}`,
//     },
//   }
// }

// export default async function SubcategoryPage({ params }: ParamsType) {
//   const { category, filter } = params

//   const foundData = await findPagesData(category, filter)

//   if (!foundData) {
//     return <h1>Раздел {filter} не найден</h1>
//   }

//   return (
//     <PageWrapper>
//       <BreadCrumbs
//         category={category}
//         subcategory={foundData.title}
//         name={foundData.crumb}
//         url={foundData.url}
//       />
//       <h1>{foundData.title}</h1>
//       <p>{foundData.description}</p>
//       <Callback />
//     </PageWrapper>
//   )
// }
