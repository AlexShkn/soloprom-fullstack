'use client'
import { Input } from '@/ui'
import { RangeSlider } from '@/ui/RangeSlider'
import React, { useState } from 'react'

interface Props {
  className?: string
}

export const FilterSlider: React.FC<{
  title: string
  min: number
  max: number
  unit?: string
}> = ({ title, min, max, unit }) => {
  const [value, setValue] = useState([min, max])

  const handleSliderChange = (values: number[]) => {
    setValue(values)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue >= min && newValue <= max) {
      setValue([newValue, value[1]])
    }
  }

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <RangeSlider
        min={min}
        max={max}
        step={1}
        defaultValue={value}
        onValueChange={handleSliderChange}
        className="w-full"
      />
      <Input
        type="number"
        value={value[0]}
        onChange={handleInputChange}
        className="w-full text-sm"
        placeholder={`от ${min} до ${max}`}
        min={min}
        max={max}
      />
    </div>
  )
}
