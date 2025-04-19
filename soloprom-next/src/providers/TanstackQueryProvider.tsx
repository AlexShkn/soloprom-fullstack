'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

export function TanstackQueryProvider({
  children,
}: Readonly<PropsWithChildren<unknown>>) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
