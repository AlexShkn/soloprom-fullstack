import React from 'react'
import { Badge } from '@/components/ui'
import { FiltersState } from '@/types/products.types'

interface Props {
  selectedFilters: FiltersState
}

const words: { [key: string]: string } = {
  country: 'Страна',
  productType: 'Тип',
  voltage: 'Напряжение',
  container: 'Емкость',
  defaultSize: 'Размеры',
  brandName: 'Бренды',
  size: 'Радиус',
  models: 'Модели',
  plates: 'Тип пластин',
}

export const SelectedFiltersBadges: React.FC<Props> = ({ selectedFilters }) => {
  const filteredFilters = Object.fromEntries(
    Object.entries(selectedFilters).filter(([key]) => key !== 'categoryName'),
  )

  return (
    <>
      {Object.keys(filteredFilters).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filteredFilters).map(([label, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              return (
                <Badge key={label}>
                  {words[label]}: {value.join(', ')}
                </Badge>
              )
            } else if (typeof value === 'string' && value) {
              return (
                <Badge key={label}>
                  {words[label]}: {value}
                </Badge>
              )
            }
            return null
          })}
        </div>
      )}
    </>
  )
}
