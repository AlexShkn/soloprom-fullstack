'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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

import { useLoginMutation } from '@/hooks/auth/useLoginMutation'
import { LoginSchema, TypeLoginSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'
import { CodeVerifyBlock } from './CodeVerifyBlock'

const VERIFY_TIME = 300

export function LoginForm() {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [isShowTwoFactor, setIsShowFactor] = useState(false)
  const [reserveValues, setReserveValues] = useState<TypeLoginSchema>({
    email: '',
    password: '',
    code: '',
  })
  const [countdown, setCountdown] = useState(VERIFY_TIME)
  const [isResendEnabled, setIsResendEnabled] = useState(false)

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor)

  useEffect(() => {
    if (isShowTwoFactor && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }

    if (countdown === 0) {
      setIsResendEnabled(true)
    }
  }, [isShowTwoFactor, countdown])

  const resetCode = () => {
    if (recaptchaValue) {
      login({ values: reserveValues, recaptcha: recaptchaValue })
      setCountdown(VERIFY_TIME)
      setIsResendEnabled(false)
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }

    toast.success('Новый код отправлен!')
  }

  const onSubmit = (values: TypeLoginSchema) => {
    if (recaptchaValue) {
      setReserveValues({ ...values })
      login({ values, recaptcha: recaptchaValue })
      setCountdown(VERIFY_TIME)
      setIsResendEnabled(false)
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  }

  return (
    <AuthWrapper
      heading="Войти"
      description="Чтобы войти на сайт введите ваш email и пароль"
      backButtonLabel="Еще нет аккаунта? Регистрация"
      backButtonHref="/auth/register"
      isShowHead={!isShowTwoFactor}
      isShowSocial={!isShowTwoFactor}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          {isShowTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CodeVerifyBlock
                      emailAddress={reserveValues.email}
                      field={{ ...field }}
                      countdown={countdown}
                      isResendEnabled={isResendEnabled}
                      resetCode={resetCode}
                      isLoading={isLoadingLogin}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isShowTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ivan@example.com"
                        disabled={isLoadingLogin}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Пароль</FormLabel>
                      <Link
                        href="/auth/reset-password"
                        className="link-hover ml-auto inline-block text-sm underline"
                      >
                        Забыли пароль?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="******"
                        disabled={isLoadingLogin}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
              }
              onChange={setRecaptchaValue}
              theme={'light'}
            />
          </div>
          <Button type="submit" disabled={isLoadingLogin}>
            Войти в аккаунт
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
