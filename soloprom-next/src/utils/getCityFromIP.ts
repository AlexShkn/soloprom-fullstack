export const getCityFromIP = async (ipAddress: string): Promise<string> => {
	const url =
		'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address'
	const token = '550254c272932ae6bd38b909c65ee769806bbcee'

	const options: RequestInit = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: 'Token ' + token,
		},
		body: JSON.stringify({ ip: ipAddress }),
	}

	try {
		const response = await fetch(url, options)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data = await response.json()
		return data.location?.data?.city || ''
	} catch (error) {
		console.error('Error fetching city from IP:', error)
		return ''
	}
}
