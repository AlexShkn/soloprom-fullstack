'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TypeOrderSchema, OrderSchema } from '@/features/auth/schemes'
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

export const OrderForm: React.FC = () => {
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

  const onSubmit = (values: TypeOrderSchema) => {
    console.log(values)
    toast.success('Форма отправлена!')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="cart-result-form">
        <div className="cart-result-form__wrapper">
          <div className="cart-result-form__fields modal-callback__fields">
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
          <div className="cart-result-form__options">
            <div className="cart-result-form__person">
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
                      <div className="radio__body">Физ.лицо</div>
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
                      <div className="radio__body">Юр.лицо</div>
                    </label>
                  </>
                )}
              />
            </div>

            <div className="cart-result-form__delivery">
              <div className="cart-result-form__subtitle">
                Транспортные компании:
              </div>
              <ul className="cart-result-form__delivery-list">
                <FormField
                  control={form.control}
                  name="deliveryMethods"
                  render={({ field }) => (
                    <>
                      <li className="cart-result-form__delivery-item">
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
                          <div className="cart-result-form__checkbox-body">
                            <img src="/img/icons/company/cdek.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li className="cart-result-form__delivery-item">
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
                          <div className="cart-result-form__checkbox-body">
                            <img
                              src="/img/icons/company/delovie-linii.png"
                              alt=""
                            />
                          </div>
                        </label>
                      </li>
                      <li className="cart-result-form__delivery-item">
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
                          <div className="cart-result-form__checkbox-body">
                            <img src="/img/icons/company/pek.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li className="cart-result-form__delivery-item">
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
                          <div className="cart-result-form__checkbox-body">
                            <img src="/img/icons/company/energiya.png" alt="" />
                          </div>
                        </label>
                      </li>
                      <li className="cart-result-form__delivery-item">
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
                          <div className="cart-result-form__checkbox-body">
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

        <Button type="submit" className="cart-result-form__button">
          <img src="/img/icons/buy.svg" alt="" />
          Отправить
        </Button>
      </form>
    </Form>
  )
}
