import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const { url, cookies } = request
  const session = cookies.get('session')?.value
  const isLoggingOut = cookies.get('isLoggingOut')?.value === 'true'
  const isLoggingIn = cookies.get('isLoggingIn')?.value === 'true'

  const isAuthPage = url.includes('/auth')
  const isProductsPage = new URL(url).pathname === '/products'
  const isDashboardPage = url.includes('/profile')

  if (isProductsPage) {
    const catalogUrl = new URL('/catalog', request.url)
    return NextResponse.redirect(catalogUrl)
  }

  if (isAuthPage && !url.includes('/auth/login')) {
    if (session && !isLoggingOut) {
      const isValidSession = await checkSession(request)
      if (isValidSession) {
        const dashboardUrl = new URL('/profile', request.url)
        return NextResponse.redirect(dashboardUrl)
      }
    }
    return NextResponse.next()
  }

  if (isDashboardPage) {
    if (isLoggingOut || isLoggingIn) {
      return NextResponse.next()
    }

    const isValidSession = await checkSession(request)

    if (!isValidSession) {
      const loginUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/profile', '/products'],
}

const checkSession = async (request: NextRequest) => {
  const session = request.cookies.get('session')
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

  if (!session) return false

  if (!apiUrl) {
    console.log('API URL не найден')
    return false
  }

  try {
    const response = await fetch(`${apiUrl}/auth/check-session`, {
      method: 'GET',
      headers: {
        Cookie: `session=${session.value}`,
      },
    })

    if (!response.ok) {
      console.log(`Ошибка проверки сессии. Статус: ${response.status}`)
      return false
    }

    try {
      const { isValid } = await response.json()
      return isValid
    } catch (jsonError) {
      console.error('Ошибка парсинга JSON:', jsonError)
      return false
    }
  } catch (error) {
    console.error('Ошибка проверки session', error)
    return false
  }
}
