import { ReviewsTypes } from '@/api/reviews'

interface Group {
  name: string
}

type GroupsList = Group[]

export interface ProductDescription {
  productId: string
  name: string
  text: string
  rating?: string
  models?: string[]
  options?: [string, string][]
}

export interface CardDataProps {
  productId: string
  url: string
  categoryName: string
  subcategoryName: string
  name: string
  descr: string
  images: string[]
  img: string
  groups: string[]
  delivery: string
  defaultPrice: number
  defaultSize: string
  models?: string[]
  productType: string
  brandName: string
  country: string
  size?: string
  load_index?: string
  weight?: string
  voltage?: string
  viscosity?: string
  container?: string
  plates?: string
  discount?: number
  regalia?: string[]
  isPopular?: boolean
  stock: number
  rating: number
  groupsList: GroupsList
}

export interface ProductDetailsResponse extends CardDataProps {
  id: string
  categoryId: string
  subcategoryId: string
  createdAt: string
  updatedAt: string
  productDescr: ProductDescription
  groupsList: GroupsList
}

export interface ApiResponse {
  products: CardDataProps[]
  totalCount: number
  currentPage?: number
  totalPages?: number
}

export interface ProductFullInfoResponse extends CardDataProps {
  productData: ProductDetailsResponse
  productReviews: ReviewsTypes[]
  relatedProducts: CardDataProps[]
  recommendProducts: CardDataProps[]
}

export interface ProductsCardPropTypes {
  cardData: CardDataProps
  mod?: string
}
export interface FilterData {
  types?: string[]
  brands?: string[]
  prices?: { min: number; max: number } | null
  sizes?: string[]
  plates?: string[]
  viscosity?: string[]
  voltage?: string[]
  container?: string[]
  models?: string[]
  countries?: string[]
  radiuses?: string[]
  categoryes?: string[]
  vehicleTypes?: string[]
}

export type FilterMethodOptionTypes = {
  label: string
  value: string
}

export type FilterMethodsTypes = {
  [key: string]: FilterMethodOptionTypes[]
}

export interface PageDataBenefits {
  h1: string
  firstText: string
  secondText: string
  bottomText: string
}

export interface FilterTabsCategory {
  label: string
  value: string
  icon: string
}

export interface PageDataTypes {
  pageType: 'category' | 'subcategory' | 'group' | 'brands' | 'model'
  category: string
  name: string
  title: string
  description: string
  img: string
  alt: string
  url: string
  subUrl?: string
  crumb: string
  headGroupTitle?: string
  benefits: PageDataBenefits
}

export interface FavoriteList {
  tires: CardDataProps[]
  battery: CardDataProps[]
  oils: CardDataProps[]
}
export interface FilteredBlockDataList {
  tires?: FilterData
  battery?: FilterData
  oils?: FilterData
}
export type FiltersState = {
  [key: string]: string[] | string | undefined
  categoryName?: 'tires' | 'battery'
}

export interface FavoriteProduct {
  productId: string
  storeId: string
  name: string
  price: number
  size: string
  url: string
  img: string
  categoryName: string
  productType: string
}

export interface ProductCardData {
  productId: string
  name: string
  price: number
  size: string
  url: string
  img: string
  productType: string
  categoryName: string
}
