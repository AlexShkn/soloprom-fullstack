'use client'
import React from 'react'

import { useDispatch } from 'react-redux'
import { modalCallbackStateChange } from '@/redux/slices/modalsSlice'

import './HeaderBody.scss'

const HeaderBody = () => {
  const dispatch = useDispatch()

  return (
    <div className="header-body flex items-center justify-between py-[30px]">
      <a
        href="/"
        className="header__logo flex-0-auto z-[2] mr-10 inline-flex items-center font-bold"
      >
        <img
          src="/img/logo-icons.svg"
          className="mr-2.5 h-[50px] w-[50px]"
          alt=""
        />
        <div className="header__logo-text flex flex-col">
          <span className="text-[28px] font-bold leading-9 text-darkBlue">
            СОЛО
            <b className="mt-[-5px] inline-block rounded bg-accentBlue px-1 leading-8 text-white">
              PROM
            </b>
          </span>
          <span className="max-w-[170px] pl-[5px] text-[11px] leading-3 text-[#3b3b3b]">
            Интернет-магазин запчастей для спецтехники
          </span>
        </div>
      </a>
      <div className="header-body__content flex w-full items-center justify-between gap-5">
        <div className="header-body__info flex w-full items-center justify-end gap-5">
          <div className="header-body__schedule flex items-center gap-2.5">
            <img src="/img/icons/clock.svg" alt="" className="h-7 w-7" />

            <div className="header-body__schedule-block flex gap-1 whitespace-nowrap text-sm font-medium leading-5">
              <i className="not-italic">Мы работаем:</i>
              <div className="flex flex-col text-right">
                <span className="whitespace-nowrap">будни - 9:00-21:00</span>
                <span className="whitespace-nowrap"> сб. - 10:00-15:00</span>
              </div>
            </div>
          </div>
          <div className="header-body__address-block flex max-w-[300px] items-center gap-2.5 text-sm font-medium leading-5">
            <svg className="icon h-7 w-7 min-w-7 fill-darkBlue">
              <use xlinkHref="/img/sprite.svg#locate"></use>
            </svg>
            <address className="not-italic">
              г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
            </address>
          </div>
        </div>

        <div className="header-body__contacts flex items-center gap-5">
          <div className="header-body__social">
            <a
              href="https://wa.me/79036569393"
              className="header-body__social-link flex min-w-[140px] items-center gap-1 rounded bg-greenColor p-2.5 text-center text-ss font-medium text-white"
            >
              <svg className="icon h-7 w-7 fill-white">
                <use xlinkHref="/img/sprite.svg#footer-wp"></use>
              </svg>
              Напишите нам в WhatsApp
            </a>
          </div>
          <div className="header-body__phone flex flex-col">
            <a
              href="tel:+79036569393"
              className="link-hover whitespace-nowrap text-xl font-bold"
            >
              +7 (903) 656-93-93
            </a>
            <button
              onClick={() => dispatch(modalCallbackStateChange(true))}
              data-btn-callback
              type="button"
              className="link-hover mt-1 text-sm font-bold underline"
            >
              обратная связь
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderBody
