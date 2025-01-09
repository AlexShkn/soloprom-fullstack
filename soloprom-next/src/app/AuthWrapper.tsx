'use client'
import React from 'react'

import { Header } from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/ui/CallbackPanel/CallbackPanel'
import { HeaderTop } from '@/components/Header/HeaderTop/HeaderTop'
import HeaderBody from '@/components/Header/HeaderBody/HeaderBody'

export default function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="wrapper">
      <header className="header relative w-full bg-white transition-all">
        <HeaderTop />
        <div className="header__container">
          <HeaderBody />
        </div>
      </header>
      <main className="page">{children}</main>
      <Modals />
      <CallbackPanel />
      <Footer />
    </div>
  )
}
