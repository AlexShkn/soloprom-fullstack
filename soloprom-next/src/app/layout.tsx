import ClientProvider from '@/providers/ClientProvider'

import { Header } from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'

import '../styles/styles.scss'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/ui/CallbackPanel/CallbackPanel'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <ClientProvider>
          <div className="wrapper">
            <Header />
            <main className="page">{children}</main>
            <Footer />
            <Modals />
            <CallbackPanel />
          </div>
        </ClientProvider>
      </body>
    </html>
  )
}
