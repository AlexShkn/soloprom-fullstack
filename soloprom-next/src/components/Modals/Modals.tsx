'use client'

import React from 'react'
import ModalCallback from './ModalCallback/ModalCallback'
import { useModalsStore } from '@/store/modalsStore'

import './Modals.scss'
import { SharedModal } from '../ui/SharedModal'

const Modals = () => {
  const { shareModal, callbackIsOpen, fastOrderProduct } = useModalsStore(
    (state) => state,
  )

  return (
    <>
      {callbackIsOpen && <ModalCallback fastOrderProduct={fastOrderProduct} />}
      {shareModal.isOpen && <SharedModal />}
    </>
  )
}

export default Modals
