'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { TypeOrderSchema } from '@/features/auth/schemes'

interface InputFieldProps {
  name: keyof TypeOrderSchema
  placeholder?: string
  autoComplete?: string
  type?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  autoComplete,
  type = 'text',
}) => {
  const { control } = useFormContext<TypeOrderSchema>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={placeholder}
              autoComplete={autoComplete}
              type={type}
              className="h-14"
              {...field}
            />
          </FormControl>
          <FormLabel>
            <FormMessage />
          </FormLabel>
          {(name === 'name' || name === 'phone') && (
            <img
              src="/img/icons/st.svg"
              alt=""
              className="form-field-control__star"
            />
          )}
        </FormItem>
      )}
    />
  )
}
