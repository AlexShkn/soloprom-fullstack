'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { setCookie } from 'cookies-next'

import { toastMessageHandler } from '@/utils/toast-message-handler'
import { TypeLoginSchema } from '../../features/auth/schemes'
import { authService } from '../../features/auth/services'
import { useAuthStore } from '@/store/useAuthStore'

export function useLoginMutation(
  setIsShowFactor: Dispatch<SetStateAction<boolean>>,
) {
  const router = useRouter()
  const { changeAuthStatus } = useAuthStore()

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ['login user'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeLoginSchema
      recaptcha: string
    }) => authService.login(values, recaptcha),
    onSuccess(data: any) {
      if (data.message) {
        toastMessageHandler(data)
        setIsShowFactor(true)
      } else {
        changeAuthStatus(true)
        toast.success('Успешная авторизация', {
          className: 'sonar-success',
        })

        setCookie('isLoggingIn', 'true', { maxAge: 5 })

        router.push('/profile')
      }
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { login, isLoadingLogin }
}
