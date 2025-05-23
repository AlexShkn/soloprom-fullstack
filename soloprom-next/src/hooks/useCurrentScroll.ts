import { useState, useEffect } from 'react'

const useCurrentScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.pageYOffset)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

export default useCurrentScroll
