'use client'

import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { modalCallbackStateChange } from '@/redux/slices/modalsSlice'

import CloseButton from '@/components/shared/CloseButton'

import './ModalCallback.scss'

const ModalCallback = () => {
  const dispatch = useDispatch()
  const selectedCity = useSelector(
    (state: RootState) => state.cities.selectedCity,
  )

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => {
    dispatch(modalCallbackStateChange(false))
  })

  const isMobileHeight = useMediaQuery('(max-width: 650px)')

  return (
    <div className={`modal-callback modal fade show z-[99999]`}>
      {!isMobileHeight && <CloseButton classNames={'modal__close'} />}
      <div
        ref={modalRef}
        className="modal-callback__dialog modal__dialog relative mx-auto mb-5 mt-[50px] w-full max-w-[560px]"
      >
        <div className="modal-callback__content modal__content relative overflow-hidden rounded bg-white px-11 py-10">
          {isMobileHeight && <CloseButton classNames={'modal__close'} />}

          <div className="modal-callback__body">
            <div className="mb-7">
              <div className="modal-callback__title mb-2.5 text-center font-medium leading-10 text-black">
                Оставьте свои контактные данные
              </div>
              <div className="modal-callback__subtitle text-center leading-5 text-[#313131]">
                Наш менеджер свяжется с вами в течении 5 минут и ответит на все
                вопросы
              </div>
            </div>
            <form>
              <div className="mb-6 flex flex-col gap-6">
                <div className="form-field-control relative">
                  <input
                    data-form-username
                    id="modal-callback-name"
                    type="text"
                    name="name"
                    className="modal-callback__input h-[60px] w-full rounded px-5"
                    placeholder="Имя"
                    autoComplete="given-name"
                  />
                  <label
                    htmlFor="modal-callback-name"
                    className="absolute -bottom-5 left-5 text-sm"
                  >
                    <small>Error Message</small>
                  </label>
                  <img
                    src="/img/icons/st.svg"
                    alt=""
                    className="form-field-control__star"
                  />
                </div>
                <div className="form-field-control relative">
                  <input
                    data-form-phone
                    id="modal-callback-phone"
                    type="tel"
                    name="phone"
                    className="modal-callback__input h-[60px] w-full rounded px-5"
                    placeholder="+7 (999) 999-99-99"
                    autoComplete="tel"
                  />
                  <label
                    htmlFor="modal-callback-phone"
                    className="absolute -bottom-5 left-5 text-sm"
                  >
                    <small>Error Message</small>
                  </label>
                  <img
                    src="/img/icons/st.svg"
                    alt=""
                    className="form-field-control__star"
                  />
                </div>
                <div className="form-field-control relative">
                  <input
                    id="modal-callback-email"
                    type="email"
                    name="email"
                    className="modal-callback__input h-[60px] w-full rounded px-5"
                    placeholder="Почта"
                  />
                  <label
                    htmlFor="modal-callback-email"
                    className="absolute -bottom-5 left-5 text-sm"
                  ></label>
                </div>
                <div className="form-field-control relative">
                  <input
                    id="modal-callback-city"
                    type="text"
                    name="city"
                    defaultValue={selectedCity || ''}
                    className="modal-callback__input h-[60px] w-full rounded px-5"
                    placeholder="Город"
                    autoComplete="address-level2"
                  />
                  <label
                    htmlFor="modal-callback-city"
                    className="absolute -bottom-5 left-5 text-sm"
                  ></label>
                </div>
              </div>

              <button
                type="submit"
                className="button modal-callback__button mb-6 w-full rounded p-5 font-medium"
              >
                <span>Отправить</span>
              </button>
              <div className="modal-callback__policy text-center text-sm leading-5">
                Нажимая кнопку отправить, вы принимаете нашу политику{' '}
                <a
                  href="/policy"
                  className="text-[#ff8562] transition-colors hover:text-accentBlue"
                >
                  конфиденциальности
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCallback
