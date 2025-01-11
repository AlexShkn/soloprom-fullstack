'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import ModalCallback from './ModalCallback/ModalCallback'

import './Modals.scss'

const Modals = () => {
  const { callbackIsOpen, fastOrderProduct } = useSelector(
    (state: RootState) => state.modals,
  )

  return (
    <>
      {callbackIsOpen && <ModalCallback fastOrderProduct={fastOrderProduct} />}
    </>
  )
}

export default Modals
