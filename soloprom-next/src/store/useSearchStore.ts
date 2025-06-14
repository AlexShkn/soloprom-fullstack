import { CardDataProps } from '@/types/products.types'
import { SearchPagesTypes } from '../api/products'
import { create } from 'zustand'

interface FilterState {
  initPages: SearchPagesTypes[]
  initProducts: CardDataProps[]
  foundProducts: CardDataProps[]
  filters: Record<string, string[] | number>
  sort: string
  dynamicCurrentPage: number
  totalProductsCount: number
  hasFilters: boolean
  dataIsLoading: boolean
  filterComplete: boolean
  filteredPage: string
  priceRange: { min: number | undefined; max: number | undefined }
  viewMode: string

  setViewMode: (mode: string) => void
  setInitProducts: (initProducts: CardDataProps[]) => void
  setInitPages: (initPages: SearchPagesTypes[]) => void
  setFoundProducts: (searchProducts: CardDataProps[]) => void
  setFilters: (filters: Record<string, string[] | number>) => void
  setFilteredPage: (filteredPage: string) => void
  setSort: (sort: string) => void
  setDataIsLoading: (status: boolean) => void
  setFilterComplete: (status: boolean) => void
  setDynamicCurrentPage: (page: number) => void
  setTotalProductsCount: (count: number) => void
  setHasFilters: (hasFilters: boolean) => void
  resetFilters: () => void
  setPriceRange: (priceRange: {
    min: number | undefined
    max: number | undefined
  }) => void
}

const useSearchStore = create<FilterState>((set) => ({
  initProducts: [],
  initPages: [],
  foundProducts: [],
  filters: {},
  filteredPage: '',
  sort: '',
  dynamicCurrentPage: 1,
  totalProductsCount: 0,
  dataIsLoading: true,
  filterComplete: false,
  hasFilters: false,
  priceRange: { min: undefined, max: undefined },
  viewMode: 'grid',

  setViewMode: (viewMode) => set({ viewMode }),
  setInitProducts: (initProducts) => set({ initProducts }),
  setInitPages: (initPages) => set({ initPages }),
  setFoundProducts: (foundProducts) => set({ foundProducts }),
  setFilteredPage: (filteredPage) => set({ filteredPage }),
  setFilters: (filters) =>
    set({ filters, dynamicCurrentPage: 1, hasFilters: true }),
  setDataIsLoading: (status) => set({ dataIsLoading: status }),
  setFilterComplete: (status) => set({ filterComplete: status }),
  setSort: (sort) => set({ sort, hasFilters: true }),
  setDynamicCurrentPage: (page) =>
    set({ dynamicCurrentPage: page, dataIsLoading: true }),
  setTotalProductsCount: (count) => set({ totalProductsCount: count }),
  setHasFilters: (hasFilters) => set({ hasFilters }),

  resetFilters: () =>
    set({
      filters: {},
      sort: '',
      dynamicCurrentPage: 1,
      hasFilters: false,
      priceRange: { min: undefined, max: undefined },
    }),

  setPriceRange: (priceRange) => set({ priceRange }),
}))

export default useSearchStore
