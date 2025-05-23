'use client'
import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLocateStore } from '@/store/useLocateStore'

import {
  TypeCallbackSchema,
  CallbackSchema,
} from '@/features/auth/schemes/callback.schema'
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
import { FastOrderTypes, useModalsStore } from '@/store/useModalsStore'
import { Textarea } from './ui/textarea'

interface Props {
  className?: string
  children?: React.ReactNode
  fastOrderProduct?: FastOrderTypes
}

export const FormCallback: React.FC<Props> = ({
  children,
  fastOrderProduct,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedCity } = useLocateStore()
  const { modalCallbackStateChange, modalMessageStateChange, showMessage } =
    useModalsStore()

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
        toast.success('Ваша заявка успешно создана!', {
          className: 'sonar-success',
        })
        form.reset()
      } else {
        toast.error('Ошибка при отправке формы.', {
          className: 'sonar-warn',
        })
      }
    } catch (error) {
      toast.error(`Ошибка при отправке формы. ${error}`, {
        className: 'sonar-warn',
      })
    } finally {
      setIsSubmitting(false)
      modalCallbackStateChange(false)
      modalMessageStateChange(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Имя"
                    autoComplete="given-name"
                    className="h-12"
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
                    className="h-12"
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
                    className="h-12"
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
                    className="h-12"
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

        {children}

        <Button
          type="submit"
          className="button font-base mb-4 h-12 w-full rounded p-5 text-lg"
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
  )
}
