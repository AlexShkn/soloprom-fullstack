import React, { useRef, useState, useCallback, useEffect } from 'react'
import { fetchCities } from '@/zustand/thunks/locateThunk'

import { LocateSearchTypes } from './Header/LocateBlock'
import CloseButton from '@/components/shared/CloseButton'
import { useScrollCloseableWindow } from '@/hooks/useScrollCloseableWindow'
import { useLocateStore } from '@/zustand/locateStore'

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
  const [filteredCities, setFilteredCities] = useState<any[]>([])
  const [dataFetched, setDataFetched] = useState(false)
  const { setSelectedCity, cities } = useLocateStore((state) => state)

  const debounceRef = useRef<NodeJS.Timeout>()
  const windowRef = useRef<HTMLDivElement>(null)

  const debouncedSearchCities = useCallback(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const searchTerm = searchQuery.toLowerCase()
      const searchData = dataFetched ? cities : defaultCities

      if (searchTerm.trim() === '') {
        setFilteredCities(searchData)
      } else {
        const filtered = searchData.filter(
          (item: any) =>
            item.city
              .toLowerCase()
              .match(new RegExp(`^${searchTerm.toLowerCase()}`)) !== null,
        )
        setFilteredCities(filtered)
      }
      setIsLoad(false)
    }, 300)
  }, [searchQuery, cities, dataFetched])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoad(true)
    setSearchQuery(e.target.value)
  }

  const selectLocateCity = (city: { city: string; oblast: string }) => {
    setLocateCity(city.city)
    setSelectedCity(city.city)
    localStorage.setItem('selectedLocate', city.city)
    setIsConfirm(false)
    setSearchWindowOpen(false)
  }

  useEffect(() => {
    if (!cities.length && searchQuery.trim() !== '') {
      fetchCities().then(() => setDataFetched(true))
    } else if (searchQuery.trim() !== '') {
      setDataFetched(true)
    }
  }, [searchQuery, dataFetched])

  useEffect(() => {
    debouncedSearchCities()
  }, [debouncedSearchCities])

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
      className="header-top__locate-search absolute left-0 top-[25px] min-w-[280px] overflow-hidden rounded bg-white px-5 py-6 shadow-custom"
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
          <svg className="icon absolute left-2.5 top-[50%] h-5 w-5 translate-y-[-50%]">
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
          className={`scroll-bar flex h-full max-h-[250px] flex-col gap-1 overflow-y-auto overflow-x-hidden ${isLoad && 'load'}`}
        >
          {filteredCities.map((city: any, index) => (
            <li
              key={index}
              onClick={() => selectLocateCity(city)}
              className="header-top__locate-item link-hover cursor-pointer py-1 text-sm font-medium text-darkBlue"
            >
              {city.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LocateSearch
