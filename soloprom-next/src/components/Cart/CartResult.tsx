'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getDigFormat } from '@/supports'
import { OrderForm } from './OrderForm/OrderForm'
import { type } from 'os'

type Props = {
  cartLength: number
  totalAmount: number
}

export const CartResult: React.FC<Props> = ({ cartLength, totalAmount }) => {
  const [formIsOpen, setFormIsOpen] = useState(false)

  return (
    <div className="cart__result">
      <div className="cart__result-out">
        <b>{`Выбран ${cartLength} товар`}</b> на сумму
        <b> {getDigFormat(totalAmount)}</b>₽
      </div>
      <button
        onClick={() => setFormIsOpen(true)}
        type="button"
        className={`button cart__order-btn ${formIsOpen && 'hidden'}`}
      >
        Оформить заказ
      </button>

      {formIsOpen && <OrderForm />}
    </div>
  )
}
