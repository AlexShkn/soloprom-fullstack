'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  isOpen: boolean
}

export const CallbackMethodsDrop: React.FC<Props> = ({ isOpen }) => {
  const { modalCallbackStateChange } = useModalsStore()

  const listClasses = `mobile-nav__callback-list -r-4 absolute bottom-[calc(100%+5px)] z-10  flex-col gap-2.5 rounded bg-white shadow-custom transition-all md:hidden ${isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-[100px]'}`

  return (
    <ul className={listClasses} aria-label="Способы связи с нами">
      <li className="rounded p-[5px] shadow-custom">
        <button
          onClick={() => modalCallbackStateChange(true)}
          type="button"
          className="flex flex-col items-center gap-[5px] text-ss leading-none text-darkBlue"
          aria-label="Заказать обратный звонок"
        >
          <img
            src="/img/icons/callback1.svg"
            className="h-7 w-7"
            alt="Заказать обратный звонок"
          />
          Заказать звонок
        </button>
      </li>
      <li className="rounded p-[5px] shadow-custom">
        <Link
          href="tel:+79036569393"
          className="flex flex-col items-center gap-[5px] text-ss leading-none text-darkBlue"
          aria-label="Позвонить нам по телефону"
        >
          <img src="/img/icons/tel.svg" className="h-7 w-7" alt="Позвонить" />
          Телефон
        </Link>
      </li>
      <li className="rounded p-[5px] shadow-custom">
        <Link
          href="https://wa.me/79036569393"
          className="flex flex-col items-center gap-[5px] text-ss leading-none text-darkBlue"
          aria-label="Написать нам в WhatsApp"
          rel="noopener noreferrer"
        >
          <img
            src="/img/icons/social/whatsapp.svg"
            className="h-7 w-7"
            alt="Написать в WhatsApp"
          />
          Whatsapp
        </Link>
      </li>
      <li className="rounded p-[5px] shadow-custom">
        <Link
          href="https://t.me/+79036569393"
          className="flex flex-col items-center gap-[5px] text-ss leading-none text-darkBlue"
          aria-label="Написать нам в Telegram"
          rel="noopener noreferrer"
        >
          <img
            src="/img/icons/social/telegram.svg"
            className="h-7 w-7"
            alt="Написать в Telegram"
          />
          Telegram
        </Link>
      </li>
    </ul>
  )
}
