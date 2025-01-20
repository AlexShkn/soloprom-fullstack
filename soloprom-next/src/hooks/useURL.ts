import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useURL = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateURL = useCallback(
    (params: Record<string, string | number | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const getURLParams = useCallback(() => {
    const params: Record<string, string | null> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParams])

  return { updateURL, getURLParams }
}
