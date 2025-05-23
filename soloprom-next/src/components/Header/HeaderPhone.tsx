'use client'
import React from 'react'
import { Phone } from 'lucide-react'
import Link from 'next/link'

interface Props {
  className?: string
}

export const HeaderPhone: React.FC<Props> = ({ className }) => {
  return (
    <Link
      href="tel:+79036569393"
      className="text-white transition-colors hover:text-greenColor"
    >
      <div className="flex items-center whitespace-nowrap text-sm font-medium mds:gap-1">
        <Phone className="h-5 w-5" />
        <div className="flex flex-col items-end">
          <span className="text-[8px] leading-none">
            будни - 9:00-21:00 сб. - 10:00-15:00
          </span>
          <span className="text-sm leading-none">+7 (903) 656-93-93</span>
        </div>
      </div>
    </Link>
  )
}
