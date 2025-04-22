'use client'
import React, { useState, useRef, useEffect } from 'react'
import LocateConfirm from './LocateConfirm'
import LocateSearch from './LocateSearch'
import { useClickOutside } from '@/hooks/useClickOutside'
import { getCityFromIP } from '@/utils/getCityFromIP'
import { useLocateStore } from '@/store/locateStore'
import { Navigation } from 'lucide-react'

interface Props {
  className?: string
}

export interface LocateSearchTypes {
  setLocateCity: (city: string) => void
  setSearchWindowOpen: (isOpen: boolean) => void
  setIsConfirm: (isOpen: boolean) => void
  searchWindowOpen: boolean
}

export const LocateBlock: React.FC<Props> = ({ className }) => {
  const [locateCity, setLocateCity] = useState<string>('')
  const [searchWindowOpen, setSearchWindowOpen] = useState(false)
  const [locating, setLocating] = useState<string>('')
  const [isConfirm, setIsConfirm] = useState(true)
  const windowRef = useRef(null)

  const { setSelectedCity } = useLocateStore()

  useClickOutside(windowRef, () => {
    setIsConfirm(false)
    setSearchWindowOpen(false)
  })

  useEffect(() => {
    const fetchLocation = async () => {
      if (!localStorage.getItem('selectedLocate')) {
        try {
          const response = await fetch('https://ipinfo.io/json')
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          const ip = data.ip as string
          const city = await getCityFromIP(ip)

          setLocating(city)
        } catch (error) {
          console.error('Ошибка при получении местоположения:', error)
        }
      } else {
        const storageCity = localStorage.getItem('selectedLocate')
        setLocateCity(storageCity || '')

        if (storageCity) {
          setSelectedCity(storageCity)
        }
      }
    }
    fetchLocation()
  }, [])

  return (
    <div ref={windowRef} className="relative z-10">
      <div className="header-top__locate-button flex items-center gap-1 text-sm font-medium text-white">
        <span className="whitespace-nowrap">Ваш город:</span>
        <button
          onClick={() => setSearchWindowOpen((prev) => !prev)}
          type="button"
          className="relative flex items-center gap-1 transition-colors before:absolute before:bottom-[-1px] before:left-0 before:h-[1px] before:w-full before:bg-white before:transition-colors hover:text-greenColor before:hover:bg-greenColor"
        >
          <Navigation className="h-3.5 w-3.5" />
          {!locateCity ? 'Выбрать' : locateCity || 'Выбрать'}
        </button>
      </div>

      {searchWindowOpen && (
        <LocateSearch
          setLocateCity={setLocateCity}
          setSearchWindowOpen={setSearchWindowOpen}
          setIsConfirm={setIsConfirm}
          searchWindowOpen={searchWindowOpen}
        />
      )}
      {isConfirm && locating && !searchWindowOpen && (
        <LocateConfirm
          city={locating}
          setLocateCity={setLocateCity}
          setIsConfirm={setIsConfirm}
          setSearchWindowOpen={setSearchWindowOpen}
          searchWindowOpen={searchWindowOpen}
        />
      )}
    </div>
  )
}
