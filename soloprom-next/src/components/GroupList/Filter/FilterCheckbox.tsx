'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'

interface Option {
  label: string
  value: string
}

interface Props {
  title: string
  options: Option[]
  showMoreCount?: number
  onCheckboxChange: (value: string | string[], isChecked: boolean) => void
  initialChecked?: string[]
  reset?: boolean
  checkedValues: Record<string, string[]>
  setCheckedValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >
  filterName: string
}

export const FilterCheckbox: React.FC<Props> = ({
  title,
  options,
  showMoreCount,
  onCheckboxChange,
  initialChecked,
  reset,
  setCheckedValues,
  checkedValues,
  filterName,
}) => {
  const [showAll, setShowAll] = useState(false)

  const visibleOptions = showAll ? options : options.slice(0, 5)

  useEffect(() => {
    if (initialChecked && initialChecked.length > 0) {
      setCheckedValues((prev) => ({ ...prev, [filterName]: initialChecked }))
    }
  }, [initialChecked, setCheckedValues, filterName])

  const shouldShowMoreButton = options.length > 5

  const handleCheckboxChange = useCallback(
    (value: string, checked: boolean | 'indeterminate') => {
      const isChecked = checked === true

      setCheckedValues((prev) => {
        const currentValues = prev[filterName] || []
        let newValues

        if (isChecked) {
          newValues = [...new Set([...currentValues, value])]
        } else {
          newValues = currentValues.filter((v) => v !== value)
        }

        return {
          ...prev,
          [filterName]: newValues,
        }
      })

      onCheckboxChange(value, isChecked)
    },
    [onCheckboxChange, setCheckedValues, filterName],
  )

  const isOptionChecked = useCallback(
    (value: string) => {
      return checkedValues[filterName]?.includes(value) || false
    },
    [checkedValues, filterName],
  )

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <div className="space-y-1">
        {visibleOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={isOptionChecked(option.value)}
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
