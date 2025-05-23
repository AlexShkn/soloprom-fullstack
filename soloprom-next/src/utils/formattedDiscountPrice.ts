import { getDigFormat } from '@/supports'

export const formattedDiscountPrice = (
  price: number,
  discount: number,
  count: number = 1,
) => {
  if (!discount || !price) return

  return getDigFormat(Math.floor(price * (1 + discount / 100) * count))
}
