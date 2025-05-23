// useLogoutMutation.ts
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/features/auth/services'
import { toastMessageHandler } from '@/utils/toast-message-handler'
import { useAuthStore } from '@/store/useAuthStore'
import { setCookie } from 'cookies-next' // Или твоя библиотека для куки

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { changeAuthStatus } = useAuthStore()

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await authService.logout()
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Вы успешно вышли из системы')
      changeAuthStatus(false)

      setCookie('isLoggingOut', 'true', { maxAge: 5 })

      router.push('/auth/login')
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { logout, isLoadingLogout }
}
