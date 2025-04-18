import { useState, useEffect } from 'react'

export const useTimeout = (delay: number): [boolean] => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return [ready]
}

export default useTimeout
