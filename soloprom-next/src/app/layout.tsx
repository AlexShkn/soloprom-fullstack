import ClientProvider from '@/providers/ClientProvider'

import '../styles/styles.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
