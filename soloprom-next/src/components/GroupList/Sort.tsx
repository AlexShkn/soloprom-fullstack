'use client'
import React, { useRef, useState } from 'react'

import { ChevronRight } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'

interface Props {
  onSortChange: (sort: string) => void
}

const sortList = ['Возрастанию цены', 'Убыванию цены']

export const Sort: React.FC<Props> = ({ onSortChange }) => {
  const [dropIsOpen, setDropIsOpen] = useState(false)
  const [sortValue, setSortValue] = useState('Возрастанию цены')
  const [sort, setSort] = useState<string>('')

  const dropRef = useRef(null)

  useClickOutside(dropRef, () => {
    setDropIsOpen(false)
  })

  const sortValueHandler = (value: string) => {
    setSortValue(value)
    setDropIsOpen(false)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSort(value)
  }

  return (
    <div className="flex w-full items-center gap-2.5">
      Сортировать по:
      <div ref={dropRef} className="relative z-20 w-full max-w-[300px]">
        <button
          onClick={() => setDropIsOpen((prev) => !prev)}
          type="button"
          className={
            'relative z-10 flex w-full items-center justify-between gap-2 rounded bg-gray-100 px-5 py-2'
          }
        >
          {sortValue}
          <ChevronRight
            className={`h-4 w-4 shrink-0 transition-transform duration-100 ${dropIsOpen && 'rotate-[90deg]'}`}
          />
        </button>
        {dropIsOpen && (
          <ul
            className={`absolute left-0 top-[101%] w-full rounded bg-white py-2 shadow-custom`}
          >
            {sortList.map((item, index) => (
              <li
                onClick={() => sortValueHandler(item)}
                key={index}
                className={`cursor-pointer px-5 py-3 ${item === sortValue && 'bg-accentBlue text-white'}`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
