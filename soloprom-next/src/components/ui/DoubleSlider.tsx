'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

type SliderProps = {
  className?: string
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
  value?: number[] | readonly number[]
  onValueChange?: (values: number[]) => void
  onValueCommit?: (values: number[]) => void // Новое событие
}

const DoubleSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      onValueCommit, // Новая пропса
      ...props
    },
    ref,
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max]
    const [localValues, setLocalValues] = React.useState(initialValue)

    React.useEffect(() => {
      setLocalValues(Array.isArray(value) ? value : [min, max])
    }, [min, max, value])

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    const handlePointerUp = () => {
      if (onValueCommit) {
        onValueCommit(localValues) // Вызываем после завершения взаимодействия
      }
    }

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className,
        )}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        onPointerUp={handlePointerUp} // Обрабатываем завершение взаимодействия
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    )
  },
)
DoubleSlider.displayName = SliderPrimitive.Root.displayName

export { DoubleSlider }
