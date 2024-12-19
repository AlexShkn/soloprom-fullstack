import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setHeaderFixedChange } from '@/redux/slices/headerSlice'

export const useScrollHeader = (isBigSmall: boolean) => {
	const dispatch = useDispatch()
	const [headerFixed, setHeaderFixed] = useState(isBigSmall)
	const scrollLimit = 250

	useEffect(() => {
		let handleScroll: () => void

		if (isBigSmall) {
			handleScroll = () => {
				const currentScroll = window.scrollY
				setHeaderFixed(currentScroll > scrollLimit)

				dispatch(setHeaderFixedChange(currentScroll > scrollLimit))
			}

			window.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (isBigSmall && handleScroll) {
				window.removeEventListener('scroll', handleScroll)
			}
		}
	}, [dispatch, isBigSmall, scrollLimit])

	return headerFixed
}
