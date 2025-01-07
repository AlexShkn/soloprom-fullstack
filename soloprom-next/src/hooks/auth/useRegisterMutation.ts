import { useMutation } from '@tanstack/react-query'

import { toastMessageHandler } from '@/utils/toast-message-handler'
import { RegisterFormValues } from '@/features/auth/schemes'
import { authService } from '@/features/auth/services'

export function useRegisterMutation(
  setIsShowCodeField?: (value: boolean | ((prev: boolean) => boolean)) => void,
) {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ['register user'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: RegisterFormValues
      recaptcha: string
    }) => authService.register(values, recaptcha),
    onSuccess(data: any) {
      toastMessageHandler(data)

      if (setIsShowCodeField) {
        setIsShowCodeField(true)
      }
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { register, isLoadingRegister }
}
