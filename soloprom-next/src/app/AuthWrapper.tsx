'use client'
import React from 'react'
import Footer from '@/components/Footer/Footer'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/CallbackPanel'
import { HeaderTop } from '@/components/Header/HeaderTop'
import HeaderBody from '@/components/Header/HeaderBody'

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
