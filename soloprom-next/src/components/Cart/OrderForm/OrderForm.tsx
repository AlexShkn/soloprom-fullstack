'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'sonner'
import { TypeOrderSchema, OrderSchema } from '@/features/auth/schemes'
import { createOrder } from '@/utils/api/order'

import { Button } from '@/components/ui'

import './OrderForm.scss'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { InputField } from './InputField'
import { RadioButton } from './RadioButton'
import { DeliveryMethodCheckbox } from './DeliveryMethodCheckbox'

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
            )
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

  return (
    <FormProvider {...form}>
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
    </FormProvider>
  )
}
