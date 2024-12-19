'use client'

import { useEffect, useState, useRef } from 'react'

interface UseCloseOnScrollOptions {
	targetRef: React.RefObject<HTMLElement>
	onClose: () => void
}

export const useCloseOnScroll = ({
	targetRef,
	onClose,
}: UseCloseOnScrollOptions) => {
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (!isScrolling && targetRef.current) {
				setIsScrolling(true)
				onClose()
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [onClose, targetRef])

	return isScrolling
}
