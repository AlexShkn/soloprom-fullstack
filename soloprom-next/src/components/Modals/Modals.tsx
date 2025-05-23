'use client'

import React from 'react'
import ModalCallback from './ModalCallback'
import { useModalsStore } from '@/store/useModalsStore'

import './Modals.scss'
import { SharedModal } from '../SharedModal'
import { ModalProduct } from './ModalProduct/ModalProduct'

const Modals = () => {
  const { shareModal, productModal, callbackIsOpen, fastOrderProduct } =
    useModalsStore()

  return (
    <>
      {callbackIsOpen && <ModalCallback fastOrderProduct={fastOrderProduct} />}
      {shareModal.isOpen && <SharedModal />}
      {productModal.isOpen && productModal.cardData ? (
        <ModalProduct
          cardData={productModal.cardData}
          productId={productModal.productId}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default Modals
