'use client'
import React from 'react'
import { Button } from '../ui'
import Image from 'next/image'
import { useModalsStore } from '@/store/useModalsStore'

interface Props {
  className?: string
}

export const ConsultationBlock: React.FC<Props> = ({ className }) => {
  const { modalMessageStateChange, modalCallbackStateChange } = useModalsStore()

  const showMessageWindow = () => {
    modalMessageStateChange(true)
    modalCallbackStateChange(true)
  }
  return (
    <div className="relative z-10 flex justify-between gap-2 overflow-hidden rounded-custom bg-[#f8fafc] shadow-full">
      <div className="flex flex-col gap-3 p-5">
        <span className="text-darkColor text-lg font-medium">
          Нужна консультация?
        </span>
        <Button variant={'green'} onClick={() => showMessageWindow()}>
          Оставьте заявку
        </Button>
      </div>

      <Image
        src="/img/benefits/search.png"
        alt="помощь в подборе"
        className="w-100 h-auto"
        width={100}
        height={100}
      />
    </div>
  )
}
