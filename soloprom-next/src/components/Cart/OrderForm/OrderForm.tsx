'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TypeOrderSchema, OrderSchema } from '@/features/auth/schemes'
import { createOrder } from '@/utils/api/order'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'

import './OrderForm.scss'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

// Constants for delivery methods
const DELIVERY_METHODS = [
  { value: 'СДЭК', label: 'СДЭК', icon: '/img/icons/company/cdek.png' },
  {
    value: 'Деловые линии',
    label: 'Деловые линии',
    icon: '/img/icons/company/delovie-linii.png',
  },
  { value: 'ПЭК', label: 'ПЭК', icon: '/img/icons/company/pek.png' },
  {
    value: 'Энергия',
    label: 'Энергия',
    icon: '/img/icons/company/energiya.png',
  },
  { value: 'Другая', label: 'Другая', icon: '/img/icons/company/other.png' },
]

export const OrderForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { cartState, totalAmount, clearCart } = useCartStore()
  const { isAuth, userState } = useAuthStore()

  const form = useForm<TypeOrderSchema>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: '',
      phone: '',
      family: '',
      patronymic: '',
      email: '',
      address: '',
      personType: 'Физ.лицо',
      deliveryMethods: [],
    },
  })

  useEffect(() => {
    if (isAuth && userState) {
      form.setValue('email', userState.email)
    }
  }, [isAuth, userState, form.setValue])

  const onSubmit = useCallback(
    async (values: TypeOrderSchema) => {
      setIsSubmitting(true)

      try {
        const telegramResponse = await fetch('/api/routes/sendTelegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalAmount, cartState, ...values }),
        })

        if (!telegramResponse.ok) {
          toast.error('Ошибка при отправке формы.')
          return
        }

        toast.success('Форма успешно отправлена')

        if (isAuth) {
          const orderData = {
            userId: userState.id,
            products: cartState,
            totalAmount: totalAmount,
            status: 'PROCESSING',
          }

          const createdOrder = await createOrder(orderData)

          if (!createdOrder) {
            await fetch('/api/routes/sendTelegram', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: 'Ошибка при создании заказа в базе данных',
                orderData,
              }),
            })
            toast.error(
              'Ошибка при создании заказа в базе данных. Обратитесь к администратору.',
            ) // Notify the user of the error.
            return
          }

          toast.success('Заказ успешно создан!')
        }

        form.reset()
        clearCart()
      } catch (error) {
        console.error('Form submission error:', error)
        toast.error('Ошибка при отправке формы.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [isAuth, userState?.id, cartState, totalAmount, form, clearCart],
  )

  // Reusable Input Component
  const InputField = ({ name, placeholder, autoComplete, type }: any) => (
    <FormField
      control={form.control}
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
          {name === 'name' || name === 'phone' ? (
            <img
              src="/img/icons/st.svg"
              alt=""
              className="form-field-control__star"
            />
          ) : null}
        </FormItem>
      )}
    />
  )

  // Reusable Radio Button Component
  const RadioButton = ({ value, label }: any) => (
    <label className="cart-result-form__radio radio relative block cursor-pointer select-none">
      <input
        className="absolute h-0 w-0 cursor-pointer opacity-0"
        type="radio"
        value={value}
        checked={form.watch('personType') === value}
        onChange={() => form.setValue('personType', value)}
      />
      <div className="radio__checkmark absolute left-4 top-[50%] h-[22px] w-[22px] translate-y-[-50%] rounded transition-colors"></div>
      <div className="radio__body bg-200-100 bg-100-0 rounded-custom bg-white p-3 pl-14 font-bold shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-in-out hover:text-blue-500">
        {label}
      </div>
    </label>
  )

  const DeliveryMethodCheckbox = ({ method }: any) => (
    <li>
      <label className="cart-result-form__checkbox relative inline-block h-[75px] w-[105px] cursor-pointer select-none mds:h-[105px] mds:w-32">
        <input
          type="checkbox"
          className="absolute h-0 w-0 cursor-pointer opacity-0"
          value={method.value}
          checked={form.watch('deliveryMethods')?.includes(method.value)}
          onChange={() => {
            const currentValues = form.watch('deliveryMethods') || []
            if (currentValues.includes(method.value)) {
              form.setValue(
                'deliveryMethods',
                currentValues.filter((item: string) => item !== method.value),
              )
            } else {
              form.setValue('deliveryMethods', [...currentValues, method.value])
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="cart-result-form mt-5 flex w-full flex-col justify-center rounded p-5 shadow-custom"
      >
        <div className="mb-7 grid w-full grid-cols-1 gap-7 md:grid-cols-2">
          <div className="mb-6 flex flex-col gap-6">
            <InputField
              name="family"
              placeholder="Фамилия"
              autoComplete="family-name"
            />
            <InputField
              name="name"
              placeholder="Имя"
              autoComplete="given-name"
            />
            <InputField
              name="patronymic"
              placeholder="Отчество"
              autoComplete="additional-name"
            />
            <InputField
              name="phone"
              placeholder="+7 (999) 999-99-99"
              type="tel"
              autoComplete="tel"
            />
            <InputField name="email" placeholder="Почта" type="email" />
            <InputField
              name="address"
              placeholder="Адрес доставки"
              autoComplete="shipping address"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="cart-result-form__person grid grid-cols-1 gap-2.5 xs:grid-cols-2">
              <RadioButton value="Физ.лицо" label="Физ.лицо" />
              <RadioButton value="Юр.лицо" label="Юр.лицо" />
            </div>

            <div>
              <div className="mb-5 text-xl font-medium">
                Транспортные компании:
              </div>
              <ul className="flex flex-wrap gap-5">
                {DELIVERY_METHODS.map((method) => (
                  <DeliveryMethodCheckbox key={method.value} method={method} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="mx-auto my-0 h-12 w-full max-w-96 gap-2.5 px-7 py-4 text-lg font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
          <img className="h-7 w-7" src="/img/icons/buy.svg" alt="" />
        </Button>
      </form>
    </Form>
  )
}
