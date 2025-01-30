import { useState, useEffect } from 'react'

const useCurrentScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking && typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.pageYOffset)
          ticking = false
        })
        ticking = true
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    return () => {}
  }, [])

  return scrollPosition
}

export default useCurrentScroll
