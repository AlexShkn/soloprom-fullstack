'use client'

import { ToastProvider } from './ToastProvider'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import AuthStatusProvider from './AuthStatusProvider'

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TanstackQueryProvider>
        <AuthStatusProvider>{children}</AuthStatusProvider>
      </TanstackQueryProvider>
      <ToastProvider />
    </>
  )
}
