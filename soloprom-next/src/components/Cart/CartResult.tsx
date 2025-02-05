'use client'
import { getDigFormat } from '@/supports'

type Props = {
  cartLength: number
  totalAmount: number
}

export const declension = (num: number, forms: [string, string, string]) => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms[2]
  }
  if (lastDigit === 1) {
    return forms[0]
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }
  return forms[2]
}

export const CartResult: React.FC<Props> = ({ cartLength, totalAmount }) => {
  const productWord = declension(cartLength, ['товар', 'товара', 'товаров'])

  return (
    <div className="cart flex flex-col items-center">
      <div className="mb-7 text-[clamp(1.125rem,0.9272rem+0.6593vw,1.5rem)] leading-5">
        <b className="whitespace-nowrap">{`Выбрано ${cartLength} ${productWord}`}</b>{' '}
        на сумму
        <b className="whitespace-nowrap"> {getDigFormat(totalAmount)}</b> ₽
      </div>
    </div>
  )
}
