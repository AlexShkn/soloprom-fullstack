import { AdaptiveValues } from '@/utils/getAdaptiveValue'

export const sizeNameAdaptive: { [key: string]: string } = {
  tires: 'Размер',
  battery: 'ДхШхВ, мм',
  oils: 'Объём',
}
export const typeNameAdaptive: { [key: string]: string } = {
  tires: 'Тип шины',
  battery: 'Тип аккумулятора',
  oils: 'Тип жидкости',
}

export const productTypes = [
  { name: 'Шины', type: 'tires' },
  { name: 'АКБ', type: 'battery' },
  { name: 'Масла', type: 'oils' },
]

interface DtoTypes {
  [key: string]: string
}

export const ProductDto: DtoTypes = {
  tires: 'шин',
  battery: 'аккумуляторов',
  oils: 'масел',
}

export const ProductsArrays = {
  tires: [],
  battery: [],
  oils: [],
}

export enum ProductsCategory {
  TIRES = 'tires',
  BATTERY = 'battery',
  OILS = 'oils',
}

export const wordAdaptive: AdaptiveValues<{
  sizes: { tires: string; battery: string }
  types: { tires: string; battery: string; oils: string }
  catalogs: { tires: string; battery: string; oils: string }
}> = {
  sizes: {
    tires: 'Размерность',
    battery: 'ДхШхВ',
  },
  types: {
    tires: 'Тип шины',
    battery: 'Тип аккумулятора',
    oils: 'Тип жидкости',
  },
  catalogs: {
    tires: 'shini',
    battery: 'accumulyatori',
    oils: 'maslo',
  },
}
