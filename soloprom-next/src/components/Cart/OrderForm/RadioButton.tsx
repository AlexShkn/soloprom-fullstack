// components/OrderForm/RadioButton.tsx
'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TypeOrderSchema } from '@/features/auth/schemes'

interface RadioButtonProps {
  value: TypeOrderSchema['personType']
  label: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({ value, label }) => {
  const { control, watch, setValue } = useFormContext<TypeOrderSchema>()

  return (
    <label className="cart-result-form__radio radio relative block cursor-pointer select-none">
      <input
        className="absolute h-0 w-0 cursor-pointer opacity-0"
        type="radio"
        value={value}
        checked={watch('personType') === value}
        onChange={() => setValue('personType', value)}
      />
      <div className="radio__checkmark absolute left-4 top-[50%] h-[22px] w-[22px] translate-y-[-50%] rounded transition-colors"></div>
      <div className="radio__body bg-200-100 bg-100-0 rounded-custom bg-white p-3 pl-14 font-bold shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-in-out hover:text-blue-500">
        {label}
      </div>
    </label>
  )
}
