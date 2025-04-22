import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
      const media = window.matchMedia(query)
      const handleChange = () => setMatches(media.matches)

      setMatches(media.matches)

      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }
  }, [query])

  return hasWindow ? matches : false // Возвращаем false, пока нет window
}
