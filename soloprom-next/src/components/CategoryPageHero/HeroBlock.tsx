'use client'
import React from 'react'

export const HeroBlock = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <div className="page-container">
        <div className="relative flex flex-col gap-2.5 md:flex-row lg:gap-5 xl:gap-7">
          {children}
        </div>
      </div>
    </div>
  )
}
