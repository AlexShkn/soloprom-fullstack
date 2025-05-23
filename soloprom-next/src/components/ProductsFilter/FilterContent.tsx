'use client'

import React from 'react'
import { FilteredBlockDataList } from '@/types/products.types'
import { TiresByCharacteristicsFilter } from './Tabs/TiresByCharacteristicsFilter'
import { TiresBySpecialEquipmentFilter } from './Tabs/TiresBySpecialEquipmentFilter'
import { BatteryByCharacteristicsFilter } from './Tabs/BatteryByCharacteristicsFilter'
import { BatteryByCarFilter } from './Tabs/BatteryByCarFilter'

interface Props {
  activeFilterMethodTab: string
  filteredList: FilteredBlockDataList
  handleFilterChange: (label: string, values: string[]) => void
  activeCategoryTab: 'tires' | 'battery'
  handleResetFilters: () => void
  handleClickShowButton: () => void
  mode: 'link' | 'list'
}

export const FilterContent: React.FC<Props> = ({
  activeFilterMethodTab,
  filteredList,
  handleFilterChange,
  activeCategoryTab,
  handleResetFilters,
  handleClickShowButton,
  mode,
}) => {
  switch (activeFilterMethodTab) {
    case 'tiresByCharacteristics':
      return (
        <TiresByCharacteristicsFilter
          filteredList={filteredList}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          handleClickShowButton={handleClickShowButton}
          activeCategoryTab={activeCategoryTab}
          mode={mode}
        />
      )
    case 'tiresBySpecialEquipment':
      return (
        <TiresBySpecialEquipmentFilter
          handleFilterChange={handleFilterChange}
        />
      )
    case 'batteryByCharacteristics':
      return (
        <BatteryByCharacteristicsFilter
          filteredList={filteredList}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          handleClickShowButton={handleClickShowButton}
          activeCategoryTab={activeCategoryTab}
          mode={mode}
        />
      )
    case 'batteryByCar':
      return (
        <BatteryByCarFilter
          handleResetFilters={handleResetFilters}
          handleClickShowButton={handleClickShowButton}
          activeCategoryTab={activeCategoryTab}
          mode={mode}
          // handleFilterChange={handleFilterChange}
        />
      )
    default:
      return <p>No filter content available.</p>
  }
}
