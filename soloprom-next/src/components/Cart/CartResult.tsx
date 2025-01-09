'use client'
import { getDigFormat } from '@/supports'

type Props = {
  cartLength: number
  totalAmount: number
}

export const CartResult: React.FC<Props> = ({ cartLength, totalAmount }) => {
  return (
    <div className="cart__result">
      <div className="cart__result-out">
        <b>{`Выбран ${cartLength} товар`}</b> на сумму
        <b> {getDigFormat(totalAmount)}</b>₽
      </div>
    </div>
  )
}
