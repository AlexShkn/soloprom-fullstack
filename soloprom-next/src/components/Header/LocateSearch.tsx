import React, { useRef, useState, useCallback, useEffect } from 'react'
import { LocateSearchTypes } from './LocateBlock'
import CloseButton from '@/components/ui/CloseButton'
import { useScrollCloseableWindow } from '@/hooks/useScrollCloseableWindow'
import { useLocateStore } from '@/store/locateStore'
import { Loading } from '../ui'
import { Origami } from 'lucide-react'

const defaultCities = [
  { city: 'Воронеж', oblast: '' },
  { city: 'Москва', oblast: '' },
  { city: 'Санкт-Петербург', oblast: '' },
  { city: 'Краснодар', oblast: '' },
  { city: 'Брянск', oblast: '' },
  { city: 'Краснодар', oblast: '' },
  { city: 'Волгоград', oblast: '' },
  { city: 'Липецк', oblast: '' },
  { city: 'Донецк', oblast: '' },
  { city: 'Луганск', oblast: '' },
  { city: 'Ростов на дону', oblast: '' },
]

const LocateSearch: React.FC<LocateSearchTypes> = ({
  setSearchWindowOpen,
  setLocateCity,
  setIsConfirm,
  searchWindowOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoad, setIsLoad] = useState(false)
  const [filteredCities, setFilteredCities] = useState<any[]>(defaultCities)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { setSelectedCity, cities, fetchCitiesData, loading } = useLocateStore()
  const windowRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const selectLocateCity = (city: { city: string; oblast: string }) => {
    setLocateCity(city.city)
    setSelectedCity(city.city)
    localStorage.setItem('selectedLocate', city.city)
    setIsConfirm(false)
    setSearchWindowOpen(false)
  }

  const filterCities = useCallback((searchTerm: string, cityList: any[]) => {
    const searchTermLower = searchTerm.toLowerCase()
    return cityList.filter((item: any) =>
      item.city.toLowerCase().startsWith(searchTermLower),
    )
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCities(defaultCities)
      setIsInitialLoad(true)
      return
    }

    setIsLoad(true) // Start loading
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (cities.length === 0) {
        fetchCitiesData().then(() => {
          setIsInitialLoad(false)
        })
      }

      if (!isInitialLoad && cities.length > 0) {
        setFilteredCities(filterCities(searchQuery, cities))
      } else {
        setFilteredCities(filterCities(searchQuery, defaultCities))
      }

      setIsLoad(false) // End loading
    }, 300) // Debounce delay of 300ms

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current) // Cleanup timeout
      }
    }
  }, [searchQuery, cities, fetchCitiesData, filterCities, isInitialLoad])

  useScrollCloseableWindow({
    isOpen: searchWindowOpen,
    onClose: () => setSearchWindowOpen(false),
  })

  const closeLocateWindows = () => {
    setIsConfirm(false)
    setSearchWindowOpen(false)
  }

  return (
    <div
      ref={windowRef}
      className="absolute left-0 top-[25px] w-[calc(100vw-40px)] min-w-[280px] overflow-hidden rounded bg-white px-5 py-6 shadow-custom mds:w-auto"
    >
      <CloseButton
        onClick={closeLocateWindows}
        classNames={'header-top__locate-search-close window-close-btn'}
      />
      <div className="mb-4 text-lg font-bold text-darkBlue">
        Выберите свой город
      </div>
      <div className="overflow-hidden">
        <div className="relative mb-4">
          <svg className="icon absolute left-2.5 top-[50%] h-5 w-5 translate-y-[-50%] stroke-[#c2c5da]">
            <use xlinkHref="/img/sprite.svg#search"></use>
          </svg>
          <input
            onChange={handleSearchInputChange}
            type="text"
            name="city-search"
            placeholder="Ваш город"
            autoComplete="off"
            className="h-full w-full rounded bg-[#f4f5fa] py-4 pl-10 pr-8 text-black placeholder:text-sm placeholder:text-[#c2c5da] focus:outline focus:outline-1 focus:outline-darkBlue"
          />
        </div>
        <ul
          className={`scroll-bar flex h-full max-h-[250px] min-h-24 flex-col gap-1 overflow-y-auto overflow-x-hidden overscroll-contain`}
        >
          {isLoad ? (
            <Loading classNames="text-accentBlue" spinClasses="h-8 w-8" />
          ) : Object.keys(filteredCities).length ? (
            filteredCities.map((city: any, index) => (
              <li
                key={index}
                onClick={() => selectLocateCity(city)}
                className="header-top__locate-item link-hover cursor-pointer py-1 text-sm font-medium text-darkBlue"
              >
                {city.city}
              </li>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 py-6 text-center font-medium text-darkBlue">
              <Origami className="h-6 w-6 stroke-darkBlue" />
              Нет города
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default LocateSearch
