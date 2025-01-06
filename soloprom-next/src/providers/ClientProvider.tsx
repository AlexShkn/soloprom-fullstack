'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ToastProvider } from './ToastProvider'
import { TanstackQueryProvider } from './TanstackQueryProvider'

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      <ToastProvider />
    </Provider>
  )
}
