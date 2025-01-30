'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

import { useModalsStore } from '@/zustand/modalsStore'
import { useClickOutside } from '@/hooks/useClickOutside'

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL as string

export const SharedModal = () => {
  const { setShareModal, shareModal } = useModalsStore((state) => state)
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
      toast.error('Ошибка при копировании')
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded bg-white p-6 shadow-lg"
      >
        <button
          className="absolute right-2 top-2 font-bold text-darkBlue hover:text-accentBlue"
          onClick={() => setShareModal('', false)}
        >
          ✕
        </button>
        <div>
          <h3 className="mb-2 text-lg font-bold">Поделиться товаром</h3>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={`${CLIENT_URL}/${id}`}
              readOnly
              className="w-full rounded border px-2 py-2"
            />
            <button
              className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => copyToClipboard(`${CLIENT_URL}/${id}`)}
            >
              Копировать
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://vk.com/share.php?url=${encodeURIComponent(`${CLIENT_URL}/${id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700"
            >
              <Image
                src="/img/icons/social/vk.svg"
                width={50}
                height={50}
                alt="vk"
              />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${CLIENT_URL}/${id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700"
            >
              <Image
                src="/img/icons/social/whatsapp.svg"
                width={50}
                height={50}
                alt="whatsapp"
              />
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(`${CLIENT_URL}/${id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <Image
                src="/img/icons/social/telegram.svg"
                width={50}
                height={50}
                alt="telegram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
