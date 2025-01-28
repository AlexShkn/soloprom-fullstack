'use client'

import { Input } from '@/components/ui'
import { DoubleSlider } from '@/components/ui/DoubleSlider'
import React, { useState, useEffect, useCallback, useRef } from 'react'

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

  const [tempValues, setTempValues] = useState<number[]>([
    initialMin !== undefined ? initialMin : min,
    initialMax !== undefined ? initialMax : max,
  ])

  const debounceTimeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (initialMin !== undefined && initialMax !== undefined) {
      setMinValue(initialMin)
      setMaxValue(initialMax)
      setTempValues([initialMin, initialMax])
    } else {
      setMinValue(min)
      setMaxValue(max)
      setTempValues([min, max])
    }
  }, [initialMin, initialMax, min, max])

  const formatLabel = (value: number) => `${value} ${unit || ''}`

  const handleRangeChange = (newRange: number[]) => {
    setTempValues(newRange) // Обновляем локальные значения слайдера
    setMinValue(newRange[0])
    setMaxValue(newRange[1])
  }

  const handleRangeCommit = (newRange: number[]) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = window.setTimeout(() => {
      onRangeChange(newRange[0], newRange[1]) // Применяем фильтры только после завершения взаимодействия
    }, 300) // Дебаунс 300мс
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value))
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value))
  }

  const handleMinInputBlur = () => {
    let newValue = Math.max(min, Math.min(minValue, maxValue)) // Гарантируем, что значение не выходит за пределы
    setMinValue(newValue)
    onRangeChange(newValue, maxValue)
    setTempValues([newValue, maxValue])
  }

  const handleMaxInputBlur = () => {
    let newValue = Math.min(max, Math.max(maxValue, minValue)) // Гарантируем, что значение не выходит за пределы
    setMaxValue(newValue)
    onRangeChange(minValue, newValue)
    setTempValues([minValue, newValue])
  }

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <DoubleSlider
        min={min}
        max={max}
        step={1}
        value={tempValues}
        onValueChange={handleRangeChange} // Обновляем локальное состояние
        onValueCommit={handleRangeCommit} // Применяем фильтры после завершения
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
        />
        <Input
          type="number"
          value={maxValue}
          onChange={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
          className="w-1/2 text-sm"
          placeholder="до"
        />
      </div>
    </div>
  )
}
