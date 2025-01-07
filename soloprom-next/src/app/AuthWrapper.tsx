'use client'
import React from 'react'

import { Header } from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/ui/CallbackPanel/CallbackPanel'
import { HeaderTop } from '@/components/Header/HeaderTop/HeaderTop'

export default function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="wrapper">
      <header className="header relative w-full bg-white transition-all">
        <HeaderTop />
      </header>
      <main className="page">{children}</main>
      <Footer />
    </div>
  )
}
