import React, { useCallback } from 'react'
import { TabsTrigger } from '@/components/ui/tabs'
import { FilterTabsCategory } from '@/types/products.types'

interface Props {
  activeCategoryTab: 'tires' | 'battery'
  onCategoryChange: (value: 'tires' | 'battery') => void
  tabsCategories: FilterTabsCategory[]
}

export const ProductCategoryTabs: React.FC<Props> = ({
  activeCategoryTab,
  onCategoryChange,
  tabsCategories,
}) => {
  const handleTabClick = useCallback(
    (value: 'tires' | 'battery') => {
      onCategoryChange(value)
    },
    [onCategoryChange],
  )

  return (
    <>
      {tabsCategories.map((category) => (
        <TabsTrigger
          key={category.value}
          value={category.value}
          className="flex items-center gap-1 pb-2 text-lg"
          onClick={() => handleTabClick(category.value as 'tires' | 'battery')}
        >
          <svg
            className={`h-5 w-5 ${
              activeCategoryTab === category.value
                ? 'fill-white'
                : 'fill-darkBlue'
            }`}
          >
            <use xlinkHref={category.icon}></use>
          </svg>
          {category.label}
        </TabsTrigger>
      ))}
    </>
  )
}
