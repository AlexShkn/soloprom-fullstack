'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export interface GroupItemType {
  title: string
  url: string
  crumb: string
}

export const FilterList: React.FC<{
  title: string
  items: GroupItemType[]
  initial: boolean
  maxHeight: string
}> = ({ title, items, initial, maxHeight }) => {
  const [isOpen, setIsOpen] = useState(initial || false)

  return (
    <div className="space-y-2">
      <div
        className="flex cursor-pointer items-center justify-between font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      {isOpen && (
        <div
          className={`space-y-1 pl-4 max-h-[${maxHeight}px] ${maxHeight && 'scroll-bar overflow-y-auto overscroll-contain'}`}
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={`/catalog/${item.url}`}
              className="block text-sm hover:underline"
            >
              {item.crumb}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
