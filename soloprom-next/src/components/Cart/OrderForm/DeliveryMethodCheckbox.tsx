// components/OrderForm/DeliveryMethodCheckbox.tsx
'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TypeOrderSchema } from '@/features/auth/schemes'

interface DeliveryMethod {
  value: string
  label: string
  icon: string
}

interface DeliveryMethodCheckboxProps {
  method: DeliveryMethod
}

export const DeliveryMethodCheckbox: React.FC<DeliveryMethodCheckboxProps> = ({
  method,
}) => {
  const { control, watch, setValue } = useFormContext<TypeOrderSchema>()

  return (
    <li>
      <label className="cart-result-form__checkbox relative inline-block h-[75px] w-[105px] cursor-pointer select-none mds:h-[105px] mds:w-32">
        <input
          type="checkbox"
          className="absolute h-0 w-0 cursor-pointer opacity-0"
          value={method.value}
          checked={watch('deliveryMethods')?.includes(method.value)}
          onChange={() => {
            const currentValues = watch('deliveryMethods') || []
            if (currentValues.includes(method.value)) {
              setValue(
                'deliveryMethods',
                currentValues.filter((item: string) => item !== method.value),
              )
            } else {
              setValue('deliveryMethods', [...currentValues, method.value])
            }
          }}
        />
        <div className="cart-result-form__checkbox-checkmark absolute left-2.5 top-2.5 h-[22] w-[22] rounded bg-white transition-colors"></div>
        <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
          <img
            className="h-full w-full object-cover"
            src={method.icon}
            alt={method.label}
          />
        </div>
      </label>
    </li>
  )
}
