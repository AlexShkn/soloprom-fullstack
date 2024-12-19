import { useState, useEffect } from 'react'

const useCurrentScroll = () => {
	const [scrollPosition, setScrollPosition] = useState(0)

	useEffect(() => {
		let ticking = false

		const handleScroll = () => {
			if (!ticking && typeof window !== 'undefined') {
				// Added check
				window.requestAnimationFrame(() => {
					setScrollPosition(window.pageYOffset)
					ticking = false
				})
				ticking = true
			}
		}

		if (typeof window !== 'undefined') {
			// Added check
			window.addEventListener('scroll', handleScroll)
			return () => window.removeEventListener('scroll', handleScroll)
		}

		return () => {} // Return a cleanup function even if window is undefined
	}, [])

	return scrollPosition
}

export default useCurrentScroll
