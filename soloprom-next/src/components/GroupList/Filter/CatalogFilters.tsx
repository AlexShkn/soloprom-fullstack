'use client'
import React, { useState, useEffect } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { FilterCheckbox } from './FilterCheckbox'
import { FilterInterval } from './FilterInterval'
import { FilterItem } from './FilterItem'
import { FilterList } from './FilterList'
import { FilterSlider } from './FilterSlider'
import { transformJson } from '@/components/CategoryPageHero/SidePanel/SidePanel'
import { cardDataProps } from '@/types/products.types'

const pagesDataRaw = require('@/data/products/pagesData.json')
const transformData = transformJson(pagesDataRaw)

interface Props {
  productsType: string
  categoryName: string
  currentPage: number
  onFiltersChange: (filters: Record<string, string[]>) => void
  onSearchChange: (search: string) => void
  initialProducts: cardDataProps[]
}

const CatalogFilters: React.FC<Props> = ({
  productsType,
  categoryName,
  onSearchChange,
  onFiltersChange,
  currentPage,
  initialProducts,
}) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [search, setSearch] = useState<string>('')
  const [brands, setBrands] = useState<string[]>([])
  const [capacities, setCapacities] = useState<{
    min: number
    max: number
  } | null>(null)
  const [polarities, setPolarities] = useState<string[]>([])
  const [widths, setWidths] = useState<{ min: number; max: number } | null>(
    null,
  )

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      console.log(initialProducts)
    }
  }, [initialProducts])

  const categoryData = transformData[productsType]

  const groups = categoryData.group

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange(value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // onFiltersChange({ brand: brandFilter })
  }
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['category', 'price']}
    >
      {currentPage > 1 && groups && (
        <FilterList
          initial={true}
          maxHeight={'200'}
          title={categoryData.title}
          items={groups}
        />
      )}

      <FilterItem title="Цена" value="price">
        <FilterInterval title="" min={931} max={269454} />
      </FilterItem>
      <FilterItem title="Цена" value="price">
        <FilterSlider title="" min={0} max={269454} />
      </FilterItem>
      <FilterItem title="Бренды" value="brands">
        <FilterCheckbox
          title=""
          options={[
            { label: 'WEZER', value: 'wezer' },
            { label: 'A-MEGA', value: 'a-mega' },
            { label: 'BOSCH', value: 'bosch' },
            { label: 'VARTA', value: 'varta' },
            { label: 'BANNER', value: 'banner' },
            { label: 'TAB', value: 'tab' },
            { label: 'MUTLU', value: 'mutlu' },
            { label: 'EXIDE', value: 'exide' },
          ]}
          showMoreCount={167}
        />
      </FilterItem>
      <FilterItem title="Емкость аккумулятора, Ач" value="capacity">
        <FilterInterval
          title="Емкость аккумулятора, Ач"
          min={44}
          max={240}
          unit="Ач"
        />
      </FilterItem>
      <FilterItem title="Полярность" value="polarity">
        <FilterCheckbox
          title=""
          options={[
            { label: '0 (-+) обратная', value: '0-reverse' },
            { label: '1 (+-) прямая', value: '1-direct' },
            { label: '2 (-+)', value: '2' },
            { label: '3 (+-)', value: '3' },
          ]}
          showMoreCount={5}
        />
      </FilterItem>
      <FilterItem title="Ширина АКБ, мм" value="width">
        <FilterInterval title="" min={90} max={518} unit="мм" />
      </FilterItem>
    </Accordion>
  )
}

export default CatalogFilters
