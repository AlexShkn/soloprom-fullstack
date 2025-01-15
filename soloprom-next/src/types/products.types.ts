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
  brand: string
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
}

export interface ProductsCardPropTypes {
  cardData: cardDataProps
  mod?: string
}
