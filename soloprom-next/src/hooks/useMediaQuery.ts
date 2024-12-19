import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(() => {
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches
		}
		return false
	})

	useEffect(() => {
		const media =
			typeof window !== 'undefined' ? window.matchMedia(query) : null
		if (media) {
			const handleChange = () => setMatches(media.matches)
			media.addEventListener('change', handleChange)
			return () => media.removeEventListener('change', handleChange)
		}
		return () => {}
	}, [query])

	return matches
}
