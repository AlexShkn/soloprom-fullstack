import React, { useRef, useState, useEffect } from 'react'
import { LocateSearchTypes } from './LocateBlock'
import CloseButton from '@/ui/CloseButton'
import { useScrollCloseableWindow } from '@/hooks/useScrollCloseableWindow'
import { useLocateStore } from '@/store/useLocateStore'
import { Input, Loading } from '../../../ui'
import { Origami } from 'lucide-react'
import { CityType, getCityForName } from '@/api/cities'
import { useDebounce } from '@/hooks/useDebounce'

const defaultCities = [
  { name: 'Воронеж' },
  { name: 'Москва' },
  { name: 'Санкт-Петербург' },
  { name: 'Краснодар' },
  { name: 'Брянск' },
  { name: 'Краснодар' },
  { name: 'Волгоград' },
  { name: 'Ростов на дону' },
  { name: 'Липецк' },
  { name: 'Донецк' },
  { name: 'Луганск' },
]

const LocateSearch: React.FC<LocateSearchTypes> = ({
  setSearchWindowOpen,
  setLocateCity,
  setIsConfirm,
  searchWindowOpen,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [citiesList, setCitiesList] = useState<CityType[]>(defaultCities)
  const [dataIsLoading, setDataIsLoading] = useState(false)

  const { setSelectedCity } = useLocateStore()

  const windowRef = useRef<HTMLDivElement>(null)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const fetchCities = async (searchValue: string) => {
    setDataIsLoading(true)

    const cities = await getCityForName(searchValue)
    console.log(cities)

    try {
      setCitiesList(cities)
      setDataIsLoading(false)
    } catch (error) {
      console.error('Не удалось получить список городов:', error)
    }
  }

  useEffect(() => {
    if (debouncedSearchValue.trim() === '') {
      setCitiesList(defaultCities)
      setDataIsLoading(false)
      return
    }

    fetchCities(debouncedSearchValue)
  }, [debouncedSearchValue])

  const selectLocateCity = (city: { name: string }) => {
    setLocateCity(city.name)
    setSelectedCity(city.name)
    localStorage.setItem('selectedLocate', city.name)
    setIsConfirm(false)
    setSearchWindowOpen(false)
  }

  useScrollCloseableWindow({
    isOpen: searchWindowOpen,
    onClose: () => setSearchWindowOpen(false),
  })

  const closeLocateWindows = () => {
    setIsConfirm(false)
    setSearchWindowOpen(false)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)

    if (searchValue && !dataIsLoading) {
      setDataIsLoading(true)
    }
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
          <Input
            onChange={handleSearchInputChange}
            type="search"
            name="city-search"
            placeholder="Ваш город"
            autoComplete="off"
            className="h-full w-full rounded bg-[#f4f5fa] py-4 pl-10 pr-8 text-black placeholder:text-sm placeholder:text-[#c2c5da]"
          />
        </div>
        <ul
          className={`scroll-bar flex h-full max-h-[250px] min-h-24 flex-col gap-1 overflow-y-auto overflow-x-hidden overscroll-contain`}
        >
          {dataIsLoading ? (
            <Loading classNames="text-accentBlue" spinClasses="h-8 w-8" />
          ) : (
            citiesList.map((city: CityType, index) => (
              <li
                key={index}
                onClick={() => selectLocateCity(city)}
                className="header-top__locate-item link-hover cursor-pointer py-1 text-sm font-medium text-darkBlue"
              >
                {city.name}
              </li>
            ))
          )}
          {!dataIsLoading && !citiesList.length ? (
            <li className="flex flex-col items-center gap-2 py-6 text-center font-medium text-darkBlue">
              <Origami className="h-6 w-6 stroke-darkBlue" />
              Нет города
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  )
}

export default LocateSearch
