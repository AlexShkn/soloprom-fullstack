import React from 'react'
import { useDispatch } from 'react-redux'
import CloseButton from '@/components/shared/CloseButton'
import { LocateSearchTypes } from './HeaderTop/HeaderTop'
import { setSelectedCity } from '@/redux/slices/locateSlice'

type LocateConfirmTypes = LocateSearchTypes & {
  city: string
}

const LocateConfirm: React.FC<LocateConfirmTypes> = ({
  city,
  setIsConfirm,
  setLocateCity,
  setSearchWindowOpen,
  searchWindowOpen,
}) => {
  const dispatch = useDispatch()
  const setCityConfirm = (answer: boolean) => {
    setIsConfirm(!answer)

    if (answer) {
      setLocateCity(city)
      dispatch(setSelectedCity(city))
      localStorage.setItem('selectedLocate', city)
    } else {
      setSearchWindowOpen(true)
    }
  }

  return (
    <div className="locate-confirm tp-[30px] absolute left-0 min-w-[300px] rounded bg-white p-5 shadow-custom transition-all">
      <CloseButton classNames="window-close-btn" />
      <div className="mb-5 text-center text-lg text-darkBlue">
        Ваш город - <b>{city}</b>?
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => setCityConfirm(true)}
          type="button"
          className="button border-1 inline-flex items-center justify-center border border-accentBlue px-5 py-2.5"
        >
          Да
        </button>
        <button
          onClick={() => setCityConfirm(false)}
          type="button"
          className="button border-1 inline-flex items-center justify-center border border-accentBlue bg-white px-5 py-2.5 text-darkBlue"
        >
          Нет
        </button>
      </div>
    </div>
  )
}

export default LocateConfirm
