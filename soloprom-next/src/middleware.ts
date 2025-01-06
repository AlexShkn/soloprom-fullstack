import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { url, cookies } = request
  const session = cookies.get('session')?.value

  const isAuthPage = url.includes('/auth')

  if (isAuthPage) {
    if (session) {
      const dashboardUrl = new URL('/dashboard/settings', request.url)
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  if (!session) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
}
