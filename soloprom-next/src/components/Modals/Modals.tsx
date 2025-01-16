'use client'

import React from 'react'
import ModalCallback from './ModalCallback/ModalCallback'

import './Modals.scss'
import { useModalsStore } from '@/zustand/modalsStore'

const Modals = () => {
  const { callbackIsOpen, fastOrderProduct } = useModalsStore((state) => state)

  return (
    <>
      {callbackIsOpen && <ModalCallback fastOrderProduct={fastOrderProduct} />}
    </>
  )
}

export default Modals
