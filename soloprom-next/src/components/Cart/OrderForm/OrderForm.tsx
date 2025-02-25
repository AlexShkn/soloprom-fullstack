'use client'
import React, { useEffect, useState } from 'react'
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
  }, [isAuth, userState])

  const onSubmit = async (values: TypeOrderSchema) => {
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

          return
        }

        form.reset()
        clearCart()
        toast.success('Заказ успешно создан!')
      } else {
        form.reset()
        clearCart()
      }
    } catch (error) {
      toast.error('Ошибка при отправке формы.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="cart-result-form mt-5 flex w-full flex-col justify-center rounded p-5 shadow-custom"
      >
        <div className="cart-result-form__wrapper mb-7 grid w-full grid-cols-2 gap-7">
          <div className="mb-6 flex flex-col gap-6">
            <FormField
              control={form.control}
              name="family"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Фамилия"
                      autoComplete="family-name"
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Имя"
                      autoComplete="given-name"
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                  <img
                    src="/img/icons/st.svg"
                    alt=""
                    className="form-field-control__star"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patronymic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Отчество"
                      autoComplete="additional-name"
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-form-phone
                      placeholder="+7 (999) 999-99-99"
                      type="tel"
                      autoComplete="tel"
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                  <img
                    src="/img/icons/st.svg"
                    alt=""
                    className="form-field-control__star"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Почта"
                      {...field}
                      className="h-14"
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Адрес доставки"
                      autoComplete="shipping address"
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="cart-result-form__person grid grid-cols-2 gap-2.5">
              <FormField
                control={form.control}
                name="personType"
                render={({ field }) => (
                  <>
                    <label className="cart-result-form__radio radio">
                      <input
                        type="radio"
                        {...field}
                        value="Физ.лицо"
                        checked={field.value === 'Физ.лицо'}
                        onChange={() => form.setValue('personType', 'Физ.лицо')}
                      />
                      <div className="radio__checkmark"></div>
                      <div className="radio__body bg-200-100 bg-100-0 rounded-custom bg-white p-3 pl-14 font-bold shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-in-out hover:text-blue-500">
                        Физ.лицо
                      </div>
                    </label>
                    <label className="cart-result-form__radio radio">
                      <input
                        type="radio"
                        {...field}
                        value="Юр.лицо"
                        checked={field.value === 'Юр.лицо'}
                        onChange={() => form.setValue('personType', 'Юр.лицо')}
                      />
                      <div className="radio__checkmark"></div>
                      <div className="radio__body bg-200-100 bg-100-0 rounded-custom bg-white p-3 pl-14 font-bold shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-in-out hover:text-blue-500">
                        Юр.лицо
                      </div>
                    </label>
                  </>
                )}
              />
            </div>

            <div>
              <div className="mb-5 text-xl font-medium">
                Транспортные компании:
              </div>
              <ul className="flex flex-wrap gap-5">
                <FormField
                  control={form.control}
                  name="deliveryMethods"
                  render={({ field }) => (
                    <>
                      <li>
                        <label className="cart-result-form__checkbox">
                          <input
                            type="checkbox"
                            value="СДЭК"
                            checked={field.value?.includes('СДЭК')}
                            onChange={() => {
                              if (field.value?.includes('СДЭК')) {
                                form.setValue(
                                  'deliveryMethods',
                                  field.value?.filter(
                                    (item: string) => item !== 'СДЭК',
                                  ) || [],
                                )
                              } else {
                                form.setValue('deliveryMethods', [
                                  ...(field.value || []),
                                  'СДЭК',
                                ])
                              }
                            }}
                          />
                          <div className="cart-result-form__checkbox-checkmark"></div>
                          <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
                            <img src="/img/icons/company/cdek.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="cart-result-form__checkbox">
                          <input
                            type="checkbox"
                            value="Деловые линии"
                            checked={field.value?.includes('Деловые линии')}
                            onChange={() => {
                              if (field.value?.includes('Деловые линии')) {
                                form.setValue(
                                  'deliveryMethods',
                                  field.value?.filter(
                                    (item: string) => item !== 'Деловые линии',
                                  ) || [],
                                )
                              } else {
                                form.setValue('deliveryMethods', [
                                  ...(field.value || []),
                                  'Деловые линии',
                                ])
                              }
                            }}
                          />
                          <div className="cart-result-form__checkbox-checkmark"></div>
                          <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
                            <img
                              src="/img/icons/company/delovie-linii.png"
                              alt=""
                            />
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="cart-result-form__checkbox">
                          <input
                            type="checkbox"
                            value="ПЭК"
                            checked={field.value?.includes('ПЭК')}
                            onChange={() => {
                              if (field.value?.includes('ПЭК')) {
                                form.setValue(
                                  'deliveryMethods',
                                  field.value?.filter(
                                    (item: string) => item !== 'ПЭК',
                                  ) || [],
                                )
                              } else {
                                form.setValue('deliveryMethods', [
                                  ...(field.value || []),
                                  'ПЭК',
                                ])
                              }
                            }}
                          />
                          <div className="cart-result-form__checkbox-checkmark"></div>
                          <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
                            <img src="/img/icons/company/pek.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="cart-result-form__checkbox">
                          <input
                            type="checkbox"
                            value="Энергия"
                            checked={field.value?.includes('Энергия')}
                            onChange={() => {
                              if (field.value?.includes('Энергия')) {
                                form.setValue(
                                  'deliveryMethods',
                                  field.value?.filter(
                                    (item: string) => item !== 'Энергия',
                                  ) || [],
                                )
                              } else {
                                form.setValue('deliveryMethods', [
                                  ...(field.value || []),
                                  'Энергия',
                                ])
                              }
                            }}
                          />
                          <div className="cart-result-form__checkbox-checkmark"></div>
                          <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
                            <img src="/img/icons/company/energiya.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li>
                        <label className="cart-result-form__checkbox">
                          <input
                            type="checkbox"
                            value="Другая"
                            checked={field.value?.includes('Другая')}
                            onChange={() => {
                              if (field.value?.includes('Другая')) {
                                form.setValue(
                                  'deliveryMethods',
                                  field.value?.filter(
                                    (item: string) => item !== 'Другая',
                                  ) || [],
                                )
                              } else {
                                form.setValue('deliveryMethods', [
                                  ...(field.value || []),
                                  'Другая',
                                ])
                              }
                            }}
                          />
                          <div className="cart-result-form__checkbox-checkmark"></div>
                          <div className="cart-result-form__checkbox-body duration-250 transition-color duration-250 hover:bg-lefty overflow-hidden rounded-custom bg-white bg-gradient-to-r from-white to-white bg-[size:200%_100%] bg-right pl-7 font-bold shadow-md duration-1000 ease-in-out hover:shadow-lg">
                            <img src="/img/icons/company/other.png" alt="" />
                          </div>
                        </label>
                      </li>
                    </>
                  )}
                />
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
