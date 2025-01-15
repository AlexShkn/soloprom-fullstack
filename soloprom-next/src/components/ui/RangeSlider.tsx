'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

export const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-primary relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-secondary absolute h-full" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="border-primary block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
RangeSlider.displayName = SliderPrimitive.Root.displayName
