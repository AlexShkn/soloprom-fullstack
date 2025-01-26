'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import useFilterStore from '@/zustand/filterStore'

interface Props {
  onSortChange: (sort: string) => void
  initialSort?: string
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

export const Sort: React.FC<Props> = ({ onSortChange, initialSort }) => {
  const [dropIsOpen, setDropIsOpen] = useState(false)
  // const [sort, setSort] = useState('По умолчанию')
  const sort = useFilterStore((state) => state.sort)
  const setSort = useFilterStore((state) => state.setSort)

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
      setSort(value)
      setDropIsOpen(false)

      let sort = ''
      if (value === 'Возрастанию цены') {
        sort = 'defaultPrice:asc'
      } else if (value === 'Убыванию цены') {
        sort = 'defaultPrice:desc'
      }

      // Передача выбранного значения наверх (в родительский компонент)
      onSortChange(sort)
    },
    [onSortChange],
  )

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
          {getCurrentSort(sort)}
          <ChevronRight
            className={`h-4 w-4 shrink-0 transition-transform duration-100 ${
              dropIsOpen ? 'rotate-[90deg]' : ''
            }`}
          />
        </button>
        {dropIsOpen && (
          <ul className="absolute left-0 top-[101%] w-full rounded bg-white py-2 shadow-custom">
            {sortList.map((item, index) => (
              <li
                onClick={() => sortHandler(item)}
                key={index}
                className={`cursor-pointer px-5 py-3 ${
                  item === getCurrentSort(sort)
                    ? 'bg-accentBlue text-white'
                    : ''
                }`}
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
