'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  className?: string
}

export const FilterCheckbox: React.FC<{
  title: string
  options: { label: string; value: string }[]
  showMoreCount?: number
}> = ({ title, options, showMoreCount }) => {
  const [showAll, setShowAll] = useState(false)
  const visibleOptions = showAll ? options : options.slice(0, 5)

  return (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      <div className="space-y-1">
        {visibleOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox id={option.value} />
            <label htmlFor={option.value} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {showMoreCount && options.length > 5 && (
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
