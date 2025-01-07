import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/features/auth/services'
import { toastMessageHandler } from '@/utils/toast-message-handler'

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Вы успешно вышли из системы')
      router.push('/auth/login')
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { logout, isLoadingLogout }
}
