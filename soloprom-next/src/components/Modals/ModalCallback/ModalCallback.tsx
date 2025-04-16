'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  TypeCallbackSchema,
  CallbackSchema,
} from '@/features/auth/schemes/callback.schema'

import CloseButton from '@/components/ui/CloseButton'
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
import './ModalCallback.scss'
import { FastOrderTypes, useModalsStore } from '@/store/modalsStore'
import { getDigFormat } from '@/supports'
import { useLocateStore } from '@/store/locateStore'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'

interface ModalProps {
  fastOrderProduct: FastOrderTypes
}

const ModalCallback: React.FC<ModalProps> = ({ fastOrderProduct }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedCity } = useLocateStore()
  const { modalCallbackStateChange, modalMessageStateChange, showMessage } =
    useModalsStore()

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => {
    modalCallbackStateChange(false)
    modalMessageStateChange(false)
  })

  const isMobileHeight = useMediaQuery('(max-width: 650px)')

  const form = useForm<TypeCallbackSchema>({
    resolver: zodResolver(CallbackSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      message: '',
    },
  })

  useEffect(() => {
    if (selectedCity) {
      form.setValue('address', selectedCity)
    }
  }, [selectedCity, form.setValue])

  const onSubmit = async (values: TypeCallbackSchema) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/routes/sendTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fastOrder: fastOrderProduct, ...values }),
      })

      if (response.ok) {
        toast.success('Форма успешно отправлена!')
        form.reset()
      } else {
        toast.error('Ошибка при отправке формы.')
      }
    } catch (error) {
      toast.error(`Ошибка при отправке формы. ${error}`)
    } finally {
      setIsSubmitting(false)
      modalCallbackStateChange(false)
      modalMessageStateChange(false)
    }
  }

  return (
    <div className={`modal-callback modal fade show z-[99999]`}>
      {!isMobileHeight && <CloseButton classNames={'modal__close'} />}
      <div
        ref={modalRef}
        className="modal-callback__dialog modal__dialog relative mx-auto my-2.5 w-full sm:mb-5 sm:mt-[50px] sm:max-w-[560px]"
      >
        <div className="modal__content relative overflow-hidden rounded-custom bg-white px-4 py-10 xs:px-6 mds:px-11 mds:py-10">
          {isMobileHeight && <CloseButton classNames={'modal__close'} />}

          <div className="modal-callback__body">
            <div className="mb-7">
              <div className="modal-callback__title mb-2.5 text-center font-medium leading-10 text-black">
                Оставьте свои контактные данные
              </div>
              <div className="text-center text-sm leading-5 text-[#313131] mds:text-base">
                Наш менеджер свяжется с вами в течении 5 минут и ответит на все
                вопросы
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-6 flex flex-col gap-6">
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
                            placeholder="Город"
                            autoComplete="city"
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

                  {showMessage && (
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Ваш вопрос"
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormLabel>
                            <FormMessage />
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {fastOrderProduct.productId && (
                  <div className="mb-5 flex items-center gap-2.5">
                    <Image
                      src={
                        fastOrderProduct.img
                          ? `/img/catalog/${fastOrderProduct.img}.webp`
                          : '/img/catalog/not-found.webp'
                      }
                      width={96}
                      height={96}
                      alt=""
                      className="h-24 w-24 object-contain"
                    />
                    <div className="flex flex-col gap-2.5">
                      <div className="text-base font-medium mds:text-lg">
                        {fastOrderProduct.name}
                      </div>
                      <div className="">{fastOrderProduct.variant}</div>
                      <div className="font-medium">
                        {getDigFormat(fastOrderProduct.price)} ₽
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="button font-base mb-6 h-14 w-full rounded p-5 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
                <div className="text-center text-sm leading-5">
                  Нажимая кнопку отправить, вы принимаете нашу политику{' '}
                  <a
                    href="/policy"
                    className="text-[#ff8562] transition-colors hover:text-accentBlue"
                  >
                    конфиденциальности
                  </a>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCallback
