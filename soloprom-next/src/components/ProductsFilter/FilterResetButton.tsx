import React, { useCallback } from 'react'
import { Button } from '@/components/ui'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

interface Props {
  onReset: () => void
}

export const FilterResetButton: React.FC<Props> = ({ onReset }) => {
  const { filters } = useProductsFilterStore()

  const handleClick = useCallback(() => {
    onReset()
  }, [onReset])

  return (
    <div className="">
      {Object.keys(filters).length > 1 ? (
        <Button variant="outline" onClick={handleClick}>
          Очистить фильтры
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}
