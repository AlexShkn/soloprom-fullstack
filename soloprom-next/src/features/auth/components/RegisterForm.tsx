'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
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

import { useRegisterMutation } from '@/hooks/auth/useRegisterMutation'
import { useConfirmRegistrationMutation } from '@/hooks/auth/useConfirmRegistrationMutation'
import { useLoginMutation } from '@/hooks/auth/useLoginMutation'
import { ConfirmCodeSchema, RegisterSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'
import { CodeVerifyBlock } from './CodeVerifyBlock'

const VERIFY_TIME = 300

export type RegisterFormValues = {
  name: string
  email: string
  password: string
  passwordRepeat: string
}

export type ConfirmCodeFormValues = {
  code: string
}

export function RegisterForm() {
  const { theme } = useTheme()
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [isShowCodeField, setIsShowCodeField] = useState(false)
  const [reserveEmail, setReserveEmail] = useState<string>('')
  const [countdown, setCountdown] = useState(VERIFY_TIME)
  const [isResendEnabled, setIsResendEnabled] = useState(false)
  const [showRecaptcha, setShowRecaptcha] = useState(true)
  const [isAutoSubmit, setIsAutoSubmit] = useState(false)

  const form = useForm<RegisterFormValues | ConfirmCodeFormValues>({
    resolver: zodResolver(isShowCodeField ? ConfirmCodeSchema : RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      code: '',
    },
  })

  const { register, isLoadingRegister } =
    useRegisterMutation(setIsShowCodeField)
  const { confirmRegistration, isLoadingConfirm } =
    useConfirmRegistrationMutation()
  const { login, isLoadingLogin } = useLoginMutation(() => {})

  const handleSubmit = async (data: any) => {
    await onSubmit(data)
    setIsAutoSubmit(false)
  }

  useEffect(() => {
    if (isShowCodeField) {
      setShowRecaptcha(false)
    } else {
      setShowRecaptcha(true)
    }
  }, [isShowCodeField])

  useEffect(() => {
    if (isShowCodeField && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }

    if (countdown === 0) {
      setIsResendEnabled(true)
    }
  }, [isShowCodeField, countdown])

  const resetCode = () => {
    if (recaptchaValue) {
      const allValues = form.getValues()

      if ('name' in allValues && 'email' in allValues) {
        register({
          values: {
            name: allValues.name,
            email: allValues.email,
            password: allValues.password,
            passwordRepeat: allValues.passwordRepeat,
          },
          recaptcha: recaptchaValue,
        })
        setCountdown(VERIFY_TIME)
        setIsResendEnabled(false)
        toast.success('Новый код отправлен!')
      } else {
        toast.error('Поля для регистрации отсутствуют!')
      }
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  }

  const onSubmit = (values: RegisterFormValues | ConfirmCodeFormValues) => {
    if (!isShowCodeField) {
      const registerValues = values as RegisterFormValues

      setReserveEmail(registerValues.email)

      if (recaptchaValue) {
        register({
          values: registerValues,
          recaptcha: recaptchaValue,
        })
        setCountdown(VERIFY_TIME)
        setIsResendEnabled(false)
      } else {
        toast.error('Пожалуйста, завершите reCAPTCHA')
      }
    } else {
      const confirmValues = values as ConfirmCodeFormValues

      confirmRegistration({
        email: reserveEmail,
        code: confirmValues.code,
      }).then(() => {
        const allValues = form.getValues()
        if ('password' in allValues) {
          login({
            values: {
              email: reserveEmail,
              password: allValues.password,
            },
            recaptcha: recaptchaValue ?? '',
          })
        } else {
          toast.error('Пароль не найден!')
        }
      })
    }
  }

  const handleCodeComplete = () => {
    setIsAutoSubmit(true)
    form.handleSubmit(handleSubmit)()
  }

  return (
    <AuthWrapper
      heading="Регистрация"
      description="Зарегистрируйтесь, используя ваш email и пароль"
      backButtonLabel="Уже есть аккаунт? Войти"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          {!isShowCodeField && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Иван"
                        disabled={isLoadingRegister}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ivan@example.com"
                        disabled={isLoadingRegister}
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        disabled={isLoadingRegister}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordRepeat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Повторите пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        disabled={isLoadingRegister}
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

          {isShowCodeField && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код подтверждения</FormLabel>
                  <FormControl>
                    <CodeVerifyBlock
                      emailAddress={reserveEmail}
                      field={{ ...field }}
                      countdown={countdown}
                      isResendEnabled={isResendEnabled}
                      resetCode={resetCode}
                      isLoading={isLoadingConfirm}
                      onComplete={handleCodeComplete}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {showRecaptcha && (
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={
                  process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
                }
                onChange={setRecaptchaValue}
                theme={theme === 'dark' ? 'dark' : 'light'}
              />
            </div>
          )}
          {reserveEmail ? (
            countdown !== 0 && (
              <Button
                type="submit"
                disabled={
                  isLoadingRegister ||
                  isLoadingConfirm ||
                  isLoadingLogin ||
                  isAutoSubmit
                }
              >
                {!isShowCodeField
                  ? 'Создать аккаунт'
                  : 'Подтвердить регистрацию'}
              </Button>
            )
          ) : (
            <Button
              type="submit"
              disabled={
                isLoadingRegister ||
                isLoadingConfirm ||
                isLoadingLogin ||
                isAutoSubmit
              }
            >
              {!isShowCodeField ? 'Создать аккаунт' : 'Подтвердить регистрацию'}
            </Button>
          )}
        </form>
      </Form>
    </AuthWrapper>
  )
}
