import ClientProvider from '@/providers/ClientProvider'
import '../styles/styles.scss'
import { Analytics } from '@/components/Analytics'
import JsonLd from '@/components/JsonLd'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <JsonLd />
      <body className={`${roboto.className}`}>
        <ClientProvider>
          <Analytics />
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
