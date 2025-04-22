import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/features/auth/services'
import { toastMessageHandler } from '@/utils/toast-message-handler'
import { useAuthStore } from '@/store/useAuthStore'

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { userState, changeAuthStatus } = useAuthStore()

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Вы успешно вышли из системы')
      changeAuthStatus(false)
      router.push('/auth/login')
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { logout, isLoadingLogout }
}
