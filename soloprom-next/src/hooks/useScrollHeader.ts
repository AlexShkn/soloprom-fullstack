import { useEffect, useState } from 'react'
import { useHeaderStore } from '@/store/headerStore'

export const useScrollHeader = (isBigSmall: boolean) => {
  const [headerFixed, setHeaderFixed] = useState(isBigSmall)
  const setHeaderFixedChange = useHeaderStore(
    (state) => state.setHeaderFixedChange,
  )

  const scrollLimit = 250

  useEffect(() => {
    let handleScroll: () => void

    if (isBigSmall) {
      handleScroll = () => {
        const currentScroll = window.scrollY
        setHeaderFixed(currentScroll > scrollLimit)

        setHeaderFixedChange(currentScroll > scrollLimit)
      }

      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (isBigSmall && handleScroll) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isBigSmall, scrollLimit])

  return headerFixed
}
