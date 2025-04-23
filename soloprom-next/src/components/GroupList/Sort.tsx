'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowDownUp, ChevronRight } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'

interface Props {
  onSortChange: (sort: string) => void
  initialSort?: string
  sort: string
  setSort: (sort: string) => void
  setDataIsLoading: (status: boolean) => void
}

const sortList = ['По умолчанию', 'Возрастанию цены', 'Убыванию цены']

const getCurrentSort = (value: string) => {
  let sort = 'По умолчанию'
  if (value === 'defaultPrice:asc') {
    sort = 'Возрастанию цены'
  } else if (value === 'defaultPrice:desc') {
    sort = 'Убыванию цены'
  }

  return sort
}

export const Sort: React.FC<Props> = ({
  onSortChange,
  initialSort,
  sort,
  setSort,
  setDataIsLoading,
}) => {
  const [dropIsOpen, setDropIsOpen] = useState(false)

  const dropRef = useRef(null)

  useEffect(() => {
    if (initialSort) {
      setSort(getCurrentSort(initialSort))
    }
  }, [initialSort])

  useClickOutside(dropRef, () => {
    if (dropIsOpen) {
      setDropIsOpen(false)
    }
  })

  const sortHandler = useCallback(
    (value: string) => {
      setDataIsLoading(true)
      setSort(value)
      setDropIsOpen(false)

      let sort = ''
      if (value === 'Возрастанию цены') {
        sort = 'defaultPrice:asc'
      } else if (value === 'Убыванию цены') {
        sort = 'defaultPrice:desc'
      }
      onSortChange(sort)
    },
    [onSortChange],
  )

  return (
    <div className="flex w-full items-center gap-2.5">
      <div className="">
        <ArrowDownUp className="icon block h-5 w-5 rotate-90 stroke-darkBlue transition-colors hover:fill-accentBlue md:hidden" />
        <span className="hidden md:block">Сортировать по:</span>
      </div>

      <div ref={dropRef} className="relative z-20 w-full max-w-[300px]">
        <button
          onClick={() => setDropIsOpen((prev) => !prev)}
          type="button"
          className={
            'relative z-10 flex w-full items-center justify-between gap-2 rounded-custom bg-gray-100 px-5 py-2 text-left text-sm leading-4 md:text-base'
          }
        >
          {getCurrentSort(sort)}
          <ChevronRight
            className={`h-4 w-4 shrink-0 transition-transform duration-100 ${
              dropIsOpen ? 'rotate-[90deg]' : ''
            }`}
          />
        </button>
        {dropIsOpen && (
          <div className="absolute left-0 top-[101%] w-full flex-col rounded-xl bg-white py-2 shadow-custom">
            {sortList.map((item, index) => (
              <button
                type="button"
                onClick={() => sortHandler(item)}
                key={index}
                className={`w-full cursor-pointer px-5 py-1 text-sm md:text-base ${
                  item === getCurrentSort(sort)
                    ? 'bg-accentBlue text-white'
                    : ''
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
