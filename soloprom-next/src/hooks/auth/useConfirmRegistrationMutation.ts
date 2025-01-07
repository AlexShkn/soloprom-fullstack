import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toastMessageHandler } from '@/utils/toast-message-handler'
import { authService } from '@/features/auth/services'

export function useConfirmRegistrationMutation() {
  const router = useRouter()

  const { mutateAsync: confirmRegistration, isPending: isLoadingConfirm } =
    useMutation({
      mutationKey: ['confirm registration'],
      mutationFn: ({ email, code }: { email: string; code: string }) =>
        authService.confirmRegistration(email, code),
      onSuccess(data: any) {
        toastMessageHandler(data)
      },
      onError(error) {
        toastMessageHandler(error)
      },
    })

  return { confirmRegistration, isLoadingConfirm }
}
