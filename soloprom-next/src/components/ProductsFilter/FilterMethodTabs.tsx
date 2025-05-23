'use client'

import React, { useCallback } from 'react'
import { TabsTrigger } from '@/components/ui/tabs'
import { FilterMethodsTypes } from '@/types/products.types'

interface Props {
  activeCategoryTab: 'tires' | 'battery'
  onFilterMethodChange: (value: string) => void
  filterMethods: FilterMethodsTypes
}

export const FilterMethodTabs: React.FC<Props> = ({
  activeCategoryTab,
  onFilterMethodChange,
  filterMethods,
}) => {
  const handleTabClick = useCallback(
    (value: string) => {
      onFilterMethodChange(value)
    },
    [onFilterMethodChange],
  )

  return (
    <>
      {filterMethods[activeCategoryTab].map((method) => (
        <TabsTrigger
          key={method.value}
          value={method.value}
          className="data-[state=active]:bg-darkBlue"
          onClick={() => handleTabClick(method.value)}
        >
          {method.label}
        </TabsTrigger>
      ))}
    </>
  )
}
