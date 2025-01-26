export interface cardDataProps {
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
  cardData: cardDataProps
  mod?: string
}
export interface FilterData {
  types: string[]
  brands: string[]
  prices: { min: number; max: number } | null
  volumes: string[]
  sizes: string[]
  plates: string[]
  voltage: number[]
  container: number[]
  models: string[]
  countries: string[]
  radiuses: string[]
}

export interface PageDataTypes {
  pageType: 'category' | 'subcategory' | 'group' | 'brands'
  category: string
  name: string
  title: string
  description: string
  img: string
  alt: string
  url: string
  crumb?: string
  headGroupTitle?: string
}

export interface FavoriteList {
  tires: cardDataProps[]
  battery: cardDataProps[]
  oils: cardDataProps[]
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
