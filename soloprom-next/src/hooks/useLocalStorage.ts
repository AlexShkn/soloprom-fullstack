'use client'

import { useState } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function
          ? (value as (prevValue: T) => T)(storedValue)
          : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Ошибка записи в localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}

export default useLocalStorage
