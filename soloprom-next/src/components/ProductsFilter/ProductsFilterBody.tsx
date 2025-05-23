'use client'

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Tabs, TabsList, TabsContent } from '@/components/ui/tabs'

import {
  FilteredBlockDataList,
  FilterMethodsTypes,
  FiltersState,
  FilterTabsCategory,
} from '@/types/products.types'
import { SideSheet } from '../SideSheet'
import { ProductCategoryTabs } from './ProductCategoryTabs'
import { FilterMethodTabs } from './FilterMethodTabs'
import { FilterContent } from './FilterContent'
import { SelectedFiltersBadges } from './SelectedFiltersBadges'
import { FilterResetButton } from './FilterResetButton'
import { ShowProductsButton } from './ShowProductsButton'
import { Loading } from '../ui'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'
import { FilterResultList } from './FilterResultList'
import { useRouter } from 'next/navigation'
import { FilterBottomNav } from './FilterBottomNav'

interface Props {
  className?: string
  filteredList: FilteredBlockDataList
  handleResetFilters: () => void
  activeCategoryTab: 'tires' | 'battery'
  setActiveCategoryTab: (category: 'tires' | 'battery') => void
  filterMethods: FilterMethodsTypes
  initActiveCategory: 'tires' | 'battery'
  tabsCategories: FilterTabsCategory[]
  mode: 'link' | 'list'
}

export const ProductsFilterBody: React.FC<Props> = React.memo(
  ({
    className,
    filteredList,
    handleResetFilters,
    activeCategoryTab,
    setActiveCategoryTab,
    filterMethods,
    initActiveCategory,
    tabsCategories,
    mode,
  }) => {
    const [activeFilterMethodTab, setActiveFilterMethodTab] = useState(
      filterMethods[initActiveCategory][0].value,
    )
    const {
      filters,
      setFilters,
      productCount,
      fetchProductsOptions,
      isLoading,
      listShow,
      setListShow,
      setSearchQuery,
      searchQuery,
    } = useProductsFilterStore()

    const listRef = useRef<HTMLElement | null>(null)
    const router = useRouter()

    useEffect(() => {
      if (searchQuery) {
        fetchProductsOptions(
          filters,
          activeCategoryTab,
          handleResetFilters,
          'products',
          10,
        )
      }
    }, [router])

    const handleClickShowButton = () => {
      if (mode === 'list') {
        console.log(filters)

        fetchProductsOptions(
          filters,
          activeCategoryTab,
          handleResetFilters,
          'products',
          10,
        )
        if (listRef.current) {
          listRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      } else if (mode === 'link') {
        const params = new URLSearchParams()
        if (Object.keys(filters).length > 0) {
          params.set('filters', JSON.stringify(filters))
        }

        setSearchQuery(params.toString())
        router.push(`podbor-${filters.categoryName}`)
      }
    }

    const handleCategoryTabChange = useCallback(
      (value: 'tires' | 'battery') => {
        setActiveCategoryTab(value)
        setActiveFilterMethodTab(filterMethods[value][0].value)
        handleResetFilters()
      },
      [handleResetFilters, filterMethods],
    )
    const handleCategoryTabChangeString = useCallback(
      (value: string) => {
        if (value === 'tires' || value === 'battery') {
          handleCategoryTabChange(value)
        }
      },
      [handleCategoryTabChange],
    )

    const handleFilterMethodTabChange = useCallback((value: string) => {
      setActiveFilterMethodTab(value)
    }, [])

    const handleFilterChange = useCallback(
      (label: string, values: string[] | string | undefined) => {
        const newFilters: FiltersState = { ...filters }
        if (Array.isArray(values) && values.length > 0) {
          newFilters[label] = values
        } else if (typeof values === 'string' && values.length > 0) {
          newFilters[label] = values
        } else {
          delete newFilters[label]
        }

        newFilters.categoryName = activeCategoryTab
        setFilters(newFilters)

        fetchProductsOptions(
          newFilters,
          activeCategoryTab,
          handleResetFilters,
          'options',
        )
      },
      [
        activeCategoryTab,
        setFilters,
        filters,
        fetchProductsOptions,
        handleResetFilters,
      ],
    )

    const filterContent = useMemo(
      () => (
        <FilterContent
          activeFilterMethodTab={activeFilterMethodTab}
          filteredList={filteredList}
          handleFilterChange={handleFilterChange}
          activeCategoryTab={activeCategoryTab}
          handleResetFilters={handleResetFilters}
          handleClickShowButton={handleClickShowButton}
          mode={mode}
        />
      ),
      [
        activeFilterMethodTab,
        filteredList,
        handleFilterChange,
        activeCategoryTab,
      ],
    )

    const totalCount = productCount

    return (
      <>
        <section className="section-offset relative z-10 bg-[#dfefff]">
          <div className="page-container">
            <div className="relative z-0 rounded-2xl bg-white px-2 py-5 lg:p-5">
              {isLoading && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gray-100 opacity-70">
                  <Loading
                    classNames="text-accentBlue"
                    spinClasses="h-10 w-10"
                  />
                </div>
              )}
              <Tabs
                value={activeCategoryTab}
                onValueChange={handleCategoryTabChangeString}
              >
                <TabsList className="gap-2">
                  <ProductCategoryTabs
                    activeCategoryTab={activeCategoryTab}
                    onCategoryChange={handleCategoryTabChange}
                    tabsCategories={tabsCategories}
                  />
                </TabsList>

                <TabsContent
                  key={activeCategoryTab}
                  value={activeCategoryTab}
                  className="lg:p-5"
                >
                  <Tabs
                    value={activeFilterMethodTab}
                    onValueChange={handleFilterMethodTabChange}
                  >
                    <TabsList className="mb-4 flex justify-start">
                      <FilterMethodTabs
                        activeCategoryTab={activeCategoryTab}
                        onFilterMethodChange={handleFilterMethodTabChange}
                        filterMethods={filterMethods}
                      />
                    </TabsList>

                    <TabsContent value={activeFilterMethodTab} className="p-0">
                      <SelectedFiltersBadges selectedFilters={filters} />
                      {filterContent}

                      {/* <FilterBottomNav
                        listShow={listShow}
                        handleClickShowButton={handleClickShowButton}
                        handleResetFilters={handleResetFilters}
                        activeCategoryTab={activeCategoryTab}
                        totalCount={totalCount}
                        isLoading={isLoading}
                        mode={mode}
                      /> */}
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section ref={listRef}>
          {mode === 'list' && listShow ? (
            <FilterResultList
              activeCategoryTab={activeCategoryTab}
              handleResetFilters={handleResetFilters}
            />
          ) : (
            ''
          )}
        </section>
      </>
    )
  },
)
