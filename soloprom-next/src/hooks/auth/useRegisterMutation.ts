import { useMutation } from '@tanstack/react-query'

import { toastMessageHandler } from '@/utils/toast-message-handler'
import { TypeRegisterSchema } from '@/features/auth/schemes'
import { authService } from '@/features/auth/services'

export function useRegisterMutation() {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ['register user'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeRegisterSchema
      recaptcha: string
    }) => authService.register(values, recaptcha),
    onSuccess(data: any) {
      toastMessageHandler(data)
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { register, isLoadingRegister }
}
