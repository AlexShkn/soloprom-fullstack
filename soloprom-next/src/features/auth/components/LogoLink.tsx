'use client'
import Link from 'next/link'
import React from 'react'

export const LogoLink: React.FC = () => {
  return (
    <Link href="/">
      <div className="flex flex-col">
        <span className="mds:text-2xl text-xl font-bold leading-9 text-darkBlue xl:text-[28px]">
          СОЛО
          <b className="mt-[-5px] inline-block rounded bg-accentBlue px-1 leading-8 text-white">
            PROM
          </b>
        </span>
      </div>
    </Link>
  )
}
