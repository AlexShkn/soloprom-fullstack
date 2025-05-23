'use client'
import { useModalsStore } from '@/store/useModalsStore'
import React from 'react'
import { Button } from '../ui'
import { X } from 'lucide-react'

interface Props {
  className?: string
}

export const ModalCloseButton: React.FC<Props> = ({ className }) => {
  const { modalCallbackStateChange } = useModalsStore()
  return (
    <Button
      onClick={() => modalCallbackStateChange(false)}
      className={`${className} w-auto bg-transparent hover:bg-transparent`}
    >
      <X className="h-7 w-7 sm:h-10 sm:w-10" />
    </Button>
  )
}
