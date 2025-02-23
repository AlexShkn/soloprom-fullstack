import { ProductCardData } from '@/types/products.types'

export const getCompareLocalStorage = (
  itemName: string,
): {
  tires: ProductCardData[]
  battery: ProductCardData[]
  oils: ProductCardData[]
} => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const compareJson = localStorage.getItem(itemName)
    try {
      return compareJson
        ? JSON.parse(compareJson)
        : { tires: [], battery: [], oils: [] }
    } catch (error) {
      console.error(
        'Ошибка при разборе данных сравнения из  localStorage:',
        error,
      )
      return { tires: [], battery: [], oils: [] }
    }
  } else {
    return { tires: [], battery: [], oils: [] }
  }
}
