'use client'
import React, { Suspense } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Loading } from './Loading'

interface Props {
  children: React.ReactNode
  side?: 'left' | 'top' | 'right'
  message: string
  duration?: number
}

export const TooltipItem: React.FC<Props> = ({
  children,
  side = 'left',
  message,
  duration = 100,
}) => {
  return (
    <TooltipProvider delayDuration={duration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Suspense fallback={<Loading classNames="text-accentBlue" />}>
            {children}
          </Suspense>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
