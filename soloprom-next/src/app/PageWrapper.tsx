'use client'
import React from 'react'

import { Header } from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Modals from '@/components/Modals/Modals'
import { CallbackPanel } from '@/components/CallbackPanel'
import TransitionWrapper from '@/providers/TransitionWrapper'
import ProductDrawer from '@/components/ProductDrawer'

export default function PageWrapper({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return (
    <div className={`wrapper ${className}`}>
      <Header />
      <TransitionWrapper>
        <main className="page">{children}</main>
      </TransitionWrapper>
      <Footer />
      <Modals />
      <CallbackPanel />
      <ProductDrawer />
    </div>
  )
}
