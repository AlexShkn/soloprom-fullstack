'use client'

import React from 'react'
import { ProductFilterDropdown } from '../ProductFilterDropdown'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

interface Props {
  handleFilterChange: (label: string, values: string[]) => void
}

export const TiresBySpecialEquipmentFilter: React.FC<Props> = ({
  handleFilterChange,
}) => {
  const { filters } = useProductsFilterStore()

  return (
    <div>
      <ProductFilterDropdown
        label="Тип техники"
        options={['Трактор', 'Комбайн', 'Прицеп']}
        selectedOptions={(filters['Тип техники'] as string[]) || []}
        onChange={(values) => handleFilterChange('Тип техники', values)}
        filterKey="Тип техники"
      />
      <ProductFilterDropdown
        label="Модель"
        options={['Модель 1', 'Модель 2']}
        selectedOptions={(filters.Модель as string[]) || []}
        onChange={(values) => handleFilterChange('Модель', values)}
        filterKey="Модель"
      />
    </div>
  )
}
