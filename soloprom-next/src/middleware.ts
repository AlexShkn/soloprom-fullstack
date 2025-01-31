import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const { url, cookies } = request
  const session = cookies.get('session')?.value

  const isAuthPage = url.includes('/auth')
  const isProductsPage = url === `${new URL(url).origin}/products`
  const isDashboardPage = url.includes('/dashboard')

  if (isProductsPage) {
    const catalogUrl = new URL('/catalog', request.url)
    return NextResponse.redirect(catalogUrl)
  }

  if (isAuthPage) {
    if (session) {
      const isValidSession = await checkSession(request)
      if (isValidSession) {
        const dashboardUrl = new URL('/dashboard/settings', request.url)
        return NextResponse.redirect(dashboardUrl)
      }
    }
    return NextResponse.next()
  }

  if (isDashboardPage) {
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
  matcher: ['/auth/:path*', '/dashboard/:path*', '/products'],
}

const checkSession = async (request: NextRequest) => {
  const session = request.cookies.get('session')?.value
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
        Cookie: `session=${session}`,
      },
    })

    if (!response.ok) {
      return false
    }
    const { isValid } = await response.json()
    return isValid
  } catch (error) {
    console.log('error check session', error)
    return false
  }
}
