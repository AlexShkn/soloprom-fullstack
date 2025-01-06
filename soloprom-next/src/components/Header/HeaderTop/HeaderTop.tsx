'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useDispatch } from 'react-redux'

import LocateConfirm from '../LocateConfirm'
import LocateSearch from '../LocateSearch'
import HeaderMenu from '../HeaderMenu'
import { setSelectedCity } from '@/redux/slices/locateSlice'

import { getCityFromIP } from '@/utils/getCityFromIP'

import './HeaderTop.scss'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui'

export interface LocateSearchTypes {
  setLocateCity: (city: string) => void
  setSearchWindowOpen: (isOpen: boolean) => void
  setIsConfirm: (isOpen: boolean) => void
  searchWindowOpen: boolean
}

export const HeaderTop: React.FC = () => {
  const [locateCity, setLocateCity] = useState<string>('')
  const [searchWindowOpen, setSearchWindowOpen] = useState(false)
  const [locating, setLocating] = useState<string>('')
  const [isConfirm, setIsConfirm] = useState(true)
  const windowRef = useRef(null)
  const dispatch = useDispatch()

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
          console.error('Error fetching location:', error)
        }
      } else {
        const storageCity = localStorage.getItem('selectedLocate')
        setLocateCity(storageCity || '')

        if (storageCity) {
          dispatch(setSelectedCity(storageCity))
        }
      }
    }
    fetchLocation()
  }, [])

  return (
    <div className="header-top bg-darkBlue py-2.5 text-white">
      <div className="header-top__container flex items-center justify-between">
        <div ref={windowRef} className="relative z-10 mr-7">
          <div className="header-top__locate-button flex items-center gap-1 text-sm font-medium text-white">
            <svg className="icon h-5 w-5 fill-white">
              <use xlinkHref="/img/sprite.svg#locate"></use>
            </svg>
            Ваш город:
            <button
              onClick={() => setSearchWindowOpen((prev) => !prev)}
              type="button"
              className="relative transition-colors"
            >
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

        <div className="flex items-center gap-7">
          <HeaderMenu />
          <Link
            href={'/auth/login'}
            className="header-top__auth-button -margin-2.5 relative inline-flex h-7 w-7 items-center justify-center rounded-[50%] bg-accentBlue p-2.5 outline outline-1 outline-accentBlue transition-colors"
          >
            <svg className="icon ttall absolute h-5 w-5 fill-white transition-colors">
              <use xlinkHref="/img/sprite.svg#lc"></use>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
