'use client'
import { Input } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
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
  const [searchTerm, setSearchTerm] = useState('')

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

      console.log(isChecked)

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

  const filteredOptions =
    showAll && searchTerm
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : visibleOptions

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      {shouldShowMoreButton && showAll && (
        <div className="relative flex items-center gap-1 pr-2">
          <Search className="absolute left-2 top-3 h-4 w-4 stroke-[#989797]" />
          <Input
            type="text"
            placeholder="Поиск..."
            className="block w-full rounded-custom bg-[#f3f4f6] px-3 py-2 pl-8 text-sm placeholder:text-[#989797] focus:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className="space-y-1">
        {filteredOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={isOptionChecked(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked)
              }
            />
            <label
              htmlFor={option.value}
              className="cursor-pointer text-sm hover:text-accentBlue"
            >
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
