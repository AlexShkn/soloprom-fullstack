'use client'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'

interface FilterItemProps {
  title: string
  value: string
  children: React.ReactNode
}

export const FilterItem: React.FC<FilterItemProps> = ({
  title,
  children,
  value,
}) => (
  <AccordionItem value={value}>
    <AccordionTrigger className="font-semibold">{title}</AccordionTrigger>
    <AccordionContent
      className={
        'scroll-bar max-h-80 overflow-y-auto overflow-x-hidden overscroll-contain'
      }
    >
      {children}
    </AccordionContent>
  </AccordionItem>
)
