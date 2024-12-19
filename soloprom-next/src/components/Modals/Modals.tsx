'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import ModalCallback from './ModalCallback/ModalCallback'

import './Modals.scss'

const Modals = () => {
	const callbackIsOpen = useSelector(
		(state: RootState) => state.modals.callbackIsOpen,
	)

	return <>{callbackIsOpen && <ModalCallback />}</>
}

export default Modals
