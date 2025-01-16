import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { url, cookies } = request
  const session = cookies.get('session')?.value

  const isAuthPage = url.includes('/auth')
  const isProductsPage = url.includes('/products')
  const isDashboardPage = url.includes('/dashboard')

  if (isProductsPage) {
    const catalogUrl = new URL('/catalog', request.url)
    return NextResponse.redirect(catalogUrl)
  }

  if (isAuthPage) {
    if (session) {
      const dashboardUrl = new URL('/dashboard/settings', request.url)
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  if (isDashboardPage && !session) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/products/:path*'],
}
