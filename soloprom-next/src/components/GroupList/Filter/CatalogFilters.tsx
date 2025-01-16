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
  categoryInitialList: cardDataProps[] | null
}

const CatalogFilters: React.FC<Props> = ({
  productsType,
  categoryName,
  onSearchChange,
  onFiltersChange,
  currentPage,
  categoryInitialList,
}) => {
  const [filteredData, setFilteredData] = useState<cardDataProps[]>(
    categoryInitialList || [],
  )
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [search, setSearch] = useState<string>('')
  const [brands, setBrands] = useState<string[]>([])
  const [prices, setPrices] = useState<{
    min: number
    max: number
  } | null>(null)
  const [volumes, setVolumes] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [plates, setPlates] = useState<string[]>([])
  const [voltage, setVoltage] = useState<number[]>([])
  const [container, setContainer] = useState<number[]>([])
  const [models, setModels] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [radiuses, setRadiuses] = useState<string[]>([])

  const createFiltersFields = (data: cardDataProps[]) => {
    if (!data || data.length === 0) {
      return
    }

    let allBrands: string[] = []
    let minPrice = Infinity
    let maxPrice = -Infinity
    let allVolumes: string[] = []
    let allSizes: string[] = []
    let allPlates: (string | null)[] = []
    let allVoltage: (string | null)[] = []
    let allContainer: (string | null)[] = []
    let allModels: string[] = []
    let allCountries: (string | null)[] = []
    let allRadiuses: (string | null)[] = []

    data.forEach((item) => {
      // Brands
      if (item.brand) {
        allBrands.push(item.brand)
      }
      // Prices
      if (item.defaultPrice) {
        minPrice = Math.min(minPrice, item.defaultPrice)
        maxPrice = Math.max(maxPrice, item.defaultPrice)
      }

      // Volumes
      if (item.volumes) {
        allVolumes.push(...Object.keys(item.volumes))
      }

      // Sizes
      if (item.sizes) {
        allSizes.push(...Object.keys(item.sizes))
      }
      // Plates
      if (item.plates) {
        allPlates.push(item.plates)
      }

      // voltage
      if (item.voltage) {
        allVoltage.push(item.voltage)
      }

      // container
      if (item.container) {
        allContainer.push(item.container)
      }

      // models
      if (item.models && item.models.length > 0) {
        allModels.push(...item.models)
      }

      // Countries
      if (item.country) {
        allCountries.push(item.country)
      }

      // Radiuses
      if (item.size) {
        allRadiuses.push(item.size)
      }
    })

    const uniqueBrands = [...new Set(allBrands)]
    const uniqueVolumes = [...new Set(allVolumes)]
    const uniqueSizes = [...new Set(allSizes)]
    const uniquePlates = [...new Set(allPlates)].filter(Boolean) as string[]
    const uniqueModels = [...new Set(allModels)]
    const uniqueCountries = [...new Set(allCountries)].filter(
      Boolean,
    ) as string[]
    const uniqueRadiuses = [...new Set(allRadiuses)].filter(Boolean) as string[]

    const parsedVoltage = [...new Set(allVoltage)]
      .filter(Boolean)
      .map((v) => parseInt(v as string, 10))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b)

    const parsedContainer = [...new Set(allContainer)]
      .filter(Boolean)
      .map((c) => parseInt(c as string, 10))
      .filter((c) => !isNaN(c))
      .sort((a, b) => a - b)

    setBrands(uniqueBrands)
    setPrices(
      minPrice !== Infinity && maxPrice !== -Infinity
        ? { min: minPrice, max: maxPrice }
        : null,
    )
    setVolumes(uniqueVolumes)
    setSizes(uniqueSizes)
    setPlates(uniquePlates)
    setVoltage(parsedVoltage)
    setContainer(parsedContainer)
    setModels(uniqueModels)
    setCountries(uniqueCountries)
    setRadiuses(uniqueRadiuses)
  }

  useEffect(() => {
    if (categoryInitialList && categoryInitialList.length > 0) {
      createFiltersFields(categoryInitialList)
    }
  }, [categoryInitialList])

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
      defaultValue={['category', 'price', 'brands', 'volumes', 'sizes']}
    >
      {currentPage > 1 && groups && (
        <FilterList
          initial={true}
          maxHeight={'200'}
          title={categoryData.title}
          items={groups}
        />
      )}

      {prices && (
        <FilterItem title="Цена" value="price">
          <FilterInterval title="" min={prices.min} max={prices.max} />
        </FilterItem>
      )}
      {/* {prices && (
        <FilterItem title="Цена" value="price">
          <FilterSlider title="" min={prices.min} max={prices.max} />
        </FilterItem>
      )} */}
      {brands && brands.length > 0 && (
        <FilterItem title="Бренды" value="brands">
          <FilterCheckbox
            title=""
            options={brands.map((brand) => ({ label: brand, value: brand }))}
            showMoreCount={brands.length > 5 ? brands.length - 5 : 0}
          />
        </FilterItem>
      )}
      {volumes && volumes.length > 0 && (
        <FilterItem title="Объем" value="volumes">
          <FilterCheckbox
            title=""
            options={volumes.map((volume) => ({
              label: volume,
              value: volume,
            }))}
            showMoreCount={volumes.length > 5 ? volumes.length - 5 : 0}
          />
        </FilterItem>
      )}
      {sizes && sizes.length > 0 && (
        <FilterItem title="Размеры" value="sizes">
          <FilterCheckbox
            title=""
            options={sizes.map((size) => ({ label: size, value: size }))}
            showMoreCount={sizes.length > 5 ? sizes.length - 5 : 0}
          />
        </FilterItem>
      )}
      {plates && plates.length > 0 && (
        <FilterItem title="Тип пластин" value="plates">
          <FilterCheckbox
            title=""
            options={plates.map((plate) => ({ label: plate, value: plate }))}
            showMoreCount={plates.length > 5 ? plates.length - 5 : 0}
          />
        </FilterItem>
      )}
      {voltage && voltage.length > 0 && (
        <FilterItem title="Напряжение, В" value="voltage">
          <FilterCheckbox
            title=""
            options={voltage.map((volt) => ({
              label: String(volt),
              value: String(volt),
            }))}
            showMoreCount={voltage.length > 5 ? voltage.length - 5 : 0}
          />
        </FilterItem>
      )}
      {container && container.length > 0 && (
        <FilterItem title="Емкость, Ач" value="container">
          <FilterCheckbox
            title=""
            options={container.map((cont) => ({
              label: String(cont),
              value: String(cont),
            }))}
            showMoreCount={container.length > 5 ? container.length - 5 : 0}
          />
        </FilterItem>
      )}
      {models && models.length > 0 && (
        <FilterItem title="Модели техники" value="models">
          <FilterCheckbox
            title=""
            options={models.map((model) => ({ label: model, value: model }))}
            showMoreCount={models.length > 5 ? models.length - 5 : 0}
          />
        </FilterItem>
      )}
      {countries && countries.length > 0 && (
        <FilterItem title="Страны производства" value="countries">
          <FilterCheckbox
            title=""
            options={countries.map((country) => ({
              label: country,
              value: country,
            }))}
            showMoreCount={countries.length > 5 ? countries.length - 5 : 0}
          />
        </FilterItem>
      )}
      {radiuses && radiuses.length > 0 && (
        <FilterItem title="Радиус" value="radiuses">
          <FilterCheckbox
            title=""
            options={radiuses.map((radius) => ({
              label: radius,
              value: radius,
            }))}
            showMoreCount={radiuses.length > 5 ? radiuses.length - 5 : 0}
          />
        </FilterItem>
      )}
    </Accordion>
  )
}

export default CatalogFilters
