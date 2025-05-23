'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { FastOrderTypes, useModalsStore } from '@/store/useModalsStore'
import { getDigFormat } from '@/supports'
import { useLocateStore } from '@/store/useLocateStore'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { ModalCloseButton } from './ModalCloseButton'
import { FormCallback } from '../FormCallback'

interface ModalProps {
  fastOrderProduct: FastOrderTypes
}

const ModalCallback: React.FC<ModalProps> = ({ fastOrderProduct }) => {
  const { modalCallbackStateChange, modalMessageStateChange, showMessage } =
    useModalsStore()

  const modalRef = useRef(null)

  useClickOutside(modalRef, () => {
    modalCallbackStateChange(false)
    modalMessageStateChange(false)
  })

  const isMobileHeight = useMediaQuery('(max-width: 650px)')

  return (
    <div className={`modal-callback modal z-[99999]`}>
      {!isMobileHeight && (
        <ModalCloseButton className="fixed right-7 top-7 text-white" />
      )}
      <div
        ref={modalRef}
        className="modal-show modal__dialog relative mx-auto my-2.5 w-full sm:mb-5 sm:mt-[20px] sm:max-w-[560px]"
      >
        <div className="modal__content relative overflow-hidden rounded-custom bg-white px-4 py-5 mds:px-6">
          {isMobileHeight && (
            <div className="relative flex justify-end">
              <ModalCloseButton className="static -mr-5 -mt-2 bg-white text-darkBlue" />
            </div>
          )}

          <div className="modal-callback__body">
            <div className="mb-5">
              <div className="mb-2.5 text-center text-[26px] font-medium leading-8 text-black">
                Оставьте свои контактные данные
              </div>
              <div className="text-center text-sm leading-5 text-[#313131] mds:text-base">
                Наш менеджер свяжется с вами в течении 5 минут и ответит на все
                возникшие вопросы
              </div>
            </div>
            <FormCallback fastOrderProduct={fastOrderProduct}>
              {fastOrderProduct.productId && (
                <div className="mb-5 flex items-center gap-2.5">
                  <Image
                    src={
                      fastOrderProduct.img
                        ? `/img/catalog/${fastOrderProduct.img}.webp`
                        : '/img/catalog/not-found.webp'
                    }
                    width={96}
                    height={96}
                    alt=""
                    className="h-24 w-24 object-contain"
                  />
                  <div className="flex flex-col gap-2.5">
                    <div className="text-base font-medium mds:text-lg">
                      {fastOrderProduct.name}
                    </div>
                    <div className="">{fastOrderProduct.size}</div>
                    {fastOrderProduct.price ? (
                      <div className="font-medium">
                        {getDigFormat(fastOrderProduct.price)} ₽
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )}
            </FormCallback>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCallback
