'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

import { useModalsStore } from '@/store/useModalsStore'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from './ui'

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL as string

export const SharedModal = () => {
  const { setShareModal, shareModal } = useModalsStore()
  const modalRef = useRef(null)

  const id = shareModal.productId

  useClickOutside(modalRef, () => {
    if (shareModal.isOpen) {
      setShareModal('', false)
    }
  })

  const copyToClipboard = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link)
      toast.success('Ссылка скопирована')
    } catch (error) {
      console.error('Ошибка при копировании: ', error)
      toast.error('Ошибка при копировании', {
        className: 'sonar-warn',
      })
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="modal-show relative mx-4 w-full max-w-md rounded bg-white p-6 shadow-lg"
      >
        <button
          className="absolute right-2 top-2 font-bold text-darkBlue hover:text-accentBlue"
          onClick={() => setShareModal('', false)}
        >
          ✕
        </button>
        <div className="">
          <div>
            <h3 className="mb-2 text-lg font-bold leading-none">
              Поделиться товаром
            </h3>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={`${CLIENT_URL}/products/${id}`}
                readOnly
                className="h-10 w-full rounded border px-2 py-2"
              />
              <Button
                onClick={() => copyToClipboard(`${CLIENT_URL}/products/${id}`)}
                className="h-10 w-auto px-3 py-2"
              >
                Копировать
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a
                href={`https://vk.com/share.php?url=${encodeURIComponent(`${CLIENT_URL}/products/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <img src="/img/icons/social/vk.svg" alt="vk" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${CLIENT_URL}/products/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700"
              >
                <img src="/img/icons/social/whatsapp.svg" alt="whatsapp" />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(`${CLIENT_URL}/products/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <img src="/img/icons/social/telegram.svg" alt="telegram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
