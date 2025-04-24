'use client'
import { useModalsStore } from '@/store/useModalsStore'
import React from 'react'
import { Button } from '../../ui'

interface Props {
  className?: string
}

export const ModalCloseButton: React.FC<Props> = ({ className }) => {
  const { modalCallbackStateChange } = useModalsStore()
  return (
    <Button
      onClick={() => modalCallbackStateChange(false)}
      className={'modal__close w-auto hover:bg-transparent'}
    >
      <svg>
        <use xlinkHref="/img/sprite-default.svg#close"></use>
      </svg>
    </Button>
  )
}
