import { useState, useEffect } from 'react'

interface UseScrollCloseableWindowProps {
	isOpen: boolean
	onClose: () => void
}

export const useScrollCloseableWindow = ({
	isOpen,
	onClose,
}: UseScrollCloseableWindowProps) => {
	useEffect(() => {
		const handleScroll = () => {
			if (isOpen) {
				onClose()
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isOpen, onClose])

	return { isOpen }
}
