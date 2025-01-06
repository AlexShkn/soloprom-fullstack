'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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

import { useNewPasswordMutation } from '@/hooks/auth/useNewPasswordMutation'
import { NewPasswordSchema, TypeNewPasswordSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'
import { RegisterFormProps } from './RegisterForm'

export function NewPasswordForm({ siteKey }: RegisterFormProps) {
  const { theme } = useTheme()
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const { newPassword, isLoadingNew } = useNewPasswordMutation()

  const onSubmit = (values: TypeNewPasswordSchema) => {
    if (recaptchaValue) {
      newPassword({ values, recaptcha: recaptchaValue })
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  }

  return (
    <AuthWrapper
      heading="Новый пароль"
      description="Придумайте новый пароль для вашего аккаунта"
      backButtonLabel="Войти в аккаунт"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    disabled={isLoadingNew}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={setRecaptchaValue}
              theme={theme === 'dark' ? 'dark' : 'light'}
            />
          </div>
          <Button type="submit" disabled={isLoadingNew}>
            Продолжить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
