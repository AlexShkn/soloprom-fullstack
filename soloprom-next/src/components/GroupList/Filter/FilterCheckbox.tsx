'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState, useCallback } from 'react'

interface Props {
  title: string
  options: { label: string; value: string }[]
  showMoreCount?: number
  onCheckboxChange: (value: string | string[], isChecked: boolean) => void
}

export const FilterCheckbox: React.FC<Props> = ({
  title,
  options,
  showMoreCount,
  onCheckboxChange,
}) => {
  const [showAll, setShowAll] = useState(false)
  const [checkedValues, setCheckedValues] = useState<string[]>([])

  const visibleOptions = showAll ? options : options.slice(0, 5)

  const shouldShowMoreButton = options.length > 5

  const handleCheckboxChange = useCallback(
    (value: string, checked: boolean | 'indeterminate') => {
      const isChecked = checked === true

      if (isChecked) {
        setCheckedValues((prev) => [...prev, value])
      } else {
        setCheckedValues((prev) => prev.filter((v) => v !== value))
      }
      onCheckboxChange(value, isChecked)
    },
    [onCheckboxChange],
  )

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <div className="space-y-1">
        {visibleOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={checkedValues.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked)
              }
            />
            <label htmlFor={option.value} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {shouldShowMoreButton && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center space-x-1 text-sm text-blue-500 hover:underline"
        >
          <span>еще {showAll ? '' : showMoreCount}</span>
          {showAll ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  )
}
