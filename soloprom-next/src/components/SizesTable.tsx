'use client'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
}

const tireSizes = [
  {
    type: 'Вилочные погрузчики (forklift)',
    href: '/catalog/shini-dlya-vilochnih-pogruzchikov',
    sizes:
      '5.00-8, 6.00-9, 6.50-10, 7.00-12, 16*6-8, 18*7-8, 8.15-15 (28*9-15), 300-15, 9.00-20',
  },
  {
    type: 'Экскаваторы-погрузчики обратная лопата (backhoe loader)',
    href: '/catalog/shini-dlya-ekskavator-pogruzchikov',
    sizes: '12.5/80-18, 16.9-24, 16.9-28,18.4-26',
  },
  {
    type: 'Экскаваторы полноповоротные',
    href: '/catalog/shini-dlya-kolesnih-ekskavatorov',
    sizes: '10.00-20,9.00-20',
  },
  {
    type: 'Фронтальные погрузчики',
    href: '/catalog/shini-dlya-frontalnih-pogruzchikov',
    sizes: '17.5-25, 20.5-25, 23.5-25, 23.5/70-16, 26.5-25',
  },
  {
    type: 'Катки грунтовые',
    href: '/catalog/shini-dlya-asfaltoukladchikov-i-katkov',
    sizes: '23.1-26',
  },
  {
    type: 'Катки асфальтовые',
    href: '/catalog/shini-dlya-asfaltoukladchikov-i-katkov',
    sizes: '9.00-20, 11.00-20',
  },
  {
    type: 'Телескопические погрузчики',
    href: '/catalog/shini-dlya-teleskopicheskih-pogruzchikov',
    sizes: '16/70-20 (405/70-20), 16/70-24 (405/70-24)',
  },
  {
    type: 'Портовая техника',
    href: '/catalog/shini-dlya-portov-i-terminalov',
    sizes: '10.00-20, 14.00-24, 18.00-25',
  },
  {
    type: 'Шины для автогрейдера',
    href: '/catalog/shini-dlya-greiderov',
    sizes: '14.00-24',
  },
  {
    type: 'Мини-погрузчики (skid steer)',
    href: '/catalog/shini-dlya-minipogruzchikov',
    sizes: '10-16.5, 12-16.5, 14-17,5, 10/75-15.3',
  },
]

export const SizesTable: React.FC<Props> = ({ className }) => {
  return (
    <div className={`page-container ${className || '/catalog/'}`}>
      <h2 className="mb-4 text-2xl font-semibold">
        Распространённые размеры шин
      </h2>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-4 rounded bg-accentBlue px-4 py-2 font-medium leading-none text-white">
          <div>ТИП ТЕХНИКИ</div>
          <div>РАЗМЕР ШИНЫ</div>
        </div>

        <div className="flex flex-col">
          {tireSizes.map((item, index) => (
            <div
              key={item.type}
              className="grid grid-cols-2 items-center gap-4 border-b border-darkBlue"
            >
              <div>
                <Link href={item.href} className="block p-3 hover:underline">
                  {item.type}
                </Link>
              </div>
              <div className="p-2">{item.sizes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
