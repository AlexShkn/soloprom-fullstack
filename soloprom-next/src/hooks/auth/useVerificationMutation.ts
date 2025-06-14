import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { verificationService } from '@/features/auth/services'

export function useVerificationMutation() {
  const router = useRouter()

  const { mutate: verification } = useMutation({
    mutationKey: ['new verification'],
    mutationFn: (token: string | null) =>
      verificationService.newVerification(token),
    onSuccess() {
      toast.success('Почта успешно подтверждена', {
        className: 'sonar-success',
      })
      router.push('/profile')
    },
    onError() {
      router.push('/auth/login')
    },
  })

  return { verification }
}
