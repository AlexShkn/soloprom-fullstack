import { useQuery } from '@tanstack/react-query'
import { userService } from '@/features/user/services'

export function useProfile() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.findProfile(),
    retry: false,
  })

  return {
    user,
    isLoading,
    error,
    refetch,
  }
}
