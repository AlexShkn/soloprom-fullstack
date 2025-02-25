import ClientProvider from '@/providers/ClientProvider'

import '../styles/styles.scss'
import { Analytics } from '@/components/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <ClientProvider>
          <Analytics />
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
