'use client'

import React from 'react'
import { Button, Loading } from '@/components/ui'

interface Props {
  activeCategoryTab: 'tires' | 'battery'
  totalCount: number
  isLoading: boolean
  mode: 'link' | 'list'
  clickButton: () => void
}

export const ShowProductsButton: React.FC<Props> = ({
  activeCategoryTab,
  totalCount,
  isLoading,
  mode,
  clickButton,
}) => {
  const productWord = activeCategoryTab === 'tires' ? 'шин' : 'аккумуляторов'

  return (
    <div>
      <Button
        onClick={clickButton}
        disabled={isLoading || !totalCount}
        className="w-auto disabled:bg-gray-500"
      >
        {isLoading ? (
          <Loading spinClasses="h-4 w-4" classNames="text-white" />
        ) : (
          `Показать ${totalCount} ${productWord}`
        )}
      </Button>
    </div>
  )
}
