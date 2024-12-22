'use client'
import Link from 'next/link'
import React from 'react'

export const LogoLink: React.FC = () => {
  return (
    <div className="mb-8">
      <Link href="/">
        <span className="text-[28px] font-bold leading-9 text-darkBlue">
          СОЛО
          <b className="mt-[-5px] inline-block rounded bg-accentBlue px-1 leading-8 text-white">
            PROM
          </b>
        </span>
      </Link>
    </div>
  )
}
