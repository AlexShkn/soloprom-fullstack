'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from '../ui'

interface Props {
  label: string
  options: string[]
  selectedOptions: string[]
  onChange: (value: string[]) => void
  filterKey: string
}

export const ProductFilterDropdown: React.FC<Props> = ({
  label,
  options,
  onChange,
  selectedOptions,
  filterKey,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<
    string[]
  >([])
  const [displaySelectedOptions, setDisplaySelectedOptions] =
    useState(selectedOptions)

  // Новое состояние для лимита отображаемых элементов
  const [visibleCount, setVisibleCount] = useState(20)

  const dropRef = useRef(null)
  useClickOutside(dropRef, () => {
    if (isOpen) {
      setIsOpen(false)
      setInternalSelectedOptions(selectedOptions)
      setDisplaySelectedOptions(selectedOptions)
      setVisibleCount(20) // при закрытии сбрасываем лимит
    }
  })

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setInternalSelectedOptions(selectedOptions)
    }
  }, [isOpen, selectedOptions])

  const handleOptionChange = useCallback((option: string) => {
    setInternalSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option],
    )
  }, [])

  useEffect(() => {
    setInternalSelectedOptions(selectedOptions)
    setDisplaySelectedOptions(selectedOptions)
    setVisibleCount(20) // при изменении выбранных снова ограничиваем до 20
  }, [selectedOptions])

  const handleApplyChanges = useCallback(() => {
    onChange(internalSelectedOptions)
    setDisplaySelectedOptions(internalSelectedOptions)
    setIsOpen(false)
    setVisibleCount(20) // при применении сбрасываем лимит
  }, [internalSelectedOptions, onChange])

  const handleReset = useCallback(() => {
    setIsOpen(false)
    onChange([])
    setInternalSelectedOptions([])
    setDisplaySelectedOptions([])
    setVisibleCount(20) // при сбросе тоже сбрасываем лимит
  }, [onChange])

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [options, searchQuery])

  const displayedOptions = filteredOptions.slice(0, visibleCount)

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 20)
  }

  return (
    <div className="" ref={dropRef}>
      <div className="mb-1 text-sm font-medium">{label}</div>
      <div className="relative">
        <button
          className={`group relative flex w-full cursor-pointer justify-between rounded border border-grayText bg-sectionWhite px-4 py-2 transition-colors hover:border-accentBlue hover:text-accentBlue ${displaySelectedOptions.length > 0 && 'text-accentBlue'}`}
          onClick={toggleDropdown}
        >
          <span
            className={`${displaySelectedOptions.length > 0 && 'text-accentBlue'}text-grayText group-hover:text-accentBlue`}
          >
            {displaySelectedOptions.length > 0
              ? displaySelectedOptions.join(', ')
              : 'Не выбран'}
          </span>
          <ChevronDown className="stroke-darkColor absolute right-2 top-2/4 h-5 w-5 -translate-y-2/4" />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+5px)] z-20 w-full rounded bg-white p-3 shadow-custom">
            <div className="relative mb-2 flex items-center overflow-hidden rounded-custom text-darkBlue">
              <Search className="absolute left-2 top-2/4 h-5 w-5 -translate-y-2/4 stroke-[#c2c5da]" />
              <input
                type="text"
                className="placeholder:[#c2c5da] w-full bg-[#f4f5fa] py-2 pl-10 pr-2"
                placeholder="Найти в списке"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-auto max-h-60 w-full overflow-y-auto rounded-md border pb-3">
              <div className="grid grid-cols-2 gap-2 p-2">
                {displayedOptions.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center space-x-2 leading-none"
                  >
                    <Checkbox
                      checked={internalSelectedOptions.includes(option)}
                      onCheckedChange={() => handleOptionChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {visibleCount < filteredOptions.length && (
                <div className="flex justify-center">
                  <Button
                    variant={'link'}
                    className="mt-2 h-auto rounded px-4 py-1.5 text-center text-sm leading-none underline"
                    onClick={handleShowMore}
                  >
                    Показать еще
                  </Button>
                </div>
              )}
            </ScrollArea>

            <div className="mt-2 flex justify-end gap-2">
              <Button
                type="button"
                className="w-auto rounded bg-gray-200 px-4 py-2 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
                onClick={handleReset}
                disabled={internalSelectedOptions.length === 0}
              >
                Сбросить
              </Button>
              <Button
                type="button"
                className="button w-auto rounded bg-accentBlue px-4 py-2"
                onClick={handleApplyChanges}
              >
                Применить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
