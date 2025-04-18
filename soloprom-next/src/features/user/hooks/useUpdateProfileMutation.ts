import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/utils/toast-message-handler'

import { TypeSettingsSchema } from '../schemes'
import { userService } from '../services'

export function useUpdateProfileMutation() {
  const { mutate: update, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
    onSuccess() {
      toast.success('Профиль успешно обновлен')
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { update, isLoadingUpdate }
}
