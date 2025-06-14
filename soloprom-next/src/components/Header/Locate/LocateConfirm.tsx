import React from 'react'
import CloseButton from '@/components/ui/CloseButton'
import { useLocateStore } from '@/store/useLocateStore'
import { LocateSearchTypes } from './LocateBlock'
import { CityType } from '@/api/cities'

type LocateConfirmTypes = LocateSearchTypes & CityType

const LocateConfirm: React.FC<LocateConfirmTypes> = ({
  name,
  setIsConfirm,
  setLocateCity,
  setSearchWindowOpen,
  searchWindowOpen,
}) => {
  const { setSelectedCity } = useLocateStore()

  const setCityConfirm = (answer: boolean) => {
    setIsConfirm(!answer)

    if (answer) {
      setLocateCity(name)
      setSelectedCity(name)
      localStorage.setItem('selectedLocate', name)
    } else {
      setSearchWindowOpen(true)
    }
  }

  return (
    <div className="locate-confirm tp-[30px] absolute left-0 min-w-[300px] rounded bg-white p-5 shadow-custom transition-all">
      <CloseButton
        classNames="window-close-btn"
        onClick={() => setIsConfirm(false)}
      />
      <div className="mb-5 text-center text-lg text-darkBlue">
        Ваш город - <b>{name}</b>?
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
