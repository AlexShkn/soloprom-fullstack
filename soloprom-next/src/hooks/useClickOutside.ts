import { useEffect, useRef } from 'react'

interface UseClickOutsideRef {
	current: HTMLElement | null
}

type UseClickOutsideHandler = (event: MouseEvent | TouchEvent) => void

export const useClickOutside = (
	ref: UseClickOutsideRef,
	handler: UseClickOutsideHandler,
) => {
	const listenerRef = useRef<UseClickOutsideHandler>(() => {}) // Default to a no-op function

	useEffect(() => {
		listenerRef.current = (event: MouseEvent | TouchEvent) => {
			const isClickInside = ref.current?.contains(event.target as Node)

			if (!isClickInside) {
				handler(event)
			}
		}

		document.addEventListener('mousedown', listenerRef.current)
		document.addEventListener('touchstart', listenerRef.current)

		return () => {
			document.removeEventListener('mousedown', listenerRef.current)
			document.removeEventListener('touchstart', listenerRef.current)
		}
	}, [ref, handler])
}
