'use client'
import { Input } from '@/components/ui'
import { DoubleSlider } from '@/components/ui/DoubleSlider'
import React, { useState, useEffect, useCallback, useRef } from 'react'

interface Props {
  className?: string
}

export const FilterInterval: React.FC<{
  title: string
  min: number
  max: number
  unit?: string
  onRangeChange: (min: number, max: number) => void
  initialMin?: number
  initialMax?: number
}> = ({ title, min, max, unit, onRangeChange, initialMin, initialMax }) => {
  const [minValue, setMinValue] = useState(
    initialMin !== undefined ? initialMin : min,
  )
  const [maxValue, setMaxValue] = useState(
    initialMax !== undefined ? initialMax : max,
  )
  const [range, setRange] = useState<number[]>([
    initialMin !== undefined ? initialMin : min,
    initialMax !== undefined ? initialMax : max,
  ])
  const minInputRef = useRef<HTMLInputElement>(null)
  const maxInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialMin !== undefined && initialMax !== undefined) {
      setMinValue(initialMin)
      setMaxValue(initialMax)
      setRange([initialMin, initialMax])
    } else {
      setMinValue(min)
      setMaxValue(max)
      setRange([min, max])
    }
  }, [initialMin, initialMax, min, max])

  const formatLabel = (value: number) => `${value} ${unit || ''}`

  useEffect(() => {
    setRange([minValue, maxValue])
  }, [minValue, maxValue])

  useEffect(() => {
    setMinValue(range[0])
    setMaxValue(range[1])
  }, [range])

  const handleRangeChange = useCallback(
    (newRange: number[]) => {
      setRange(newRange)
      onRangeChange(newRange[0], newRange[1])
    },
    [onRangeChange],
  )

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value))
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value))
  }

  const handleMinInputBlur = () => {
    let newValue = minValue
    if (newValue > maxValue) {
      newValue = maxValue
    }
    setMinValue(newValue)
    onRangeChange(newValue, maxValue)
  }

  const handleMaxInputBlur = () => {
    let newValue = maxValue
    if (newValue < minValue) {
      newValue = minValue
    }
    setMaxValue(newValue)
    onRangeChange(minValue, newValue)
  }

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <DoubleSlider
        min={min}
        max={max}
        step={1}
        value={range}
        onValueChange={handleRangeChange}
        formatLabel={formatLabel}
      />
      <div className="flex space-x-2">
        <Input
          type="number"
          value={minValue}
          onChange={handleMinInputChange}
          onBlur={handleMinInputBlur}
          className="w-1/2 text-sm"
          placeholder="от"
          ref={minInputRef}
        />
        <Input
          type="number"
          value={maxValue}
          onChange={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
          className="w-1/2 text-sm"
          placeholder="до"
          ref={maxInputRef}
        />
      </div>
    </div>
  )
}
