export interface CardDataProps {
  productId: string
  url: string
  categoryName: string
  name: string
  descr: string
  img: string
  groups: string[]
  delivery: string
  sizes?: { [size: string]: number | undefined }
  defaultPrice: number
  volumes?: { [size: string]: number | undefined }
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
}

export interface ProductsCardPropTypes {
  cardData: CardDataProps
  mod?: string
}
export interface FilterData {
  types: string[]
  brands: string[]
  prices: { min: number; max: number } | null
  volumes: string[]
  sizes: string[]
  plates: string[]
  viscosity?: string[]
  voltage: number[]
  container: number[]
  models: string[]
  countries: string[]
  radiuses: string[]
  categoryes: string[]
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
}

export interface FavoriteList {
  tires: CardDataProps[]
  battery: CardDataProps[]
  oils: CardDataProps[]
}
export interface FavoriteProduct {
  productId: string
  storeId: string
  name: string
  price: number
  url: string
  variant: string
  img: string
  categoryName: string
  productType: string
}

export interface ProductCardData {
  productId: string
  name: string
  variant: string
  price: number
  url: string
  img: string
  productType: string
  categoryName: string
}
