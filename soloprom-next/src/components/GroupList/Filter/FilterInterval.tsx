// components/Filter/FilterInterval.tsx
'use client'
import { Input } from '@/components/ui'
import { DoubleSlider } from '@/components/ui/DoubleSlider'
import React, { useState, useEffect, useCallback } from 'react'

interface Props {
  className?: string
}

export const FilterInterval: React.FC<{
  title: string
  min: number
  max: number
  unit?: string
  onRangeChange: (min: number, max: number) => void
}> = ({ title, min, max, unit, onRangeChange }) => {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)
  const [range, setRange] = useState([min, max])

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
    const newValue = Number(e.target.value)
    if (newValue <= maxValue) {
      setMinValue(newValue)
      onRangeChange(newValue, maxValue)
    }
  }
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue >= minValue) {
      setMaxValue(newValue)
      onRangeChange(minValue, newValue)
    }
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
          className="w-1/2 text-sm"
          placeholder="от"
          min={min}
          max={maxValue}
        />
        <Input
          type="number"
          value={maxValue}
          onChange={handleMaxInputChange}
          className="w-1/2 text-sm"
          placeholder="до"
          min={minValue}
          max={max}
        />
      </div>
    </div>
  )
}
