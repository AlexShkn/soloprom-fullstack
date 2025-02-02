'use client'
import React from 'react'

import { Header } from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/ui/CallbackPanel/CallbackPanel'
import TransitionWrapper from '@/providers/TransitionWrapper'

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TransitionWrapper>
      <div className="wrapper">
        <Header />
        <main className="page">{children}</main>
        <Footer />
        <Modals />
        <CallbackPanel />
      </div>
    </TransitionWrapper>
  )
}
